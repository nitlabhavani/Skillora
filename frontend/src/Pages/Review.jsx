import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Review.css';
import { reviewService } from '../services/reviewService';

const Reviews = () => {
  const { id } = useParams();
  const [newComment, setNewComment] = useState("");

  const reviewData = {
   
    "1": [
      { id: 101, user: "Sarah J.", rating: 5, comment: "Alex is a coding wizard! He refactored our entire backend architecture in record time.", date: "Oct 2025" },
      { id: 102, user: "Mike T.", rating: 5, comment: "Incredible attention to detail. The API documentation was flawless.", date: "Sept 2025" },
      { id: 103, user: "TechVentures", rating: 4, comment: "Solid work on our Shopify integration. Very reliable.", date: "Aug 2025" }
    ],
    "10": [
      { id: 104, user: "Kevin L.", rating: 5, comment: "Jordan's frontend skills are next-level. The GSAP animations are buttery smooth!", date: "Nov 2025" },
      { id: 105, user: "Elena P.", rating: 5, comment: "Pixel-perfect implementation of our Figma designs. Highly recommend.", date: "Dec 2025" },
      { id: 106, user: "Marcus D.", rating: 4, comment: "Great eye for UI. Made our dashboard look 10x more professional.", date: "Jan 2026" }
    ],
    
    "2": [
      { id: 201, user: "David L.", rating: 5, comment: "Sarah's eye for minimalist branding is unmatched. Our startup finally has a soul.", date: "Nov 2025" },
      { id: 202, user: "Chloe M.", rating: 5, comment: "Beautiful color palettes and a very structured professional workflow.", date: "Jan 2026" },
      { id: 203, user: "Foundry Co.", rating: 5, comment: "The brand guidelines she created are used by our team every single day.", date: "Dec 2025" }
    ],
    "11": [
      { id: 204, user: "Mark R.", rating: 5, comment: "Liam delivered a bold identity that stands out. Absolute expert in vector art.", date: "Oct 2025" },
      { id: 205, user: "Sophie B.", rating: 4, comment: "High impact designs. Really understood our target demographic.", date: "Nov 2025" },
      { id: 206, user: "Urban Ltd.", rating: 5, comment: "Incredible logo work. Fast, professional, and very creative.", date: "Sept 2025" }
    ],
    
    "3": [
      { id: 301, user: "Emily M.", rating: 5, comment: "Marcus transformed our SEO. Organic traffic is up 200% since we started.", date: "May 2025" },
      { id: 302, user: "Brian K.", rating: 5, comment: "Data-driven results. No fluff, just pure growth metrics.", date: "June 2025" },
      { id: 303, user: "SaaS Rocket", rating: 4, comment: "Excellent PPC management. Lowered our CAC significantly.", date: "July 2025" }
    ],
    "12": [
      { id: 304, user: "Jason V.", rating: 5, comment: "Anita knows social algorithms better than anyone. Content is consistently viral.", date: "Aug 2025" },
      { id: 305, user: "Zara F.", rating: 5, comment: "Our community engagement has tripled. She is a content genius.", date: "Sept 2025" },
      { id: 306, user: "Trendsetters", rating: 4, comment: "Great handle on brand voice and aesthetic consistency.", date: "Oct 2025" }
    ],
   
    "4": [
      { id: 401, user: "Varshini", rating: 4, comment: "Great user flow design. Very easy to work with and receptive to feedback.", date: "April 2025" },
      { id: 402, user: "Aravind", rating: 5, comment: "The prototyping was so detailed it felt like a finished app.", date: "May 2025" },
      { id: 403, user: "Design Hub", rating: 5, comment: "Simplified our complex checkout process into 3 easy steps.", date: "June 2025" }
    ],
    "13": [
      { id: 404, user: "Oscar B.", rating: 5, comment: "David's UX research saved us months of development by spotting errors early.", date: "Dec 2025" },
      { id: 405, user: "Linda G.", rating: 5, comment: "Expert in accessibility. Our app is now inclusive for all users.", date: "Jan 2026" },
      { id: 406, user: "AppPros", rating: 4, comment: "Thorough wireframing and very logical architecture.", date: "Nov 2025" }
    ],
    
    "5": [
      { id: 501, user: "Alice H.", rating: 5, comment: "James writes technical docs that even non-techies can understand.", date: "June 2025" },
      { id: 502, user: "CodeBase", rating: 5, comment: "Our API support tickets dropped by 50% after he rewrote the docs.", date: "July 2025" },
      { id: 503, user: "DevTools", rating: 4, comment: "Clear, concise, and professional writing. A pleasure to work with.", date: "Aug 2025" }
    ],
    "14": [
      { id: 504, user: "Robert D.", rating: 5, comment: "Clara's copy directly increased our email open rates by 15% immediately.", date: "Sept 2025" },
      { id: 505, user: "SalesGen", rating: 5, comment: "The landing page copy she wrote converts like a dream.", date: "Oct 2025" },
      { id: 506, user: "MarketMate", rating: 5, comment: "Persuasive and engaging. She really knows how to sell with words.", date: "Nov 2025" }
    ],
    
    "6": [
      { id: 601, user: "Ken P.", rating: 5, comment: "Kenji is the go-to guy for Flutter. Smooth cross-platform performance.", date: "July 2025" },
      { id: 602, user: "NodeApps", rating: 5, comment: "Flawless Firebase integration. The real-time features work perfectly.", date: "Aug 2025" },
      { id: 603, user: "QuickCart", rating: 4, comment: "Fast delivery and very stable code. No crashes on launch.", date: "Sept 2025" }
    ],
    "15": [
      { id: 604, user: "Sia T.", rating: 5, comment: "Mia's iOS app was featured on the App Store! Expert Swift developer.", date: "Nov 2025" },
      { id: 605, user: "AppleFan", rating: 5, comment: "Deep understanding of SwiftUI. The haptics and animations are great.", date: "Dec 2025" },
      { id: 606, user: "iDev", rating: 5, comment: "Professional, communicative, and delivers high-end Apple experiences.", date: "Jan 2026" }
    ],
   
    "7": [
      { id: 701, user: "Finance Hub", rating: 5, comment: "Dr. Aris built a predictive model that accurately forecasted our Q4 shifts.", date: "Dec 2025" },
      { id: 702, user: "DataFirst", rating: 5, comment: "Complex Python scripts handled our big data sets with ease.", date: "Jan 2026" },
      { id: 703, user: "Quantum Inc", rating: 5, comment: "Incredible statistical insight. He found patterns we missed for years.", date: "Nov 2025" }
    ],
    "16": [
      { id: 704, user: "Global Logistics", rating: 5, comment: "Sanjay's dashboards made our data actionable for the first time.", date: "Jan 2026" },
      { id: 705, user: "ShopMetric", rating: 4, comment: "Clear visualizations and very powerful SQL optimization.", date: "Dec 2025" },
      { id: 706, user: "Insightly", rating: 5, comment: "Automated our entire reporting pipeline. Huge time saver.", date: "Nov 2025" }
    ],
   
    "8": [
      { id: 801, user: "SecureLink", rating: 5, comment: "Riley found vulnerabilities we didn't even know existed. Essential.", date: "Feb 2025" },
      { id: 802, user: "BankPro", rating: 5, comment: "Extremely thorough penetration testing. Feel much safer now.", date: "March 2025" },
      { id: 803, user: "DefendIT", rating: 5, comment: "Best security auditor we have ever hired. Very detailed report.", date: "Jan 2025" }
    ],
    "17": [
      { id: 804, user: "LegalTech", rating: 5, comment: "Victor got us SOC2 compliant in record time. Professional and thorough.", date: "May 2025" },
      { id: 805, user: "PrivacyFirst", rating: 5, comment: "Expert in GDPR. Handled our data policy transition perfectly.", date: "June 2025" },
      { id: 806, user: "GovGuard", rating: 5, comment: "Thorough risk management strategy. Highly professional consultant.", date: "April 2025" }
    ],
    
    "9": [
      { id: 901, user: "Tech Corp", rating: 5, comment: "Sophia integrated an LLM that saved us 40 hours a week. Magic.", date: "Dec 2025" },
      { id: 902, user: "AI-Solutions", rating: 5, comment: "RAG architecture was perfectly implemented. No hallucinations!", date: "Jan 2026" },
      { id: 903, user: "PromptMasters", rating: 5, comment: "Her custom GPT model for our customer service is amazing.", date: "Nov 2025" }
    ],
    "18": [
      { id: 904, user: "Future AI", rating: 5, comment: "Dr. Leo's expertise in neural networks helped us optimize our model.", date: "Jan 2026" },
      { id: 905, user: "Visionary", rating: 5, comment: "Top tier computer vision expert. Our object detection is now 99% accurate.", date: "Dec 2025" },
      { id: 906, user: "RobotX", rating: 5, comment: "Deep learning specialist with real-world production experience.", date: "Nov 2025" }
    ],
    "19": [
      { id: 907, user: "CloudScale Inc", rating: 5, comment: "Dev migrated our entire multi-region AWS infrastructure with zero downtime. Exceptional architect.", date: "Feb 2026" },
      { id: 908, user: "Nexa Tech", rating: 5, comment: "Kubernetes cluster is blazing fast and our cloud bill dropped 30%.", date: "Jan 2026" }
    ],
    "20": [
      { id: 909, user: "DevFlow", rating: 5, comment: "Rachel automated our CI/CD pipelines. Deployment time went from 45 mins to 3 mins!", date: "Feb 2026" }
    ],
    "21": [
      { id: 910, user: "CryptoLabs", rating: 5, comment: "Carlos wrote bulletproof smart contracts. Passed audit with zero high-severity issues.", date: "Jan 2026" }
    ],
    "22": [
      { id: 911, user: "DeFi Prime", rating: 5, comment: "Zoe's tokenomics model gave our protocol high liquidity and strong governance stability.", date: "Feb 2026" }
    ],
    "23": [
      { id: 912, user: "BrandVibe", rating: 5, comment: "Lucas made our product launch 3D video look like an Apple keynote. Outstanding visual effects!", date: "Feb 2026" }
    ],
    "24": [
      { id: 913, user: "StudioX", rating: 5, comment: "Maya's editing and color grading transformed our raw footage into cinematic gold.", date: "Feb 2026" }
    ]
  };

  const [reviewsList, setReviewsList] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await reviewService.getByProvider(id);
        if (data?.reviews?.length > 0) {
          setReviewsList(data.reviews);
        } else {
          setReviewsList(reviewData[id] || []);
        }
      } catch (err) {
        setReviewsList(reviewData[id] || []);
      }
    };
    fetchReviews();
  }, [id]);

  const reviews = reviewsList.length > 0 ? reviewsList : (reviewData[id] || []);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await reviewService.create(id, { comment: newComment, rating: 5, user: "Client" });
    } catch (err) {
      console.warn("Review API submit notice:", err);
    }
    alert("Feedback received! It will appear after verification.");
    setNewComment("");
  };

  return (
    <div className="reviews-page">
      <div className="reviews-container">
        
        <header className="reviews-header">
          <p className="subtitle">Expert Testimonials</p>
          <h1>Client Feedback</h1>
          <div className="overall-rating">
            <span className="star-icon">★</span>
            <span className="rating-score">4.9</span>
            <span className="review-count">({reviews.length} Verified Reviews)</span>
          </div>
        </header>

        <div className="reviews-list">
          {reviews.length > 0 ? (
            reviews.map((rev) => (
              <div key={rev.id} className="review-card">
                <div className="review-top">
                  <div className="reviewer-info">
                    <div className="reviewer-avatar">{rev.user.charAt(0)}</div>
                    <div>
                      <h4>{rev.user}</h4>
                      <p className="review-date">{rev.date}</p>
                    </div>
                  </div>
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`star ${i < Math.floor(rev.rating) ? 'filled' : ''}`}>★</span>
                    ))}
                  </div>
                </div>
                <p className="review-comment">"{rev.comment}"</p>
              </div>
            ))
          ) : (
            <div className="no-reviews">
              <p>No reviews yet for this expert. Be the first to book and leave feedback!</p>
            </div>
          )}
        </div>

        <div className="add-review-session">
            <h3>Leave a Review</h3>
            <form onSubmit={handleCommentSubmit} className="comment-form">
                <textarea 
                    placeholder="Describe your project experience..." 
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    required
                />
                <button type="submit" className="submit-review-btn">Post Feedback</button>
            </form>
        </div>

        <div className="review-footer">
          <Link to ={`/profile/${id}`} className="back-link">← Back to Profile</Link>
          <Link to={`/book/${id}`} className="book-bottom-btn">Book This Expert</Link>
        </div>
      </div>
    </div>
  );
};

export default Reviews;