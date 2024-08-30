import React from 'react';

const ContactSection = () => (
  <section id="contact" className="bg-gray-800 py-16 text-white">
    <div className="container mx-auto px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold">Let's Get In Touch!</h2>
        <p className="text-lg">Ready to start your next project with us? Give us a call or send us an email, and we'll get back to you as soon as possible!</p>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center">
        <div className="md:w-1/3 text-center mb-8 md:mb-0">
          <i className="fas fa-phone fa-3x mb-3"></i>
          <div>+1 (555) 123-4567</div>
        </div>
        <div className="md:w-1/3 text-center">
          <i className="fas fa-envelope fa-3x mb-3"></i>
          <a href="mailto:contact@yourwebsite.com" className="text-white">contact@yourwebsite.com</a>
        </div>
      </div>
    </div>
  </section>
);

export default ContactSection;
