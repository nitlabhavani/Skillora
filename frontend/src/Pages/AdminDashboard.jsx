import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../AdminDashboard.css";
import { adminService } from "../services/adminService";

// IMPORT YOUR NEW COMPONENTS
import UserDashboard from "./UserDashboard"; 
import Pay from "../Pay";
import Project from "../Project";
import Reports from "../Report";

function AdminDashboard() {
  // --- NAVIGATION STATE ---
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState({
    totalUsers: "12,450",
    freelancers: "7,320",
    activeProjects: "1,284",
    totalRevenue: "$245,000",
    recentActivity: [
      { user: "John Doe", freelancer: "Client", role: "Posted Project", status: "Completed", statusClass: "success" },
      { user: "Sarah Smith", freelancer: "Freelancer", role: "Submitted Proposal", status: "Pending", statusClass: "pending" }
    ]
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await adminService.getStats();
        if (data?.stats) {
          setStats(data.stats);
        }
      } catch (err) {
        console.warn("Admin stats API fetch notice:", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="admin-dashboard">

      {/* ================= SIDEBAR ================= */}
      <aside className="admin-sidebar">
        <h2 className="admin-logo">Skillora Admin</h2>

        <nav className="admin-nav">
          <button 
            className={activeTab === "dashboard" ? "active" : ""} 
            onClick={() => setActiveTab("dashboard")}
          >Dashboard</button>
          
          <button 
            className={activeTab === "users" ? "active" : ""} 
            onClick={() => setActiveTab("users")}
          >Users</button>
          
          <button 
            className={activeTab === "projects" ? "active" : ""} 
            onClick={() => setActiveTab("projects")}
          >Projects</button>
          
          <button 
            className={activeTab === "payments" ? "active" : ""} 
            onClick={() => setActiveTab("payments")}
          >Payments</button>
          
          <button 
            className={activeTab === "reports" ? "active" : ""} 
            onClick={() => setActiveTab("reports")}
          >Reports</button>
          
          <Link to="/" className="logout-link">Logout</Link>
        </nav>
      </aside>

      {/* ================= MAIN CONTENT AREA ================= */}
      <main className="admin-main">
        
        {/* CONDITIONAL RENDERING BASED ON TAB */}
        
        {activeTab === "dashboard" && (
          <>
            <header className="admin-header">
              <h1>Dashboard Overview</h1>
              <span>Admin Panel</span>
            </header>

            <section className="admin-stats">
              <div className="admin-card">
                <h3>Total Users</h3>
                <p>{stats.totalUsers}</p>
              </div>
              <div className="admin-card">
                <h3>Freelancers</h3>
                <p>{stats.freelancers}</p>
              </div>
              <div className="admin-card">
                <h3>Active Projects</h3>
                <p>{stats.activeProjects}</p>
              </div>
              <div className="admin-card">
                <h3>Total Revenue</h3>
                <p>{stats.totalRevenue}</p>
              </div>
            </section>

            <section className="admin-section">
              <h2>Recent Activity</h2>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Freelancer</th>
                    <th>Role</th>
                    <th>Action</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {(stats.recentActivity || []).map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.user}</td>
                      <td>{item.freelancer}</td>
                      <td>{item.role}</td>
                      <td>{item.status}</td>
                      <td className={`status ${item.statusClass || item.status.toLowerCase()}`}>{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </>
        )}

        {/* LOADING EXTERNAL COMPONENTS */}
        {activeTab === "users" && <UserDashboard />}
        {activeTab === "projects" && <Project />}
        {activeTab === "payments" && <Pay />}
        {activeTab === "reports" && <Reports />}

      </main>
    </div>
  );
}

export default AdminDashboard;