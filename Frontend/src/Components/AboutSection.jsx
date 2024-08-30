import React from 'react';

const AboutSection = () => (
  <section id="about" className="py-16">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-semibold mb-4">About Us</h2>
          <p className="text-gray-700">FarmTract was founded with the goal of improving the agricultural industry by providing a modern solution for contract management. Our platform ensures transparency, efficiency, and accountability in every deal.</p>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0">
          <img src="https://via.placeholder.com/500x300" alt="About Us" className="rounded shadow-lg"/>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
