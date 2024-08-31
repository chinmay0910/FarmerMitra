import React from 'react';

const HeroSection = () => {
  return (
    <section className="flex items-center justify-center h-screen bg-green-900 text-white">
      <div className="text-center ">
        <h1 className="text-8xl font-bold mb-12">We've got what you need!</h1>
        <hr class="divider my-6"></hr>
        <p className="text-4xl mt-10 mb-10 text-gray-300">
          FarmTract has provided a bunch of smart contracts to make your life better. 
          Browse our contracts list to know more!
        </p>
        <a 
          href="#get-started" 
          className="inline-block bg-white text-2xl  text-green-800 font-bold  mt-10 py-6 px-10 rounded-2xl hover:bg-green-700 hover:text-white transition duration-300"
        >
          Get Started!
        </a>
      </div>
    </section>
  );
}

export default HeroSection;
