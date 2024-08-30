import React from 'react';

const HeroSection = () => {
  return (
    <section className="flex items-center justify-center h-screen bg-green-900 text-white">
      <div className="text-center max-w-xl px-6">
        <h1 className="text-4xl font-bold mb-4">We've got what you need!</h1>
        <p className="text-lg mb-8 text-gray-300">
          FarmTract has provided a bunch of smart contracts to make your life better. 
          Browse our contracts list to know more!
        </p>
        <a 
          href="#get-started" 
          className="inline-block bg-white text-green-900 font-bold py-3 px-6 rounded-full hover:bg-green-700 hover:text-white transition duration-300"
        >
          Get Started!
        </a>
      </div>
    </section>
  );
}

export default HeroSection;
