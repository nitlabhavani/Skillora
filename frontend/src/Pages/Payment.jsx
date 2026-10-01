import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Payment.css';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { amount, name, service, deliveryEmail, deliveryFormat } = location.state || { 
    amount: "0.00", 
    name: "Expert",
    service: "Expert Service",
    deliveryEmail: "your registered email",
    deliveryFormat: "Direct Delivery Package"
  };

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
        <h1>Booking & Order Confirmed!</h1>
        <p>Your order is now in progress. A confirmation has been sent to your email.</p>
        
        <div className="receipt-box">
          <div className="receipt-row">
            <span>Consultant / Expert</span>
            <span>{name}</span>
          </div>
          {service && (
            <div className="receipt-row">
              <span>Service</span>
              <span>{service}</span>
            </div>
          )}
          <div className="receipt-row">
            <span>Amount Paid</span>
            <span>${amount}</span>
          </div>
          <div className="receipt-row">
            <span>Delivery Destination</span>
            <span style={{ color: '#1dbf73', fontWeight: 'bold' }}>📬 {deliveryEmail}</span>
          </div>
          {deliveryFormat && (
            <div className="receipt-row">
              <span>Deliverable Format</span>
              <span>{deliveryFormat}</span>
            </div>
          )}
          <div className="receipt-row">
            <span>Estimated Turnaround</span>
            <span>⚡ 24 - 48 Hours</span>
          </div>
          <div className="receipt-row">
            <span>Status</span>
            <span className="status-badge" style={{ backgroundColor: '#10b981', color: 'white' }}>Active & In Progress</span>
          </div>
        </div>

        <div style={{ margin: '20px 0', padding: '14px', background: 'rgba(29, 191, 115, 0.08)', borderRadius: '12px', border: '1px solid rgba(29, 191, 115, 0.25)', textAlign: 'left' }}>
          <p style={{ margin: '0 0 4px 0', color: '#1dbf73', fontWeight: 'bold', fontSize: '0.9rem' }}>
            📬 What happens next?
          </p>
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#cbd5e1', lineHeight: '1.4' }}>
            {name.split(' ')[0]} is working on your deliverables. Once complete, the final package will be sent to <strong>{deliveryEmail}</strong> and made accessible in your account.
          </p>
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