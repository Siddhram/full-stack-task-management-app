import React from 'react'

const Card = ({ category, eventname, price, availability }) => {
  return (
    <div className="w-80 h-96 rounded-lg shadow-lg overflow-hidden bg-white">
      <img 
        className="w-full h-40 object-cover"
        src="https://craftmyplate.com/wp-content/uploads/2023/07/CMP-logo-with-Bg.svg"
        alt="Event"
      />
      
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-800">{eventname}</div>
        <p className="text-gray-600 text-base">Category: <span className="font-semibold text-gray-800">{category}</span></p>
      </div>
      
      <div className="px-6 py-4 flex items-center justify-between">
        <span className="inline-block bg-gray-200 rounded-full px-4 py-1 text-sm font-semibold text-gray-700">
          Price: ${price}
        </span>
        <span className={`inline-block px-3 py-1 text-sm font-semibold ${availability ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'} rounded-full`}>
          {availability ? 'Available' : 'Unavailable'}
        </span>
      </div>
      
      <div className="px-6 py-2 flex justify-start text-sm text-gray-600">
        Availability: <span className="font-semibold text-gray-800 ml-1">{availability ? 'In Stock' : 'Out of Stock'}</span>
      </div>
    </div>
  )
}

export default Card
