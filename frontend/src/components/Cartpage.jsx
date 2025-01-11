import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import frontendurl from '../url';
import OrderPage from './OrderPage';
import hastoken from '../istoken';
import { useNavigate } from 'react-router-dom';

const Cartpage = () => {
  const arr = useSelector((state) => state.menueReducer.addtocart);
  const totalPrice = useSelector((state) => state.menueReducer.totalPrice);
  const navigate=useNavigate();
useEffect(()=>{
    console.log(hastoken());
    
    if(!hastoken()){
      navigate("/sign-in");
      return;
    }
  },[])
  const handleCheckout = async () => {
    const token = JSON.parse(localStorage.getItem('token')); // Assuming the token is stored in localStorage
 
    // Prepare the items array for the backend
    const items = arr.map((item) => ({
      menuItemId: item._id,
      quantity: item.quantity,
    }));

    try {
      const response = await axios.post(
        `${frontendurl()}/orders/`, // Replace with your backend URL
        { items },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the JWT token
          },
        }
      );

      console.log('Order successful:', response.data);
      alert('Order placed successfully!');
      navigate("/order");
    } catch (error) {
      console.error('Error placing order:', error.response?.data || error.message);
      alert('Failed to place the order. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-10">Your Cart</h1>
        {arr && arr.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {arr.map((each) => (
                <div
                  key={each._id}
                  className="relative w-full max-w-sm bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-800">{each.name}</h3>
                    <p className="mt-2 text-sm text-gray-600">
                      <span className="font-semibold">Category:</span> {each.category}
                    </p>
                    <p className="mt-2 text-sm text-gray-600">
                      <span className="font-semibold">Single Price:</span> ${each.price}
                    </p>
                    <p className="mt-2 text-sm text-gray-600">
                      <span className="font-semibold">Total Price:</span> $
                      {each.price * each.quantity}
                    </p>
                    <p className="mt-2 text-sm text-gray-600">
                      <span className="font-semibold">Quantity:</span>{' '}
                      <span className="text-gray-900 font-bold">{each.quantity}</span>
                    </p>
                  </div>
                  <div className="absolute top-0 right-0 px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-bl-lg">
                    In Cart
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Total Price: ${totalPrice}</h2>
              <button
                onClick={handleCheckout}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Proceed to Checkout
              </button>
                
            </div>
          </>
        ) : (
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-600">
              Your cart is empty. Start adding items!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cartpage;
