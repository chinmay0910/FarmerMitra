import React from 'react';
import bgImage from './img/bg-masthead.jpg'; // Importing the image

const Masthead = () => (
  <header className="static h-screen flex items-center justify-center text-white">
    {/* Background overlay */}
    <div 
      className="absolute inset-0 bg-cover bg-center opacity-90" 
      style={{ backgroundImage: `url(${bgImage})` }}
    ></div>

    {/* Content */}
    <div className="relative z-10 bg-white bg-opacity-0 ml-16 p-8 rounded-lg text-center">
      <h1 className="text-8xl font-extrabold mb-35">YOUR FAVORITE SOURCE OF <br/>SMART CONTRACTS</h1>
      <hr ></hr>
      <p className="mt-20 text-4xl">
        FarmTract can help your business better by just picking the right smart contracts!</p>
        <p className="mt-3  text-4xl">It’ll also ensure timely payment and security for the farmers.
        </p>
        
      <a 
        href="#find-out-more" 
        className="mt-16 inline-block bg-green-700 text-white py-5 px-8 rounded-2xl font-semibold hover:bg-green-600 text-3xl"
      >
        FIND OUT MORE
      </a>
    </div>
  </header>
);

export default Masthead;



