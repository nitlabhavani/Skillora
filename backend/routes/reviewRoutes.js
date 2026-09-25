import express from 'express';
import { getReviewsByProvider, addReview } from '../controllers/reviewController.js';

const router = express.Router();

router.get('/:providerId', getReviewsByProvider);
router.post('/:providerId', addReview);

export default router;
