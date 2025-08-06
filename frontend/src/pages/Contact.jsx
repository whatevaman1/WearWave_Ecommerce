import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';
import Chatbot from '../components/chatbot';

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img className="w-full md:max-w-[480px]" src={assets.contact_img} alt="Contact Us" />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">
            7298 Versova Andheri<br /> Mumbai, MH 400061
          </p>
          <p className="text-gray-500">
            Tel: +91-9876543210<br /> Email: admin@WearWave.com or contact@wearwave.com
          </p>
          {/* Careers section removed */}
        </div>
      </div>

      {/* AI Chatbot Integration */}
      <div className="flex flex-col items-center my-12 p-6 bg-gray-50 rounded-lg shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          {/* SVG chat icon for a modern e-commerce feel */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7-1.935 0-3.725-.64-5.128-1.709L2 17l1.709-2.872C2.64 13.725 2 11.935 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zm-8-5a5 5 0 100 10A5 5 0 0010 5z" clipRule="evenodd" />
          </svg>
          <h3 className="text-2xl font-bold">How can we help you?</h3>
        </div>
        <Chatbot />
      </div>

      <NewsletterBox />
    </div>
  );
};

export default Contact;
