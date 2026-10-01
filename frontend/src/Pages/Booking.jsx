import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './Booking.css';
import { serviceService } from '../services/serviceService';
import { bookingService } from '../services/bookingService';
import { paymentService } from '../services/paymentService';

const defaultServiceData = {
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
  "18": { name: "Dr. Leo H", role: "ML Research Scientist", rate: 180, workImg: "/ai.jpeg" },

  "19": { name: "Dev Patel", role: "Cloud Infrastructure Architect", rate: 115, workImg: "/cloud.jpeg" },
  "20": { name: "Rachel Evans", role: "DevOps & CI/CD Automation Lead", rate: 95, workImg: "/cloud.jpeg" },

  "21": { name: "Carlos Mendez", role: "Smart Contract & Web3 Engineer", rate: 130, workImg: "/blockchain.jpeg" },
  "22": { name: "Zoe Nakamura", role: "DeFi & Tokenomics Strategist", rate: 125, workImg: "/blockchain.jpeg" },

  "23": { name: "Lucas Silva", role: "Lead Motion Designer & VFX Artist", rate: 75, workImg: "/video.jpeg" },
  "24": { name: "Maya Lin", role: "Commercial Video Editor & Colorist", rate: 70, workImg: "/video.jpeg" }
};

import { authService } from '../services/authService';

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();
  const [isProcessing, setIsProcessing] = useState(false);
  const [user, setUser] = useState(defaultServiceData[id] || null);
  const [projectDetails, setProjectDetails] = useState("");
  const [deliveryEmail, setDeliveryEmail] = useState(currentUser?.email || "");
  const [deliveryFormat, setDeliveryFormat] = useState("ZIP Source Code Package");

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const data = await serviceService.getById(id);
        if (data?.service) {
          const numericRate = typeof data.service.rate === 'number'
            ? data.service.rate
            : (data.service.hourlyRate || parseInt(String(data.service.rate).replace(/[^0-9]/g, '') || '95', 10));
          
          setUser({
            ...data.service,
            rate: numericRate
          });
        }
      } catch (err) {
        console.warn("Could not fetch provider from REST API, using fallback data:", err);
      }
    };
    fetchProvider();
  }, [id]);

  if (!user) return <div className="booking-page"><div className="error-card"><h2>Provider not found!</h2><Link to="/services">Return to Services</Link></div></div>;

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    const totalAmount = (user.rate + 2.50).toFixed(2);
    try {
      await bookingService.create({
        userName: currentUser?.name || "Customer",
        userEmail: deliveryEmail,
        providerId: id,
        providerName: user.name,
        service: user.role,
        amount: `$${totalAmount}`,
        details: projectDetails,
        deliveryFormat,
        status: "Active"
      });
      await paymentService.create({
        user: currentUser?.name || "Customer",
        service: user.role,
        amount: `$${totalAmount}`,
        method: "Credit Card"
      });
    } catch (err) {
      console.warn("Booking/Payment API notice:", err);
    }
    setTimeout(() => {
      navigate('/payment-success', { 
        state: { 
          amount: totalAmount, 
          name: user.name,
          service: user.role,
          deliveryEmail: deliveryEmail || "your registered email",
          deliveryFormat
        } 
      });
    }, 1500);
  };

  return (
    <div className="booking-page">
      <div className="booking-container">
        <Link to={`/profile/${id}`} className="back-link">← Back to Profile</Link>
        
        <div className="booking-grid">
          <div className="payment-section">
            <h2 className="section-title">Confirm & Book Service</h2>
            <form onSubmit={handlePayment} className="payment-form">
              <div className="form-group">
                <label>Project Requirements & Instructions</label>
                <textarea 
                  placeholder="Describe your project requirements, goals, and any specific preferences in detail..." 
                  value={projectDetails}
                  onChange={(e) => setProjectDetails(e.target.value)}
                  required 
                />
              </div>

              <div className="form-group">
                <label>📬 Delivery Email Address</label>
                <input 
                  type="email" 
                  placeholder="Enter email where expert will send finished files..." 
                  value={deliveryEmail}
                  onChange={(e) => setDeliveryEmail(e.target.value)}
                  required 
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: 'white' }}
                />
                <small style={{ display: 'block', color: '#94a3b8', marginTop: '5px', fontSize: '0.8rem' }}>
                  The completed deliverables, download links, and project reports will be dispatched here.
                </small>
              </div>

              <div className="form-group">
                <label>Preferred Deliverable Format</label>
                <select 
                  value={deliveryFormat}
                  onChange={(e) => setDeliveryFormat(e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', background: '#1e293b', border: '1px solid rgba(255,255,255,0.15)', color: 'white' }}
                >
                  <option value="ZIP Source Code Package">ZIP Source Code Package</option>
                  <option value="GitHub Repository Link">GitHub Repository Link</option>
                  <option value="Figma Design / Asset Link">Figma Design / Asset Link</option>
                  <option value="PDF Audit / Strategy Document">PDF Audit / Strategy Document</option>
                  <option value="Live Deployment Link">Live Deployment Link</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Payment Method</label>
                <div className="card-input-wrapper">
                   <input type="text" placeholder="Card Number (4242 •••• •••• 4242)" className="card-input" required />
                   <div className="input-row">
                     <input type="text" placeholder="MM / YY" required />
                     <input type="text" placeholder="CVC" required />
                   </div>
                </div>
              </div>

              <button type="submit" className="confirm-btn" disabled={isProcessing}>
                {isProcessing ? "Authorizing Booking..." : `Secure Payment • $${(user.rate + 2.50).toFixed(2)}`}
              </button>
              <p className="security-note">🔒 100% Escrow Protected • Instant Email & Dashboard Delivery</p>
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

                <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(29, 191, 115, 0.08)', borderRadius: '12px', border: '1px solid rgba(29, 191, 115, 0.2)' }}>
                  <p style={{ margin: '0 0 6px 0', color: '#1dbf73', fontWeight: 'bold', fontSize: '0.9rem' }}>
                    ⚡ Delivery Guarantee
                  </p>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#cbd5e1', lineHeight: '1.4' }}>
                    Upon completion, {user.name.split(' ')[0]} will email you the full deliverables and project files within 24-48 hours.
                  </p>
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