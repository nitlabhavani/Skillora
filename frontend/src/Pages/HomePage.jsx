import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import heroVideo from "../assets/herovideo.mp4";
import { authService } from "../services/authService";

function HomePage() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('skillora_theme') === 'dark';
  });
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/');
    window.location.reload();
  };

  const handleThemeToggle = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem('skillora_theme', newTheme ? 'dark' : 'light');
  };

  return (
    <div className={`homepage ${darkMode ? "dark" : "light"}`}>

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

          {/* ===== LIGHT / DARK TOGGLE ===== */}
          <div className="theme-toggle">
            <span className={!darkMode ? "active" : ""}>Light</span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={handleThemeToggle}
              />
              <span className="toggle-slider"></span>
            </label>
            <span className={darkMode ? "active" : ""}>Dark</span>
          </div>

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

      {/* ================= HERO WITH VIDEO ================= */}
     {/* ================= HERO WITH VIDEO ================= */}
<section className="hero video-hero">
  <video
    className="hero-video"
    src={heroVideo}
    autoPlay
    loop
    muted
    playsInline
  />

  {/* Dark overlay */}
  <div className="hero-overlay"></div>

  {/* TEXT ON VIDEO */}
  <div className="hero-content hero-center">
    <h1>Hire Experts. Get Results.</h1>
    <p>
      Skillora connects businesses with verified freelancers across
      development, design, marketing, and more.
    </p>

    <div className="hero-actions">
      <Link to="/login" className="no-link-style">
        <button className="btn-primary">LOGIN</button>
      </Link>
      <Link to="/register" className="no-link-style">
        <button className="btn-outline">REGISTER</button>
      </Link>
    </div>
  </div>
</section>


      {/* ================= STATS ================= */}
      <section className="stats">
        <div className="stat-card"><h3>50K+</h3><p>Freelancers</p></div>
        <div className="stat-card"><h3>20K+</h3><p>Projects Completed</p></div>
        <div className="stat-card"><h3>98%</h3><p>Client Satisfaction</p></div>
        <div className="stat-card"><h3>100+</h3><p>Countries</p></div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="features">
        <h2>Why Choose Skillora?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Verified Freelancers</h3>
            <p>Work only with trusted and skilled professionals.</p>
          </div>
          <div className="feature-card">
            <h3>Secure Payments</h3>
            <p>Escrow-based payments for complete safety.</p>
          </div>
          <div className="feature-card">
            <h3>24/7 Support</h3>
            <p>Our support team is always available.</p>
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="categories">
        <h2>Popular Categories</h2>
        <br />
        <div className="category-grid">
          {[
            "Web Development",
            "Graphic Design",
            "Digital Marketing",
            "UI / UX Design",
            "Content Writing",
            "Mobile App Development",
            "Data & Analytics",
            "Cyber Security",
            "Artificial Intelligence",
            "Cloud & DevOps",
            "Blockchain & Web3",
            "Video & Motion Graphics"
          ].map((item) => (
            <div key={item} className="category-card">
              <h3>{item}</h3>
              <p>Top-rated professionals ready to help you.</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="how-it-works">
        <h2>How Skillora Works</h2>
        <div className="steps">
          <div className="step">
            <span>1</span><br />
            <h3>Post Your Job</h3>
            <p>Describe your project and budget.</p>
          </div>
          <div className="step">
            <span>2</span><br />
            <h3>Hire the Best</h3>
            <p>Compare freelancers and chat securely.</p>
          </div>
          <div className="step">
            <span>3</span><br />
            <h3>Pay Safely</h3>
            <p>Release payment only after approval.</p>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="cta">
        <h2>Start Your Journey with Skillora</h2>
        <br />
        <p>Join thousands of clients and freelancers today.</p>
        <br />
        <Link to="/register" className="no-link-style">
          <button className="btn-primary">Create Free Account</button>
        </Link>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        © {new Date().getFullYear()} Skillora. All rights reserved.
      </footer>

    </div>
  );
}

export default HomePage;
