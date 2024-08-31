import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img11 from '../img/5.jpg'
import img12 from '../img/6.jpg'
import img13 from '../img/7.jpg'
import img14 from '../img/8.jpg'

// Custom Arrow Component
const CustomArrow = ({ className, style, onClick }) => (
  <div
    className={className}
    style={{ ...style, display: 'block', color: 'green' }} // Customize arrow color and display
    onClick={onClick}
  />
);

const WhatIsFarmTract = () => {
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 1000, // Set autoplay speed to 3000ms (3 seconds)
    arrows: true, // Enable arrows
    nextArrow: <CustomArrow />, // Use custom next arrow
    prevArrow: <CustomArrow />, // Use custom previous arrow
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between px-10 py-10 bg-white">
      {/* Left Section - Text */}
      <div className="lg:w-1/2 mb-8 lg:mb-0">
        <h2 className="text-6xl font-bold text-green-700 mb-6">What is FarmTract</h2>
        <p className="text-5xl text-green-900 leading-relaxed">
          This is a smart contract-based contract farming system built for companies, government bodies, and individual entrepreneurs to make their contracts with farmers. Farmers will provide information like name, contact details, cryptocurrency wallet address (to receive or transfer payment), farm size, evidence of land (land registry number), etc. The system will list all the projects based on parameters like region, crops, farm size range, approximate predicted yield, etc., for the companies.
        </p>
      </div>

      {/* Right Section - Image Carousel */}
      <div className="lg:w-1/2 ml-8 max-w-l"> {/* Set max width to make carousel smaller */}
        <Slider {...carouselSettings}>
          <div>
            <img src={img11} alt="Farm Image 1" className="w-full h-auto" />
          </div>
          <div>
            <img src={img12}alt="Farm Image 2" className="w-full h-auto" />
          </div>
          <div>
            <img src={img13} alt="Farm Image 3" className="w-full h-auto" />
          </div>
          <div>
            <img src={img14} alt="Farm Image 1" className="w-full h-auto" />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default WhatIsFarmTract;



