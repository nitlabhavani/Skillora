import React, { useState, useEffect } from 'react';
import './Project.css';

const Project = () => {
  const [selectedCategory, setSelectedCategory] = useState("Web Development");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const projectCategories = [
    { name: "Web Development", icon: "🌐", total: 12, active: 5 },
    { name: "Graphic Design", icon: "🎨", total: 8, active: 3 },
    { name: "Digital Marketing", icon: "📈", total: 15, active: 7 },
    { name: "UI/UX Design", icon: "✨", total: 10, active: 4 },
    { name: "Content Writing", icon: "✍️", total: 20, active: 12 },
    { name: "Mobile App Dev", icon: "📱", total: 6, active: 2 },
    { name: "Data & Analytics", icon: "📊", total: 9, active: 5 },
    { name: "Cyber Security", icon: "🛡️", total: 4, active: 1 },
    { name: "AI Strategy", icon: "🤖", total: 7, active: 3 }
  ];

  return (
    <div className="admin-project-page">
      <div className="admin-container">
        
        <header className="admin-header">
          <h1>Project Ecosystem</h1>
          <p>Global oversight of all active and completed service contracts</p>
        </header>

        <div className="admin-grid">
          {/* Sidebar - Category List */}
          <aside className="project-sidebar-list">
            <h2 className="panel-title">Service Sectors</h2>
            {projectCategories.map((cat, index) => (
              <button 
                key={index}
                className={`project-item-btn ${selectedCategory === cat.name ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.name)}
              >
                <div className="p-info">
                  <strong>{cat.icon} {cat.name}</strong>
                  <span>{cat.total} Total Projects</span>
                </div>
                <div className="active-dot"></div>
              </button>
            ))}
          </aside>

          {/* Main Display Area */}
          <main className="project-display-area">
            <div className="view-header">
              <h2>{selectedCategory} Details</h2>
              <span className="count-badge">LIVE TRACKING</span>
            </div>

            <div className="project-stats-grid">
              <div className="p-mini-stat">
                <label>Active Workflows</label>
                <h3>{projectCategories.find(c => c.name === selectedCategory)?.active}</h3>
              </div>
              <div className="p-mini-stat">
                <label>Completed</label>
                <h3>{projectCategories.find(c => c.name === selectedCategory)?.total - projectCategories.find(c => c.name === selectedCategory)?.active}</h3>
              </div>
            </div>

            <div className="project-list-wrapper">
              <div className="list-header">
                <span>Project Name</span>
                <span>Deadline</span>
                <span>Priority</span>
              </div>
              
              {/* Mock Project Rows */}
              {[1, 2, 3].map((item) => (
                <div key={item} className="project-row">
                  <div className="c-name">
                    <div className="c-avatar">P</div>
                    <strong>{selectedCategory} Sprint #{item}</strong>
                  </div>
                  <div className="p-date">Feb 2{item}, 2026</div>
                  <div className={`p-priority ${item === 1 ? 'high' : 'normal'}`}>
                    {item === 1 ? 'High' : 'Normal'}
                  </div>
                </div>
              ))}
            </div>

            <button className="add-project-btn">+ Deploy New Project</button>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Project;