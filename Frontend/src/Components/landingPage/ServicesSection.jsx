import React from 'react';

const AtYourService = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 bg-white">
      <h2 className="text-6xl font-bold text-green-700">At Your Service</h2>
      <div className="w-20 h-1 mt-3 bg-green-700"></div>
      <div className="flex flex-wrap justify-center gap-12 mt-16">
        <ServiceCard
          icon="💎"
          title="Trust"
          description="Contracts are verified"
        />
        <ServiceCard
          icon="💻"
          title="Security"
          description="Contracts are cryptographically Secure."
        />
        <ServiceCard
          icon="🌐"
          title="Ready to Connect"
          description="We aim to connect everyone over the globe"
        />
        <ServiceCard
          icon="💚"
          title="Made with Love"
          description="We poured our hearts into this website for Hackathon"
        />
      </div>
    </div>
  );
};

const ServiceCard = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center p-6 ">
      <div className="text-6xl mb-12 md:text-8xl text-green-500">{icon}</div>
      <h3 className="mt-6 text-3xl font-extrabold text-green-700">{title}</h3>
      <p className="mt-4 text-2xl text-gray-600">{description}</p>
    </div>
  );
};

export default AtYourService;





