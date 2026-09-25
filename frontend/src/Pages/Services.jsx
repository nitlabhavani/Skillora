import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Services.css';

const Services = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    {
      name: "Web Development",
      slug: "web-development",
      desc: "Custom websites, high-performance web apps, and robust full-stack solutions.",
      image: "/web.jpeg"
    },
    {
      name: "Graphic Design",
      slug: "graphic-design",
      desc: "Impactful logos, cohesive branding, and creative visual designs.",
      image: "/graphic.jpeg"
    },
    {
      name: "Digital Marketing",
      slug: "digital-marketing",
      desc: "Data-driven SEO strategies, targeted ads, and social media growth.",
      image: "/digital.jpeg"
    },
    {
      name: "UI / UX Design",
      slug: "ui-ux-design",
      desc: "User-centric designs with modern, intuitive interfaces for better conversion.",
      image: "/ui.jpeg"
    },
    {
      name: "Content Writing",
      slug: "content-writing",
      desc: "Engaging blogs, high-converting copywriting, and technical documentation.",
      image: "/content.jpeg"
    },
    {
      name: "Mobile App Development",
      slug: "mobile-app-development",
      desc: "Native and cross-platform Android & iOS application development.",
      image: "/mobile.jpeg"
    },
    {
      name: "Data & Analytics",
      slug: "data-analytics",
      desc: "In-depth data analysis and interactive visualization to drive decisions.",
      image: "/data.jpeg"
    },
    {
      name: "Cyber Security",
      slug: "cyber-security",
      desc: "Proactive security audits and protection for your digital assets.",
      image: "/cyber.jpeg"
    },
    {
      name: "Artificial Intelligence",
      slug: "ai-solutions",
      desc: "Custom AI models, machine learning integration, and automation tools.",
      image: "/ai.jpeg" 
    },
  ];

  const filteredServices = categories.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="service-page">
     <header className="service-header">
  <span className="badge">Expert Solutions</span>
  <h1>Solutions to Scale Your Business</h1>
  

  <div className="search-wrapper">
    <div className="search-box">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        placeholder="Search for services..."
        className="hero-search-bar"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  </div>
</header>

     <div className="service-grid">
  {filteredServices.length > 0 ? (
    // Add 'index' here to generate IDs 1, 2, 3...
    filteredServices.map((category, index) => (
      <Link
        key={category.slug}
        // FIX: Point to /profile/ instead of /category/
        to={`/profile/${index + 1}`} 
        className="service-card"
      >
        <div className="service-image">
          <img src={category.image} alt={category.name} />
        </div>
        
        <div className="service-content">
          <h3>{category.name}</h3>
          <p>{category.desc}</p>
          <span className="explore-text">View Details →</span>
        </div>
      </Link>
    ))
  ) : (
    <div className="no-results">
      <p>No services found matching "{searchTerm}"</p>
    </div>
  )}
</div>
    </div>
  );
};


export default Services;