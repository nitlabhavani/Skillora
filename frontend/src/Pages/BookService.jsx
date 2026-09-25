import React, { useState, useEffect } from 'react';

const BookService = ({ setPage }) => {
  const [bids, setBids] = useState([100, 120]);
  const [selectedBid, setSelectedBid] = useState('');
  const [details, setDetails] = useState('');

  useEffect(() => {
    const interval = setInterval(() => setBids(prev => [...prev, Math.floor(Math.random() * 50) + 100]), 5000);
    return () => clearInterval(interval);
  }, []);

  const handleBook = () => {
    alert('Service booked! Redirecting to payment...');
    setPage('payment');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', backgroundColor: 'white', borderRadius: '8px' }}>
      <h2>Book a Service</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', '@media (min-width: 768px)': { flexDirection: 'row' } }}>
        <div style={{ flex: 1 }}>
          <h3>Live Bids</h3>
          <ul>{bids.map((bid, idx) => <li key={idx}>${bid}</li>)}</ul>
        </div>
        <div style={{ flex: 1 }}>
          <input type="number" placeholder="Your Bid" value={selectedBid} onChange={e => setSelectedBid(e.target.value)} style={inputStyle} />
          <textarea placeholder="Project Details" value={details} onChange={e => setDetails(e.target.value)} style={inputStyle} />
          <button onClick={handleBook} style={buttonStyle}>Book Service</button>
        </div>
      </div>
    </div>
  );
};

const inputStyle = { display: 'block', width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '5px' };
const buttonStyle = { padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' };

export default BookService;