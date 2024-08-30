import React from 'react';

const Navbar = () => (
  <nav className="bg-white fixed w-full py-4 z-10">
    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
      {/* Brand */}
      <a href="#home" className="text-black text-3xl font-bold tracking-wide">FarmTract</a>

      {/* Navigation Links */}
      <ul className="flex space-x-10 text-black font-semibold">
        <li>
          <a href="#available-contracts" className="text-xl text-black hover:text-gray-300 transition duration-300">Available Contracts</a>
        </li>
        <li>
          <a href="#login" className="text-xl text-purple-500 hover:text-purple-500 transition duration-300">Login with Portis</a>
        </li>
        <li>
          <a href="#about" className="text-xl text-black hover:text-gray-300 transition duration-300">About</a>
        </li>
        <li>
          <a href="#contact" className="text-xl text-black hover:text-gray-300 transition duration-300">Contact Us</a>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
