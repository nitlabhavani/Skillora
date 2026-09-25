import Review from '../models/Review.js';
import { initialReviews } from '../seed/mockData.js';

let inMemoryReviews = { ...initialReviews };

// @desc    Get reviews for a provider
// @route   GET /api/reviews/:providerId
// @access  Public
export const getReviewsByProvider = async (req, res) => {
  try {
    const { providerId } = req.params;
    let reviews = [];

    try {
      reviews = await Review.find({ providerId: String(providerId) });
    } catch {
      // Fallback
    }

    if (!reviews || reviews.length === 0) {
      reviews = inMemoryReviews[String(providerId)] || [];
    }

    const totalRating = reviews.reduce((sum, r) => sum + Number(r.rating || 5), 0);
    const avgRating = reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : "5.0";

    return res.status(200).json({
      success: true,
      providerId,
      averageRating: avgRating,
      count: reviews.length,
      reviews
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add review for a provider
// @route   POST /api/reviews/:providerId
// @access  Public
export const addReview = async (req, res) => {
  try {
    const { providerId } = req.params;
    const { user, comment, rating } = req.body;

    if (!comment) {
      return res.status(400).json({ success: false, message: 'Comment is required' });
    }

    const newReview = {
      id: String(Date.now()),
      providerId: String(providerId),
      user: user || 'Anonymous Client',
      rating: Number(rating) || 5,
      comment,
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    };

    try {
      const created = await Review.create(newReview);
      if (!inMemoryReviews[String(providerId)]) {
        inMemoryReviews[String(providerId)] = [];
      }
      inMemoryReviews[String(providerId)].unshift(created);
      return res.status(201).json({ success: true, message: 'Review added', review: created });
    } catch {
      if (!inMemoryReviews[String(providerId)]) {
        inMemoryReviews[String(providerId)] = [];
      }
      inMemoryReviews[String(providerId)].unshift(newReview);
      return res.status(201).json({ success: true, message: 'Review added', review: newReview });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
