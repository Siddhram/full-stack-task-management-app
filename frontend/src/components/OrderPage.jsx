import React, { useEffect, useState } from 'react';
import axios from 'axios';
import frontendurl from '../url';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token')); // Ensure you store the token in localStorage
        const response = await axios.get(`${frontendurl()}/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);
if(orders.length==0){
    return <div>Loading...</div>
}
console.log(orders);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="">
      <h1 className='mt-6 font-bold text-2xl'>
         Order History
     </h1>
     <div style={{ padding: '20px', display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
     
     
      {orders.map((order) => (
        <div
          key={order._id}
          style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* <h3>Order ID: {order._id}</h3> */}
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}</p>
          <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          <h4>Items:</h4>
          <ul>
            {order.items.map((item) => (
              <li key={item._id} style={{ marginBottom: '10px' }}>
                <strong>{item.menuItemId?.name}</strong> 
                <p>Category: {item.menuItemId?.category}</p>
                <p>Price: ${item.menuItemId?.price}</p>
                <p>Quantity: {item?.quantity}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    </div>
    
  );
};

export default OrderPage;
