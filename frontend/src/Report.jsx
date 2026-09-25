import React, { useState, useEffect } from 'react';
import './Report.css';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState("Financial Summary");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const reportCategories = [
    { name: "Web Development", icon: "💰", status: "Updated", trend: "+12.5%" },
    { name: "Graphic Design", icon: "👥", status: "Active", trend: "+5.2%" },
    { name: "Digital Marketing", icon: "🚀", status: "Critical", trend: "-2.1%" },
    { name: "UI/UX", icon: "⭐", status: "Stable", trend: "+0.8%" },
    { name: "Data & Analytics", icon: "🖥️", status: "Healthy", trend: "Stable" },
    { name: "Content writing", icon: "🎯", status: "Updated", trend: "+4.3%" },
    { name: "Mobile Dev", icon: "🔄", status: "Active", trend: "+3.9%" },
    { name: "Cyber Security", icon: "🌍", status: "Stable", trend: "+8.1%" },
    { name: "AI Efficiency", icon: "🤖", status: "Updated", trend: "+15.0%" }
  ];

  return (
    <div className="admin-reports-page">
      <div className="admin-container">
        
        <header className="admin-header">
          <h1>Business Intelligence</h1>
          <p>Analytical oversight and performance reporting across all sectors</p>
        </header>

        <div className="admin-grid">
          {/* Sidebar - Report List */}
          <aside className="reports-sidebar-list">
            <h2 className="panel-title">Report Center</h2>
            {reportCategories.map((report, index) => (
              <button 
                key={index}
                className={`report-item-btn ${selectedReport === report.name ? 'active' : ''}`}
                onClick={() => setSelectedReport(report.name)}
              >
                <div className="r-info">
                  <strong>{report.icon} {report.name}</strong>
                  <span>Status: {report.status}</span>
                </div>
                <div className={`trend-tag ${report.trend.includes('-') ? 'down' : 'up'}`}>
                  {report.trend}
                </div>
              </button>
            ))}
          </aside>

          {/* Main Display Area */}
          <main className="reports-display-area">
            <div className="view-header">
              <h2>{selectedReport}</h2>
              <div className="action-group">
                <button className="export-btn-minimal">CSV</button>
                <button className="count-badge">DOWNLOAD PDF</button>
              </div>
            </div>

            {/* Metric Summary Cards */}
            <div className="reports-stats-grid">
              <div className="r-mini-stat">
                <label>Current Value</label>
                <h3>{selectedReport === "Financial Summary" ? "$84,200" : "4.8/5.0"}</h3>
              </div>
              <div className="r-mini-stat">
                <label>Period Growth</label>
                <h3 style={{ color: '#1dbf73' }}>+18.4%</h3>
              </div>
              <div className="r-mini-stat">
                <label>Target Delta</label>
                <h3>92%</h3>
              </div>
            </div>

            {/* Data Visualization Mockup */}
            <div className="reports-visual-wrapper">
              <div className="chart-header">
                <span>Metric Breakdown</span>
                <span>Impact Score</span>
                <span>Reliability</span>
              </div>
              
              {/* Data Rows */}
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="report-row">
                  <div className="r-name">
                    <div className="r-avatar">{item}</div>
                    <strong>{selectedReport} Metric {String.fromCharCode(64 + item)}</strong>
                  </div>
                  <div className="p-impact">
                    <div className="impact-bar-bg">
                      <div className="impact-bar-fill" style={{ width: `${item * 20}%` }}></div>
                    </div>
                  </div>
                  <div className="r-status-label">High</div>
                </div>
              ))}
            </div>

            <button className="refresh-report-btn">↻ Refresh Real-Time Data</button>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Reports;