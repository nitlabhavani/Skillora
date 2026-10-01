import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Services.css';
import { serviceService } from '../services/serviceService';

const defaultCategories = [
  {
    name: "Web Development",
    slug: "web-development",
    serviceId: "1",
    desc: "Custom websites, high-performance web apps, and robust full-stack solutions.",
    image: "/web.jpeg"
  },
  {
    name: "Graphic Design",
    slug: "graphic-design",
    serviceId: "2",
    desc: "Impactful logos, cohesive branding, and creative visual designs.",
    image: "/graphic.jpeg"
  },
  {
    name: "Digital Marketing",
    slug: "digital-marketing",
    serviceId: "3",
    desc: "Data-driven SEO strategies, targeted ads, and social media growth.",
    image: "/digital.jpeg"
  },
  {
    name: "UI / UX Design",
    slug: "ui-ux-design",
    serviceId: "4",
    desc: "User-centric designs with modern, intuitive interfaces for better conversion.",
    image: "/ui.jpeg"
  },
  {
    name: "Content Writing",
    slug: "content-writing",
    serviceId: "5",
    desc: "Engaging blogs, high-converting copywriting, and technical documentation.",
    image: "/content.jpeg"
  },
  {
    name: "Mobile App Development",
    slug: "mobile-app-development",
    serviceId: "6",
    desc: "Native and cross-platform Android & iOS application development.",
    image: "/mobile.jpeg"
  },
  {
    name: "Data & Analytics",
    slug: "data-analytics",
    serviceId: "7",
    desc: "In-depth data analysis and interactive visualization to drive decisions.",
    image: "/data.jpeg"
  },
  {
    name: "Cyber Security",
    slug: "cyber-security",
    serviceId: "8",
    desc: "Proactive security audits and protection for your digital assets.",
    image: "/cyber.jpeg"
  },
  {
    name: "Artificial Intelligence",
    slug: "ai-solutions",
    serviceId: "9",
    desc: "Custom AI models, machine learning integration, and automation tools.",
    image: "/ai.jpeg" 
  },
  {
    name: "Cloud & DevOps",
    slug: "cloud-devops",
    serviceId: "19",
    desc: "Scalable AWS/Azure infrastructure, Kubernetes orchestration, and CI/CD pipelines.",
    image: "/cloud.jpeg"
  },
  {
    name: "Blockchain & Web3",
    slug: "blockchain-web3",
    serviceId: "21",
    desc: "Smart contracts, decentralized dApps, Web3 integrations, and crypto security.",
    image: "/blockchain.jpeg"
  },
  {
    name: "Video & Motion Graphics",
    slug: "video-motion",
    serviceId: "23",
    desc: "High-retention video editing, 3D motion design, YouTube production, and VFX.",
    image: "/video.jpeg"
  }
];

const Services = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState(defaultCategories);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await serviceService.getAll();
        if (data?.categories && data.categories.length > 0) {
          setCategories(data.categories);
        }
      } catch (err) {
        console.warn("Using fallback service categories:", err);
      }
    };
    fetchServices();
  }, []);

  const filteredServices = categories.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="service-page">
     <header className="service-header">
      <div style={{ textAlign: 'left', maxWidth: '1200px', margin: '0 auto 15px auto' }}>
        <Link to="/" className="back-btn-header">
          ← Back to Home
        </Link>
      </div>
  <span className="badge">Expert Solutions</span>
  <h1>Solutions to Scale Your Business</h1>
  

  <div className="search-wrapper">
    <div className="search-box">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        placeholder="Search for services..."
        className="hero-search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  </div>
</header>

     <div className="service-grid">
  {filteredServices.length > 0 ? (
    filteredServices.map((category, index) => (
      <Link
        key={category.slug || index}
        to={`/profile/${category.serviceId || index + 1}`} 
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