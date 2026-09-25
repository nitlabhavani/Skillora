import React, { useState, useEffect } from 'react';
import './ProviderDashboard.css';
import { bookingService } from '../services/bookingService';

const ProviderDashboard = () => {
  const [selectedProvider, setSelectedProvider] = useState({ id: 1, name: "Alex Rivera", service: "Web Development" });
  const [customBookingData, setCustomBookingData] = useState({});
  const [activeActionId, setActiveActionId] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await bookingService.getProviderClients(selectedProvider.id);
        if (data?.clients?.length > 0) {
          setCustomBookingData(prev => ({
            ...prev,
            [selectedProvider.id]: data.clients
          }));
        }
      } catch (err) {
        console.warn("API provider clients fetch notice:", err);
      }
    };
    fetchClients();
  }, [selectedProvider]);

 
  const handleDownloadCSV = () => {
    const data = bookingData[selectedProvider.id];
    
    const headers = ["Customer Name", "Email", "Date", "Status"];
    
    const csvContent = [
      headers.join(","), 
      ...data.map(item => `${item.name},${item.email},${item.date},${item.status}`)
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${selectedProvider.name}_Clients.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const providers = [
    { id: 1, name: "Alex Rivera", service: "Web Development" },
    { id: 2, name: "Jordan Smith", service: "Web Development" },
    { id: 3, name: "Sarah Jenkins", service: "Graphic Design" },
    { id: 4, name: "Liam O'Connor", service: "Graphic Design" },
    { id: 5, name: "Elena Rossi", service: "UI/Ux Design" },
    { id: 6, name: "David Vark", service: "UI/Ux Design" },
    { id: 7, name: "Dr. James Wilson", service: "Content Writing" },
    { id: 8, name: "Klara Bloom", service: "Content Writing" },
    { id: 9, name: "Maria Garcia", service: "Digital Marketing" },
    { id: 10, name: "Anita Desai", service: "Digital Marketing" },
    { id: 11, name: "Kenji Tanaka", service: "Mobile App Dev" },
    { id: 12, name: "Mai Wong", service: "Mobile App Dev" },
    { id: 13, name: "Riley Steele", service: "Cyber Security" },
    { id: 14, name: "Victor Brown", service: "Cyber Security" },
    { id: 15,name:"Sophia Alt", service: "AI Strategy" }
  ];

  const bookingData = {
    1: [
      { id: "c1", name: "Arjun", email: "arjun.m@tech.com", date: "Feb 10", status: "Paid" },
      { id: "c2", name: "Bhavya", email: "bhavyab@cinema.com", date: "Feb 12", status: "Pending" },
      { id: "c3", name: "David", email: "davud@fitness.com", date: "Feb 14", status: "Paid" }
    ],
    2: [
      { id: "c4", name: "Priya", email: "priya@studio.in", date: "Feb 05", status: "Paid" },
      { id: "c5", name: "Chinni", email: "chinni@gym.com", date: "Feb 08", status: "Paid" },
      { id: "c6", name: "Ramya", email: "ramya@spy.com", date: "Feb 09", status: "Pending" }
    ],
    3: [
      { id: "c7", name: "Bhavya", email: "bhavya@stark.com", date: "Feb 01", status: "Paid" },
      { id: "c8", name: "David", email: "david@nyc.com", date: "Feb 03", status: "Paid" },
      { id: "c9", name: "Priya", email: "priya@chaos.com", date: "Feb 04", status: "Pending" }
    ],
    4: [
      { id: "c10", name: "Chinni", email: "chinni@apple.com", date: "Feb 11", status: "Paid" },
      { id: "c11", name: "Arjun", email: "arjun@x.com", date: "Feb 12", status: "Paid" },
      { id: "c12", name: "Bill Gates", email: "bill@micro.com", date: "Feb 15", status: "Pending" }
    ],
    5: [
      { id: "c13", name: "Mark Z.", email: "zuck@meta.com", date: "Feb 18", status: "Paid" },
      { id: "c14", name: "Jeff Bezos", email: "jeff@amazon.com", date: "Feb 20", status: "Paid" },
      { id: "c15", name: "Warren B.", email: "warren@berkshire.com", date: "Feb 22", status: "Paid" }
    ],
    6: [
      { id: "c16", name: "Sundar Pichai", email: "sundar@google.com", date: "Feb 10", status: "Paid" },
      { id: "c17", name: "Satya Nadella", email: "satya@msft.com", date: "Feb 11", status: "Paid" },
      { id: "c18", name: "Tim Cook", email: "tim@apple.com", date: "Feb 12", status: "Pending" }
    ],
    7: [
      { id: "c19", name: "Leonardo D.", email: "leo@oscar.com", date: "Feb 14", status: "Paid" },
      { id: "c20", name: "Brad Pitt", email: "brad@hollywood.com", date: "Feb 16", status: "Paid" },
      { id: "c21", name: "Tom", email: "tom@mission.com", date: "Feb 17", status: "Paid" }
    ],
    8: [
      { id: "c22", name: "John ", email: "john@continental.com", date: "Feb 15", status: "Paid" },
      { id: "c23", name: "Bhavya", email: "bhavya@gotham.com", date: "Feb 16", status: "Paid" },
      { id: "c24", name: "Varshini", email: "varshini@user.com", date: "Feb 18", status: "Paid" }
    ],
    9: [
      { id: "c25", name: "Sam Altman", email: "sam@openai.com", date: "Feb 25", status: "Paid" },
      { id: "c26", name: "Jensen Huang", email: "jensen@nvidia.com", date: "Feb 26", status: "Paid" },
      { id: "c27", name: "Demis H.", email: "demis@deepmind.com", date: "Feb 28", status: "Pending" }
    ],
    10:[
      { id: "c28", name: "David", email: "stayhard@fitness.com", date: "Feb 14", status: "Paid" },
      { id: "c29", name: "Jems", email: "jems@deepmind.com", date: "Feb 28", status: "Pending" }
    ],
    11:[
     { id: "c30", name: "John Wick", email: "john@continental.com", date: "Feb 15", status: "Paid" }
    ],
    12:[
    { id: "c15", name: "Vasavi", email: "vasavi@berkshire.com", date: "Feb 22", status: "Paid" },
     { id: "c16", name: "Sundar", email: "sundar@google.com", date: "Feb 10", status: "Paid" }
    ],
    13:[
     { id: "c18", name: "Tim Cook", email: "tim@apple.com", date: "Feb 12", status: "Pending" },
     { id: "c9", name: "Bhavi", email: "bhavi@chaos.com", date: "Feb 04", status: "Pending" }
    ],
    14:[ 
     { id: "c9", name: "Tom", email: "tom@chaos.com", date: "Feb 04", status: "Pending" } 
    ],
    15:[
    { id: "c20", name: "Bhavi", email: "bhavi@hollywood.com", date: "Feb 16", status: "Paid" },
      { id: "c21", name: "Tom ", email: "tom@mission.com", date: "Feb 17", status: "Paid" }
    ]
  };

  return (
    <div className="provider-real-dash">
      <div className="dash-sidebar">
        <div className="logo-area">
          <div className="logo-hex">P</div>
          <h2>Provider Hub</h2>
        </div>
        <nav className="provider-nav">
          <p className="nav-label">Experts List</p>
          {providers.map((p) => (
            <div 
              key={p.id} 
              className={`nav-item ${selectedProvider.id === p.id ? 'active' : ''}`}
              onClick={() => {
                setSelectedProvider(p);
                setActiveActionId(null); 
              }}
            >
              <span className="p-dot"></span>
              <div className="nav-text">
                <strong>{p.name}</strong>
                <small>{p.service}</small>
              </div>
            </div>
          ))}
        </nav>
      </div>

      <main className="dash-main-content">
        <header className="main-header">
          <div className="header-title">
            <h1>Customer Database</h1>
            <p>Viewing clients for <strong>{selectedProvider.name}</strong></p>
          </div>
          <div className="header-actions">
           
            <button className="export-btn" onClick={handleDownloadCSV}>Download CSV</button>
          </div>
        </header>

        <div className="stats-strip">
          <div className="s-box"><span>Active Tasks</span> <strong>3</strong></div>
          <div className="s-box"><span>Revenue</span> <strong>$2,450.00</strong></div>
          <div className="s-box"><span>Avg Rating</span> <strong>4.9/5</strong></div>
        </div>

        <div className="table-container">
          <table className="real-table">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Email Address</th>
                <th>Service Date</th>
                <th>Payment Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(customBookingData[selectedProvider.id] || bookingData[selectedProvider.id] || []).map((customer) => (
                <tr key={customer.id}>
                  <td>
                    <div className="table-user">
                      <div className="u-avatar">{customer.name.charAt(0)}</div>
                      {customer.name}
                    </div>
                  </td>
                  <td>{customer.email}</td>
                  <td>{customer.date}</td>
                  <td>
                    <span className={`badge ${customer.status.toLowerCase()}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td style={{ position: 'relative' }}>
                    
                    <button 
                      className="action-circle" 
                      onClick={() => setActiveActionId(activeActionId === customer.id ? null : customer.id)}
                    >
                      ⋮
                    </button>

                    {activeActionId === customer.id && (
                      <div className="action-popup">
                        <p><strong>Client Info:</strong></p>
                        <p>ID: {customer.id}</p>
                        <hr />
                        <button onClick={() => alert(`Opening chat with ${customer.name}`)}>Message</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default ProviderDashboard;