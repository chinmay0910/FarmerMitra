import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const apiUrl = import.meta.env.VITE_Backend_URL || "http://localhost:5000";
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem('Auth-token');
    if (authToken) {
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setLoading(false);
      if (response.ok) {
        localStorage.setItem('Auth-token', data.authtoken);
        navigate('/');
      } else {
        setError(data.error || 'Invalid email or password.');
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      setError('An error occurred during authentication. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen flex flex-col items-center bg-gray-50">
      {/* Header */}
      <div className="w-full h-16 bg-green-600 text-white flex justify-center items-center px-4 py-2">
        <h1 className="text-2xl font-bold ">Join us as a Farmer</h1>
      </div>
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg mt-8">
        <div className="mb-8 text-center">
          <h2 className="text-green-600 text-2xl font-bold mb-2">Sign In</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                required
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="absolute right-0 mt-3 mr-3 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          </div>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <div className="flex items-center justify-between">
            <div>
              <input type="checkbox" id="rememberMe" className="mr-2" />
              <label htmlFor="rememberMe" className="text-sm text-gray-700">Remember me</label>
            </div>
          </div>

          <div className="flex items-center justify-center mt-4">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              {loading ? "Loading..." : 'Log In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
