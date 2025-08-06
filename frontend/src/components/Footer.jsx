import React from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const Footer = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
    window.location.reload(); // Refresh the page
  };

  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
          <img 
            src={assets.logo} 
            className='mb-5 w-32 cursor-pointer' 
            alt="WearWave Logo" 
            onClick={handleLogoClick} 
          />
          <p className='w-full md:w-2/3 text-gray-600'>
            Shop with WearWave and experience the convenience of online shopping
            like never before. Our website is designed to provide you with a seamless shopping experience.
          </p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li className="cursor-pointer" onClick={() => navigate('/')}>Home</li>
            <li className="cursor-pointer" onClick={() => navigate('/about')}>About us</li>
            <li className="cursor-pointer" onClick={() => navigate('/orders')}>Delivery</li>
            <li className="cursor-pointer" onClick={() => navigate('/about')}>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>
              <a href="tel:+919876543210" className="hover:text-blue-600 transition">+91-9876543210</a>
            </li>
            <li>
              <a href="mailto:contact@wearwave.com" className="hover:text-blue-600 transition">
                contact@wearwave.com
              </a>
            </li>
          </ul>
        </div>

      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'> Copyright 2025 © WearWave.com - All Rights Reserved</p>
      </div>
    </div>
  );
}
export default Footer;
