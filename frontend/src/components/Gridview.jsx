import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, getemenue } from '../redux/menueitemSlice';
import Card from './Card';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import frontendurl from '../url';
import hastoken from '../istoken';

const Gridview = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  useEffect(() => {
    if (!hastoken()) {
      nav('/sign-in');
            return;

    }
    dispatch(getemenue());
  }, [dispatch, nav]);

  const deleteitem = async (_id) => {
    const res = await axios.delete(`${frontendurl()}/menu/${_id}`);
    console.log('deleted');
  };

  const add = (each) => {
    dispatch(addToCart(each));
    alert('added to cart');
  };

  const addtcar = useSelector((state) => state.menueReducer.addtocart);
  const array = useSelector((state) => state.menueReducer.allmenueItems);

  return (
    <div>
      <nav className="bg-gray-700 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-white text-2xl font-bold">FoodDelivery</Link>
          <div className="space-x-6">
            <Link to="/" className="text-white hover:text-green-400">Home</Link>
                        <Link to="/order" className="text-white hover:text-green-400">Order History</Link>

             <Link to="/cart">
              <button className="p-3 bg-green-600 text-white font-medium rounded-full hover:bg-green-700 transition-all duration-200">
                Cart ({addtcar.length} Items)
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="py-10 bg-gray-50 sm:py-16 lg:py-6">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold leading-tight text-black sm:text-5xl lg:text-6xl">
              Food Delivery System
            </h2>
            <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">
              Browse and order your favorite meals
            </p>
          </div>

          {/* <div className="flex justify-end mt-6">
           
          </div> */}

          <div className="grid grid-cols-1 gap-6 mt-12 lg:mt-16 xl:gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {array &&
              array.map((each,i) => {
                return (
                  <div key={i} className="flex flex-col items-center">
                    <Link to={`/${each._id}`}>
                      <Card
                        category={each.category}
                        eventname={each.name}
                        price={each.price}
                        availability={each.availability}
                      />
                    </Link>
                    <div className="flex justify-start gap-2 mt-4">
                      <button
                        onClick={() => {
                          deleteitem(each._id).then(() => {
                            dispatch(getemenue());
                          });
                        }}
                        className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all duration-200"
                      >
                        Delete
                      </button>

                      <button
                        onClick={() => add(each)}
                        className="p-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all duration-200"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/add"
              className="inline-flex items-center justify-center p-4 bg-black rounded-md text-white font-medium text-lg transition-all duration-200 hover:bg-gray-700 hover:underline"
            >
              Add New Item to Menu
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gridview;
