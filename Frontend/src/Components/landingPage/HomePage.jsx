import React from 'react'

import Navbar from './Navbar'
import WhatIsFarmTract from './WhatIsFarmTract'
import AboutSection from './AboutSection'
import Masthead from './Masthead'
import AtYourService from './ServicesSection';
import  ContactSection from './ContactSection';
import Footer from './Footer';
// import PortfolioSectio from './PortfolioSection';

const Main = () => {
  return (
    <>
    <Navbar/>
    <Masthead/>
    <WhatIsFarmTract/>
    <hr/>
    {/* <AboutSection/> */}
    <AtYourService/>
    <hr/>
    {/* <PortfolioSectio/> */}
    <ContactSection/>
    <Footer/>
    </>
  )
}

export default Main;