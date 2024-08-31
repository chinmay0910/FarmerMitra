import React from 'react';

const ContactSection = () => {
  return (
    <section id="contact" className="py-12 h-[1000px] bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center  mt-16 mb-12">
          <h2 className="text-8xl mt-16 font-bold mb-4">Let's Get In Touch</h2>
          <hr className="border-t-2 border-green-500 mx-auto my-4 w-40 h-20" />
          <p className="text-gray-600 text-4xl mb-16">
            Facing any issue with existing contracts? Give us a call or send us an email and we
            will get back to you as soon as possible.
          </p>
        </div>
        <div className="flex flex-wrap  mt-10 justify-center">
          <div className="w-full md:w-1/2 lg:w-1/3 text-center mt-16">
            <i className="fas fa-phone fa-3x mb-3 text-gray-600"></i>
            <div className="text-4xl">+91 98765 43210</div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 text-center mt-16">
            <i className="fas fa-envelope fa-3x mb-3 text-gray-600"></i>
            <a className="text-4xl text-blue-500 hover:underline" href="mailto:contactfarmtract@gmail.com">
              contactfarmtract@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

