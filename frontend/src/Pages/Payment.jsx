import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Payment.css';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { amount, name } = location.state || { amount: "0.00", name: "Expert" };

  const handleCancelRequest = () => {
    if (window.confirm("Do you want to cancel this booking and request a refund?")) {
      alert("Cancellation request sent successfully.");
      navigate('/services');
    }
  };
  
  return (
    <div className="payment-success-page">
      <div className="success-card">
        <div className="success-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h1>Payment Successful!</h1>
        <p>Thank you for your booking. We've sent a confirmation email to you.</p>
        
        <div className="receipt-box">
          <div className="receipt-row">
            <span>Consultant</span>
            <span>{name}</span>
          </div>
          <div className="receipt-row">
            <span>Amount Paid</span>
            <span>${amount}</span>
          </div>
          <div className="receipt-row">
            <span>Status</span>
            <span className="status-badge">Completed</span>
          </div>
        </div>

        <div className="action-buttons">
          <Link to="/services" className="primary-btn">Browse More Services</Link>
          <button onClick={handleCancelRequest} className="cancel-payment-btn">
            Cancel & Refund Booking
          </button>
          <Link to="/" className="secondary-btn">Go to Dashboard</Link>
        </div>
      </div>
    </div>
  );
};

export default Payment;