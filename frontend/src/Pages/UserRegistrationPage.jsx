import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./register.css";
import { authService } from "../services/authService";

const UserRegistrationPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    Role: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.register(formData);
      alert('Registration Successful');
    } catch (error) {
      alert(error.response?.data?.message || 'Registration Successful');
    }
  };
  
  return (
    <div className="page-wrapper">
      <div style={{ position: 'absolute', top: '24px', left: '30px', zIndex: 10 }}>
        <Link to="/" className="back-btn-header" style={{ marginBottom: 0 }}>
          ← Back to Home
        </Link>
      </div>
      <div className="main-container">
        <div className="left-side">
          <div className="animated-image-box">
            <video 
              src="/registerui.mp4" 
              className="float-img" 
              autoPlay 
              loop 
              muted 
              playsInline
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        <div className="right-side">
          <div className="bg-shape"></div>
          <div className="form-box">
            <h2>Registration Form</h2>
            <p>Create your account to start thriving.</p>
            <form onSubmit={handleSubmit}>
              <div className="input-field">
                <input type="text" name='name' placeholder='Full Name' onChange={handleChange} required />
              </div>

              <div className="input-field">
                <input type="email" name='email' placeholder='Email Address' onChange={handleChange} required />
              </div>

              <div className="input-field">
                <input type="password" name='password' placeholder='Password' onChange={handleChange} required />
              </div>

              <div className="input-field">
                <select name="Role" value={formData.Role} onChange={handleChange} required>
                  <option value="">Select Your Role</option>
                  <option value="Admin">Admin</option>
                  <option value="Customer">Customer</option>
                  <option value="Freelancer">Freelance</option>

                </select>
              </div>

              <button type="submit" className="glow-button">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegistrationPage;