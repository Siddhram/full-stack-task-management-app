import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import frontendurl from "../url";

const SignInForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('token'))) {
      navigate("/");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${frontendurl()}/auth/login`, formData);
      localStorage.setItem("token", JSON.stringify(response.data.token));
      setSuccess("Login successful!");
      setError("");
      navigate("/");
    } catch (err) {
      setSuccess("");
      if (err.response) {
        setError(err.response.data.error || "Login failed");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800">Sign In  Page
</h2>
        <p className="text-center text-gray-600 mt-2">Resister first OR Use email : user1@gmail.com and password : sidd</p>

        {error && <p className="mt-4 text-base text-red-600">{error}</p>}
        {success && <p className="mt-4 text-base text-green-600">{success}</p>}

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div>
            <label htmlFor="username" className="block text-gray-700 text-sm font-medium">Email</label>
            <input
              type="email"
              name="username"
              id="username"
              placeholder="Enter your email"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full mt-2 p-4 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full mt-2 p-4 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="text-right">
            <Link to="/sign-up" className="text-sm text-blue-500 hover:text-blue-700">Don't have an account? Sign up</Link>
          </div>

          <button
            type="submit"
            className="w-full py-4 mt-6 text-base font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        {success && (
          <div className="mt-4">
            <button className="w-full py-4 text-base font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700">
              {success}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignInForm;
