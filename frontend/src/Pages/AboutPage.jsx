import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../AboutPage.css";
import { authService } from "../services/authService";

function AboutPage() {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="homepage">
      {/* ================= NAVBAR ================= */}
      <header className="navbar">
        <div className="logo brand-logo">
          <span className="logo-icon">S</span>
          <span className="logo-text">
            Skill<span className="logo-accent">ora</span>
          </span>
        </div>
        <nav className="nav-links">
          <Link to="/" className="no-link-style">HOME</Link>
          <Link to="/about" className="no-link-style">ABOUT</Link>
          <Link to="/services" className="no-link-style">SERVICES</Link>
          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Link to="/user-profile" className="no-link-style">
                <button className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px' }}>
                  <span>👤</span> {currentUser.name || 'My Profile'}
                </button>
              </Link>
              <button onClick={handleLogout} className="btn-primary" style={{ padding: '8px 16px', backgroundColor: '#e11d48', borderColor: '#e11d48' }}>
                Logout
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Link to="/login" className="no-link-style">
                <button className="btn-outline" style={{ padding: '8px 16px' }}>Login</button>
              </Link>
              <Link to="/register" className="no-link-style">
                <button className="btn-primary" style={{ padding: '8px 16px' }}>Signup</button>
              </Link>
            </div>
          )}
        </nav>
      </header>

      {/* ================= ABOUT HERO WITH WORKSPACE ILLUSTRATION ================= */}
      <section className="hero about-hero-split">
        <div className="hero-content left-align">
          <h1>About Skillora</h1>
          <p>
            Skillora is a modern freelance ecosystem designed to connect
            vetted tech, creative, and AI professionals with high-growth businesses.
            From full-stack development to brand design and AI integration, we power seamless project delivery.
          </p>
          <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
            <Link to="/services" className="no-link-style">
              <button className="btn-primary">Explore Services</button>
            </Link>
            {!currentUser && (
              <Link to="/register" className="no-link-style">
                <button className="btn-outline">Join as Expert</button>
              </Link>
            )}
          </div>
        </div>

        {/* PROJECT ILLUSTRATION */}
        <div className="hero-animation-right">
          <img 
            src="/about-illustration.jpg" 
            alt="Skillora Freelance Marketplace Ecosystem" 
            className="main-video-element"
            style={{ 
              objectFit: 'cover',
              borderRadius: '20px',
              border: '1px solid rgba(29, 191, 115, 0.3)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(29, 191, 115, 0.2)'
            }}
          />
        </div>
      </section>

      {/* ================= REST OF CONTENT ================= */}
      <section className="features">
        <h2>Who We Are</h2>
        <p style={{ maxWidth: "800px", margin: "20px auto", lineHeight: "1.8", color: "#94a3b8" }}>
          Skillora was created to bridge the gap between skilled freelancers and
          clients seeking trusted expertise. Our platform enables secure
          collaboration, transparent payments, and efficient project
          management—all in one place.
        </p>
      </section>

      <section className="stats">
        <div className="stat-card">
          <h3>Our Mission</h3>
          <p>To empower freelancers and businesses by providing a secure, transparent, and easy-to-use marketplace.</p>
        </div>
        <div className="stat-card">
          <h3>Our Vision</h3>
          <p>To become a global platform where skills meet opportunity without boundaries.</p>
        </div>
        <div className="stat-card">
          <h3>Our Values</h3>
          <p>Trust, transparency, quality, and innovation drive everything we do.</p>
        </div>
      </section>

      <footer className="footer">
        © {new Date().getFullYear()} Skillora. All rights reserved.
      </footer>
    </div>
  );
}

export default AboutPage;