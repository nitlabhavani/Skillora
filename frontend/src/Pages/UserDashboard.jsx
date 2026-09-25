import React, { useEffect, useState } from 'react';
import './UserDashboard.css';
import { bookingService } from '../services/bookingService';

const UserDashboard = () => {

  const [users, setUsers] = useState([
    { id: "u1", userName: "Arjun", service: "Cloud Migration", amount: "$450.00", date: "Feb 01, 2026", status: "Completed" },
    { id: "u2", userName: "Ravi", service: "UI/UX Design", amount: "$1,200.00", date: "Feb 02, 2026", status: "Active" },
    { id: "u3", userName: "David ", service: "Web dev", amount: "$150.00", date: "Feb 02, 2026", status: "Pending" },
    { id: "u4", userName: "Priya Rai", service: "Content Writing", amount: "$300.00", date: "Feb 03, 2026", status: "Active" },
    { id: "u5", userName: "Chinni", service: "Mobile App dev", amount: "$500.00", date: "Feb 04, 2026", status: "Completed" },
    { id: "u6", userName: "Ramya", service: "Cyber Security", amount: "$900.00", date: "Feb 04, 2026", status: "Active" },
    { id: "u7", userName: "Pawan", service: "AI Consultation", amount: "$2,500.00", date: "Feb 05, 2026", status: "Active" },
    { id: "u8", userName: "Bhavya", service: "Cyber Security", amount: "$1,800.00", date: "Feb 05, 2026", status: "Completed" },
    { id: "u9", userName: "Varshini", service: "Frontend Dev", amount: "$750.00", date: "Feb 06, 2026", status: "Active" }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchBookings = async () => {
      try {
        const data = await bookingService.getAll();
        if (data?.bookings?.length > 0) {
          setUsers(data.bookings);
        }
      } catch (err) {
        console.warn("Could not fetch bookings from API, using fallback data:", err);
      }
    };
    fetchBookings();
  }, []);

  const deleteUser = async (id) => {
    if(window.confirm("Are you sure you want to remove this booking?")) {
      try {
        await bookingService.delete(id);
      } catch (err) {
        console.warn("Delete API notice:", err);
      }
      setUsers(users.filter(user => user.id !== id && user.bookingId !== id));
    }
  };

  const handleEditChange = (e) => {
    setEditingUser({ ...editingUser, [e.target.name]: e.target.value });
  };

  const saveEdit = async () => {
    try {
      await bookingService.update(editingUser.id || editingUser.bookingId, editingUser);
    } catch (err) {
      console.warn("Update API notice:", err);
    }
    setUsers(users.map(u => (u.id === editingUser.id || u.bookingId === editingUser.id) ? editingUser : u));
    setEditingUser(null);
  };

  const filteredUsers = users.filter(u => 
    u.userName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-mgmt-page">
      <div className="um-container">
        
        <header className="um-header">
          <div className="um-title">
            <h1>User Bookings</h1>
            <p>Managing {filteredUsers.length} filtered customer transactions</p>
          </div>
          
          <div className="um-search-wrapper">
             <input 
                type="text" 
                placeholder="Search by name or service..." 
                className="um-search-input"
                onChange={(e) => setSearchTerm(e.target.value)}
             />
          </div>

          <div className="um-stats">
            <div className="u-stat-box">
              <span>Total Revenue</span>
              <h3>$8,950.00</h3>
            </div>
          </div>
        </header>

        <div className="user-cards-grid">
          {filteredUsers.map((user) => (
            <div key={user.id} className="u-record-card">
              <div className="u-card-header">
                <div className="u-avatar-icon">{user.userName.charAt(0)}</div>
                <div className="u-name-group">
                  <h3>{user.userName}</h3>
                  <span className="u-id">ID: {user.id}</span>
                </div>
               
                <button className="u-del-btn" onClick={() => deleteUser(user.id)}>×</button>
              </div>

              <div className="u-card-body">
                <div className="u-info-row">
                  <span className="u-label">Service Booked</span>
                  <span className="u-value">{user.service}</span>
                </div>
                <div className="u-info-row">
                  <span className="u-label">Transaction Date</span>
                  <span className="u-value">{user.date}</span>
                </div>
                <div className="u-info-row total-row">
                  <span className="u-label">Payment</span>
                  <span className="u-price">{user.amount}</span>
                </div>
              </div>

              <div className="u-card-footer">
                <span className={`u-status-tag ${user.status.toLowerCase()}`}>
                  {user.status}
                </span>
                
                <button className="u-view-btn" onClick={() => setEditingUser(user)}>
                  Edit User
                </button>
              </div>
            </div>
          ))}
        </div>

        {editingUser && (
          <div className="um-modal-overlay">
            <div className="um-modal">
              <h2>Edit Booking Details</h2>
              <div className="um-input-group">
                <label>User Name</label>
                <input name="userName" value={editingUser.userName} onChange={handleEditChange} />
              </div>
              <div className="um-input-group">
                <label>Service Name</label>
                <input name="service" value={editingUser.service} onChange={handleEditChange} />
              </div>
              <div className="um-modal-actions">
                <button className="u-cancel-btn" onClick={() => setEditingUser(null)}>Cancel</button>
                <button className="u-save-btn" onClick={saveEdit}>Save Changes</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default UserDashboard;