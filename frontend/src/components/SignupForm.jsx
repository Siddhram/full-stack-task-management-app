import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import frontendurl from "../url";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [success, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${frontendurl()}/auth/register`, formData);
      localStorage.setItem("token", JSON.stringify(response.data.token));
      setSuccess("Registration successful! Redirecting...");
      setErrorMessage("");
      navigate("/");
    } catch (error) {
      setSuccess("");
      setErrorMessage(error.response?.data?.error || "Registration failed.");
    }
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 h-screen">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Create Your Account</h2>
        {errorMessage && <p className="text-base text-red-600 text-center mb-3">{errorMessage}</p>}
        {success && <p className="text-base text-green-600 text-center mb-3">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="username" className="text-base font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                name="username"
                id="username"
                placeholder="Enter your email"
                value={formData.username}
                onChange={handleInputChange}
                className="block w-full p-4 mt-2 text-gray-800 placeholder-gray-400 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="text-base font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                className="block w-full p-4 mt-2 text-gray-800 placeholder-gray-400 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="w-full py-4 text-white font-semibold bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Create Account
              </button>
            </div>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">Already have an account?</p>
              <Link to="/sign-in" className="text-blue-600 hover:underline">Sign In</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
