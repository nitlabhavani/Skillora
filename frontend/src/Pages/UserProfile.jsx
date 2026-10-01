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
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const loadBookings = async (currentUser) => {
    try {
      setLoading(true);
      // Fetch both user-specific and combined bookings
      const result = await bookingService.getUserBookings(currentUser);
      let list = result?.bookings || [];

      // If no specific user bookings found by exact name/email match, also check if user has created any bookings locally
      if (list.length === 0) {
        const allRes = await bookingService.getAll();
        const all = allRes?.bookings || [];
        // Filter by user name or email or customer
        const userMatched = all.filter(b => 
          (b.userName && currentUser.name && b.userName.toLowerCase() === currentUser.name.toLowerCase()) ||
          (b.userEmail && currentUser.email && b.userEmail.toLowerCase() === currentUser.email.toLowerCase()) ||
          b.userId === currentUser.id
        );
        if (userMatched.length > 0) {
          list = userMatched;
        } else {
          // If brand new account, show any created bookings or fallback
          list = all.slice(0, 3);
        }
      }
      setMyBookings(list);
    } catch (err) {
      console.warn("Could not fetch user bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setUser(currentUser);
    loadBookings(currentUser);

    const handleNewBooking = (e) => {
      if (e.detail) {
        setMyBookings(prev => [e.detail, ...prev.filter(b => (b.id !== e.detail.id && b.bookingId !== e.detail.bookingId))]);
      }
    };
    window.addEventListener('skillora_booking_created', handleNewBooking);

    return () => {
      window.removeEventListener('skillora_booking_created', handleNewBooking);
    };
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate('/');
    window.location.reload();
  };

  if (!user) return null;

  // Filter and search logic
  const filteredBookings = myBookings.filter(b => {
    const matchesFilter = filterStatus === 'All' || (b.status && b.status.toLowerCase() === filterStatus.toLowerCase());
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      (b.service && b.service.toLowerCase().includes(query)) ||
      (b.providerName && b.providerName.toLowerCase().includes(query)) ||
      (b.id && b.id.toLowerCase().includes(query)) ||
      (b.bookingId && b.bookingId.toLowerCase().includes(query));
    return matchesFilter && matchesSearch;
  });

  // Calculate stats
  const totalSpent = myBookings.reduce((acc, curr) => {
    const val = parseFloat(String(curr.amount || '0').replace(/[^0-9.]/g, '')) || 0;
    return acc + val;
  }, 0);

  const activeCount = myBookings.filter(b => b.status === 'Active' || b.status === 'Pending' || b.status === 'In Progress').length;
  const completedCount = myBookings.filter(b => b.status === 'Completed' || b.status === 'Paid').length;

  return (
    <div className="user-profile-page">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="logo brand-logo">
          <Link to="/" className="no-link-style" style={{ color: '#1dbf73', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ background: '#1dbf73', color: '#0a1929', width: '32px', height: '32px', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '1.2rem' }}>S</span>
            <span style={{ fontWeight: '800', fontSize: '1.4rem', color: '#f8fafc' }}>Skill<span style={{ color: '#1dbf73' }}>ora</span></span>
          </Link>
        </div>
        <nav className="nav-links">
          <Link to="/" className="no-link-style">HOME</Link>
          <Link to="/services" className="no-link-style">
            <button className="btn-nav-book">⚡ Book Services</button>
          </Link>
        </nav>
      </header>

      <main className="profile-wrapper">
        {/* TOP PROFILE BANNER */}
        <div className="profile-card profile-banner-card">
          <div className="profile-header-strip">
            <div className="profile-identity">
              <div className="profile-avatar-circle">
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="profile-name-role">
                <h2>{user.name}</h2>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <span className="profile-badge">{user.role || 'Client'} Account</span>
                  <span className="profile-badge badge-verified">✓ Verified Client</span>
                  <span className="profile-email-tag">📧 {user.email}</span>
                </div>
              </div>
            </div>
            <div className="profile-header-actions">
              <Link to="/services">
                <button className="btn-browse-services">
                  + Book New Service
                </button>
              </Link>
              <button onClick={handleLogout} className="btn-secondary-logout">
                Logout
              </button>
            </div>
          </div>

          {/* STATS STRIP */}
          <div className="profile-stats-grid">
            <div className="stat-card">
              <span className="stat-label">Total Booked Services</span>
              <h3 className="stat-value">{myBookings.length}</h3>
              <span className="stat-subtext">All time orders</span>
            </div>
            <div className="stat-card stat-card-active">
              <span className="stat-label">Active / In Progress</span>
              <h3 className="stat-value" style={{ color: '#38bdf8' }}>{activeCount}</h3>
              <span className="stat-subtext">Under delivery</span>
            </div>
            <div className="stat-card stat-card-completed">
              <span className="stat-label">Completed Services</span>
              <h3 className="stat-value" style={{ color: '#1dbf73' }}>{completedCount}</h3>
              <span className="stat-subtext">Delivered & verified</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Total Investment</span>
              <h3 className="stat-value" style={{ color: '#f59e0b' }}>${totalSpent.toFixed(2)}</h3>
              <span className="stat-subtext">Secured in escrow</span>
            </div>
          </div>
        </div>

        {/* ================= BOOKED SERVICES SECTION ================= */}
        <section className="profile-card booked-services-section">
          <div className="section-header-bar">
            <div>
              <h2 className="section-main-title">
                📁 My Booked Services & Orders
              </h2>
              <p className="section-sub-title">
                Manage, track status, and view delivery packages for all services you have booked.
              </p>
            </div>

            {/* Filter Tabs & Search */}
            <div className="filters-toolbar">
              <div className="search-box-wrap">
                <span className="search-icon">🔍</span>
                <input 
                  type="text" 
                  placeholder="Search booked services or providers..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>

              <div className="filter-pill-group">
                {['All', 'Active', 'Completed'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setFilterStatus(tab)}
                    className={`filter-pill ${filterStatus === tab ? 'active' : ''}`}
                  >
                    {tab} ({tab === 'All' ? myBookings.length : myBookings.filter(b => b.status?.toLowerCase() === tab.toLowerCase()).length})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* BOOKINGS LIST */}
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading your booked services...</p>
            </div>
          ) : filteredBookings.length > 0 ? (
            <div className="booked-cards-grid">
              {filteredBookings.map((b) => (
                <div key={b.id || b.bookingId} className="booked-service-card">
                  
                  {/* Card Top: Image / Service Banner & Badges */}
                  <div className="card-top-row">
                    <div className="service-info-group">
                      <div className="service-icon-box">
                        <img 
                          src={b.workImg || (b.service?.toLowerCase().includes('web') ? '/web.jpeg' : b.service?.toLowerCase().includes('cloud') ? '/cloud.jpeg' : b.service?.toLowerCase().includes('data') ? '/data.jpeg' : b.service?.toLowerCase().includes('design') || b.service?.toLowerCase().includes('ui') ? '/ui.jpeg' : '/graphic.jpeg')} 
                          alt={b.service} 
                          className="service-thumb-img"
                          onError={(e) => { e.target.src = '/web.jpeg'; }}
                        />
                      </div>
                      <div>
                        <span className="order-id-tag">Order #{b.id || b.bookingId}</span>
                        <h3 className="service-title">{b.service}</h3>
                        {b.providerName && (
                          <p className="provider-name-tag">
                            👤 Expert: <strong>{b.providerName}</strong>
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="card-status-col">
                      <span className={`status-badge-lg status-${(b.status || 'Active').toLowerCase()}`}>
                        ● {b.status || 'Active'}
                      </span>
                      <span className="booking-price">{b.amount}</span>
                    </div>
                  </div>

                  {/* Card Middle: Deliverable info & requirements */}
                  <div className="card-middle-grid">
                    <div className="meta-box">
                      <span className="meta-label">📅 Booked On</span>
                      <span className="meta-value">{b.date || 'Recent'}</span>
                    </div>
                    <div className="meta-box">
                      <span className="meta-label">📦 Delivery Package</span>
                      <span className="meta-value">{b.deliveryFormat || 'ZIP Source Code Package'}</span>
                    </div>
                    <div className="meta-box">
                      <span className="meta-label">📬 Destination Email</span>
                      <span className="meta-value">{b.userEmail || b.deliveryEmail || user.email}</span>
                    </div>
                    <div className="meta-box">
                      <span className="meta-label">⚡ Est. Delivery</span>
                      <span className="meta-value" style={{ color: '#1dbf73', fontWeight: '700' }}>
                        {b.status === 'Completed' ? '✅ Delivered' : '24 - 48 Hours'}
                      </span>
                    </div>
                  </div>

                  {/* Project brief if any */}
                  {b.details && (
                    <div className="project-brief-box">
                      <span className="brief-label">📝 Project Brief / Requirements:</span>
                      <p className="brief-text">"{b.details}"</p>
                    </div>
                  )}

                  {/* Card Footer: Action Buttons */}
                  <div className="card-footer-actions">
                    <div className="left-actions">
                      {b.providerId && (
                        <Link to={`/profile/${b.providerId}`} className="btn-action-outline">
                          🔍 View Expert Profile
                        </Link>
                      )}
                      {b.providerId && (
                        <Link to={`/book/${b.providerId}`} className="btn-action-reorder">
                          ⚡ Re-order Service
                        </Link>
                      )}
                    </div>
                    <div>
                      <button 
                        onClick={() => setSelectedReceipt(b)} 
                        className="btn-action-receipt"
                      >
                        📄 View Invoice
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="empty-bookings-state">
              <div className="empty-icon">📂</div>
              <h3>No Booked Services Found</h3>
              <p>
                {searchQuery || filterStatus !== 'All' 
                  ? "No bookings match your selected search or filter criteria."
                  : "You have not booked any services yet. Explore our verified experts to get started!"}
              </p>
              <Link to="/services">
                <button className="btn-browse-services" style={{ marginTop: '16px' }}>
                  Explore All 24+ Professional Services →
                </button>
              </Link>
            </div>
          )}
        </section>

        {/* BOTTOM NAVIGATION / HELPER */}
        <div className="profile-bottom-strip">
          <Link to="/services" className="no-link-style">
            <button className="btn-back-services">← Explore More Services</button>
          </Link>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            🔒 All transactions & deliverables are protected by Skillora Escrow Guarantee.
          </div>
        </div>
      </main>

      {/* ================= INVOICE / RECEIPT MODAL ================= */}
      {selectedReceipt && (
        <div className="receipt-modal-backdrop" onClick={() => setSelectedReceipt(null)}>
          <div className="receipt-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3 style={{ margin: 0, color: '#f8fafc', fontSize: '1.3rem' }}>🧾 Booking Tax Invoice & Receipt</h3>
                <span style={{ color: '#1dbf73', fontSize: '0.85rem' }}>Order ID: #{selectedReceipt.id || selectedReceipt.bookingId}</span>
              </div>
              <button className="modal-close-btn" onClick={() => setSelectedReceipt(null)}>✕</button>
            </div>

            <div className="modal-body">
              <div className="invoice-meta-grid">
                <div>
                  <label>Client Name</label>
                  <p>{user.name}</p>
                </div>
                <div>
                  <label>Client Email</label>
                  <p>{user.email}</p>
                </div>
                <div>
                  <label>Transaction Date</label>
                  <p>{selectedReceipt.date || 'Recent'}</p>
                </div>
                <div>
                  <label>Status</label>
                  <p style={{ color: '#1dbf73', fontWeight: '700' }}>{selectedReceipt.status || 'Active & Paid'}</p>
                </div>
              </div>

              <div className="invoice-line-items">
                <div className="line-item header">
                  <span>Description</span>
                  <span>Amount</span>
                </div>
                <div className="line-item">
                  <span>{selectedReceipt.service} (by {selectedReceipt.providerName || 'Skillora Expert'})</span>
                  <span>{selectedReceipt.amount}</span>
                </div>
                <div className="line-item">
                  <span>Deliverable Format</span>
                  <span>{selectedReceipt.deliveryFormat || 'ZIP Package'}</span>
                </div>
                <div className="line-item">
                  <span>Platform & Escrow Protection Fee</span>
                  <span>$2.50 (Included)</span>
                </div>
                <div className="line-item total">
                  <span>Total Paid</span>
                  <span style={{ color: '#1dbf73', fontSize: '1.2rem' }}>{selectedReceipt.amount}</span>
                </div>
              </div>

              <div className="delivery-notice-box">
                <strong>Delivery Notice:</strong> Completed deliverables and source files are dispatched to <strong>{selectedReceipt.userEmail || selectedReceipt.deliveryEmail || user.email}</strong>.
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-print-receipt" onClick={() => window.print()}>
                🖨️ Print Receipt
              </button>
              <button className="btn-close-modal" onClick={() => setSelectedReceipt(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="footer" style={{ textAlign: 'center', padding: '24px', borderTop: '1px solid rgba(255,255,255,0.06)', color: '#64748b', fontSize: '0.9rem' }}>
        © {new Date().getFullYear()} Skillora Freelance Marketplace. All rights reserved.
      </footer>
    </div>
  );
};

export default UserProfile;
