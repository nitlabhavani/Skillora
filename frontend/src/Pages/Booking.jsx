import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './Booking.css';
import { bookingService } from '../services/bookingService';
import { paymentService } from '../services/paymentService';

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const serviceData = {
  
    "1": { name: "Alex Rivera", role: "Senior Full Stack Architect", rate: 95, workImg: "/web.jpeg" },
    "10": { name: "Jordan Smith", role: "Creative Frontend Lead", rate: 85, workImg: "/web.jpeg" },
    
    "2": { name: "Sarah Chen", role: "Senior Brand Strategist", rate: 60, workImg: "/graphic.jpeg" },
    "11": { name: "Liam O'Connor", role: "Visual Identity Specialist", rate: 90, workImg: "/graphic.jpeg" },
  
    "3": { name: "Marcus Thorne", role: "Growth Marketing Lead", rate: 90, workImg: "/digital.jpeg" },
    "12": { name: "Anita Desai", role: "Social Content Strategist", rate: 70, workImg: "/digital.jpeg" },
   
    "4": { name: "Elena Rodriguez", role: "Product Designer", rate: 65, workImg: "/ui.jpeg" },
    "13": { name: "David Vark", role: "UX Architect", rate: 80, workImg: "/ui.jpeg" },
    
    "5": { name: "James Wilson", role: "Technical Documentation Lead", rate: 50, workImg: "/content.jpeg" },
    "14": { name: "Clara Bloom", role: "Conversion Copywriter", rate: 75, workImg: "/content.jpeg" },
    
    "6": { name: "Kenji Sato", role: "Cross-Platform Expert", rate: 80, workImg: "/mobile.jpeg" },
    "15": { name: "Mia Wong", role: "Senior iOS Specialist", rate: 95, workImg: "/mobile.jpeg" },
    
    "7": { name: "Dr. Aris Varma", role: "Principal Data Scientist", rate: 120, workImg: "/data.jpeg" },
    "16": { name: "Sanjay Gupta", role: "BI Analyst", rate: 85, workImg: "/data.jpeg" },
   
    "8": { name: "Riley Steele", role: "Lead Security Auditor", rate: 110, workImg: "/cyber.jpeg" },
    "17": { name: "Victor Stone", role: "Security Compliance Expert", rate: 130, workImg: "/cyber.jpeg" },
  
    "9": { name: "Sophia Alt", role: "AI Solutions Architect", rate: 150, workImg: "/ai.jpeg" },
    "18": { name: "Dr. Leo H", role: "ML Research Scientist", rate: 180, workImg: "/ai.jpeg" }
  };

  const user = serviceData[id];

  if (!user) return <div className="booking-page"><div className="error-card"><h2>Provider not found!</h2><Link to="/services">Return to Services</Link></div></div>;

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    const totalAmount = (user.rate + 2.50).toFixed(2);
    try {
      await bookingService.create({
        userName: "Customer",
        providerId: id,
        providerName: user.name,
        service: user.role,
        amount: `$${totalAmount}`,
        status: "Active"
      });
      await paymentService.create({
        user: "Customer",
        service: user.role,
        amount: `$${totalAmount}`,
        method: "Credit Card"
      });
    } catch (err) {
      console.warn("Booking/Payment API notice:", err);
    }
    setTimeout(() => {
      navigate('/payment-success', { 
        state: { amount: totalAmount, name: user.name } 
      });
    }, 1500);
  };

  return (
    <div className="booking-page">
      <div className="booking-container">
        <Link to={`/profile/${id}`} className="back-link">← Back to Profile</Link>
        
        <div className="booking-grid">
          <div className="payment-section">
            <h2 className="section-title">Confirm & Pay</h2>
            <form onSubmit={handlePayment} className="payment-form">
              <div className="form-group">
                <label>Project Details</label>
                <textarea placeholder="Describe your requirements in detail..." required />
              </div>
              
              <div className="form-group">
                <label>Payment Method</label>
                <div className="card-input-wrapper">
                   <input type="text" placeholder="Card Number" className="card-input" required />
                   <div className="input-row">
                     <input type="text" placeholder="MM / YY" required />
                     <input type="text" placeholder="CVC" required />
                   </div>
                </div>
              </div>

              <button type="submit" className="confirm-btn" disabled={isProcessing}>
                {isProcessing ? "Authorizing..." : `Secure Payment • $${(user.rate + 2.50).toFixed(2)}`}
              </button>
              <p className="security-note">🔒 Encrypted, secure checkout</p>
            </form>
          </div>

          <div className="summary-section">
            <div className="summary-card">
              <div className="image-holder">
                <img src={user.workImg} alt="Service" className="summary-img" />
                <div className="role-overlay">{user.role}</div>
              </div>
              <div className="summary-content">
                <p className="expert-name">Hiring <strong>{user.name}</strong></p>
                <div className="cost-breakdown">
                  <div className="price-row">
                    <span>Service Hourly Rate</span>
                    <span>${user.rate}.00</span>
                  </div>
                  <div className="price-row">
                    <span>Platform Fee</span>
                    <span>$2.50</span>
                  </div>
                  <div className="price-row total">
                    <span>Total Amount</span>
                    <span>${(user.rate + 2.50).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;