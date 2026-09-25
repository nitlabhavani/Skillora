import React, { useState } from 'react';

const MyOrders = () => {
  const [orders, setOrders] = useState([
    { id: 1, service: 'Resume Writing', status: 'In Progress', editable: true },
    { id: 2, service: 'Design Logo', status: 'Completed', editable: false },
  ]);

  const editOrder = (id) => {
    setOrders(
      orders.map(o =>
        o.id === id ? { ...o, status: 'Edited' } : o
      )
    );
  };

  return (
    <div
      style={{
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '8px',
      }}
    >
      <h2>My Orders</h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
        }}
      >
        {orders.map(o => (
          <div
            key={o.id}
            style={{
              padding: '20px',
              border: '1px solid #ddd',
              borderRadius: '8px',
            }}
          >
            <h3>{o.service}</h3>
            <p>Status: {o.status}</p>

            {o.editable && (
              <button onClick={() => editOrder(o.id)} style={buttonStyle}>
                Edit
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default MyOrders;
