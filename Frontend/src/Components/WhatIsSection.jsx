import React from 'react';
import img1 from './img/5.jpg';
import img2 from './img/6.jpg';
import img3 from './img/7.jpg';
import img4 from './img/8.jpg';
import img5 from './img/5.jpg';

const WhatIsSection = () => (
  <section className="container-fluid" id="whatis">
    <div className="row align-items-center">
      {/* Text Section */}
      <div className="col-lg-6">
        <div className="text">
          <h2 align="center">What is FarmTract</h2>
          <p>
            This is a smart contract-based contract farming system built for companies, government bodies, and
            individual entrepreneurs to make their contracts with farmers. Farmers will provide information like
            name, contact details, cryptocurrency wallet address (to receive or transfer payment), farm size,
            evidence of land (land registry number), etc. The system will list all the projects based on parameters
            like region, crops, farm size range, approximate predicted yield, etc. for the companies.
          </p>
        </div>
      </div>

      {/* Carousel Section */}
      <div className="col-6">
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="d-block w-100" src={img1} alt="First slide" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src={img2} alt="Second slide" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src={img3} alt="Third slide" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src={img4} alt="Fourth slide" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src={img5} alt="Fifth slide" />
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default WhatIsSection;
