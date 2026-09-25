import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './UserProfile.css';
import { authService } from '../services/authService';
import { bookingService } from '../services/bookingService';

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setUser(currentUser);

    const fetchMyBookings = async () => {
      try {
        const data = await bookingService.getAll({ userName: currentUser.name });
        if (data?.bookings) {
          setMyBookings(data.bookings);
        }
      } catch (err) {
        console.warn("Could not fetch user bookings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyBookings();
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate('/');
    window.location.reload();
  };

  if (!user) return null;

  return (
    <div className="user-profile-page">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="logo brand-logo">
          <Link to="/" className="no-link-style" style={{ color: '#1dbf73' }}>Skillora</Link>
        </div>
        <nav className="nav-links">
          <Link to="/" className="no-link-style">HOME</Link>
          <Link to="/services" className="no-link-style">SERVICES</Link>
          <Link to="/about" className="no-link-style">ABOUT</Link>
        </nav>
      </header>

      <main className="profile-wrapper">
        <div className="profile-card">
          <div className="profile-header-strip">
            <div className="profile-identity">
              <div className="profile-avatar-circle">
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="profile-name-role">
                <h2>{user.name}</h2>
                <span className="profile-badge">{user.role || 'Customer'} Account</span>
              </div>
            </div>
            <div>
              <Link to="/services">
                <button className="btn-browse-services">⚡ Browse Services</button>
              </Link>
            </div>
          </div>

          <div className="profile-details-grid">
            <div className="detail-box">
              <label>Email Address</label>
              <p>{user.email}</p>
            </div>
            <div className="detail-box">
              <label>Account Role</label>
              <p>{user.role || 'Customer'}</p>
            </div>
            <div className="detail-box">
              <label>Membership Status</label>
              <p style={{ color: '#1dbf73' }}>Verified Active</p>
            </div>
            <div className="detail-box">
              <label>Total Bookings</label>
              <p>{myBookings.length} Orders</p>
            </div>
          </div>

          {/* MY RECENT BOOKINGS */}
          <div style={{ marginTop: '20px', marginBottom: '30px' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '15px', color: '#f1f5f9' }}>My Active Orders & Bookings</h3>
            {myBookings.length > 0 ? (
              <div style={{ display: 'grid', gap: '12px' }}>
                {myBookings.map((b) => (
                  <div key={b.id || b.bookingId} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong style={{ color: '#f8fafc', fontSize: '1.05rem' }}>{b.service}</strong>
                      <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#94a3b8' }}>Date: {b.date}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontWeight: '700', color: '#1dbf73', marginRight: '15px' }}>{b.amount}</span>
                      <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', background: b.status === 'Completed' ? 'rgba(29, 191, 115, 0.2)' : 'rgba(234, 179, 8, 0.2)', color: b.status === 'Completed' ? '#1dbf73' : '#eab308' }}>
                        {b.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '24px', borderRadius: '12px', textAlign: 'center', color: '#94a3b8' }}>
                <p>You have not booked any services yet.</p>
                <Link to="/services">
                  <button className="btn-browse-services" style={{ marginTop: '10px', padding: '8px 20px', fontSize: '0.9rem' }}>
                    Explore & Book Services Now
                  </button>
                </Link>
              </div>
            )}
          </div>

          <div className="profile-actions-bar">
            <Link to="/services">
              <button className="btn-browse-services">← Explore All Services</button>
            </Link>
            <button onClick={handleLogout} className="btn-secondary-logout">
              Log Out of Account
            </button>
          </div>
        </div>
      </main>

      <footer className="footer" style={{ textAlign: 'center', padding: '20px', borderTop: '1px solid rgba(255,255,255,0.06)', color: '#64748b' }}>
        © {new Date().getFullYear()} Skillora. All rights reserved.
      </footer>
    </div>
  );
};

export default UserProfile;
