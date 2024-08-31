import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-white fixed w-full py-2 z-10">
    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
      {/* Brand */}
      <a href="#home" className="text-green-400 text-5xl font-bold tracking-wide mr-4">FarmerMitra</a>

      {/* Navigation Links */}
      <ul className="flex space-x-12 text-black font-semibold"> {/* Increased space */}
        <li>
          <a href="#available-contracts" className="text-2xl text-black hover:text-gray-300 transition duration-300">Available Contracts</a>
        </li>
        <li>
          <Link to="/signin" className="text-2xl text-purple-500 hover:text-purple-500 transition duration-300">Login with farmer</Link>
        </li>
        <li>
          <a href="#about" className="text-2xl text-black hover:text-gray-300 transition duration-300">About</a>
        </li>
        <li>
          <a href="#contact" className="text-2xl text-black hover:text-gray-300 transition duration-300">Contact Us</a>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;

