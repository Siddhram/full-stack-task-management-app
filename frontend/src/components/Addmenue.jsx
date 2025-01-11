import React, { useEffect, useState } from 'react';
import axios from 'axios';
import frontendurl from '../url';
import { useDispatch } from 'react-redux';
import { getemenue } from '../redux/menueitemSlice';
import { useNavigate } from 'react-router-dom';
import hastoken from '../istoken';

const Addmenue = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [availability, setAvailability] = useState(true);
  const [message, setMessage] = useState('');
 
       const dispatch=useDispatch();
const navigate=useNavigate();
 useEffect(()=>{
    if(!hastoken()){
      navigate("/sign-in");
      return;
    }
  },[])
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${frontendurl()}/menu/`, {
        name,
        category,
        price,
        availability
      });
      
      setMessage('Menu item created successfully!');
      dispatch(getemenue());
      
      clearForm();
      navigate("/");
    } catch (error) {
      setMessage(`Error: please fill orignal category`);
    }
  };

  const clearForm = () => {
    setName('');
    setCategory('');
    setPrice('');
    setAvailability(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Create Menu Item</h2>

        {message && (
          <div className="text-center text-green-600 mb-4">
            <span>{message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Dish Name</label>
            <input 
              type="text" 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500" 
              placeholder="Enter dish name" 
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <input 
              type="text" 
              id="category" 
              value={category} 
              onChange={(e) => setCategory(e.target.value)} 
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500" 
              placeholder="Enter category (e.g., Appetizers, Main Course)" 
              required
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
            <input 
              type="number" 
              id="price" 
              value={price} 
              onChange={(e) => setPrice(e.target.value)} 
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500" 
              placeholder="Enter price" 
              required
            />
          </div>

          <div>
            <label htmlFor="availability" className="block text-sm font-medium text-gray-700">Availability</label>
            <div className="flex items-center mt-2">
              <input 
                type="checkbox" 
                id="availability" 
                checked={availability} 
                onChange={(e) => setAvailability(e.target.checked)} 
                className="h-5 w-5 text-indigo-600"
              />
              <span className="ml-2 text-gray-600">Available</span>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
          >
            Create Menu Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addmenue;
