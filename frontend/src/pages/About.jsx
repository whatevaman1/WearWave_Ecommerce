import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className="flex flex-col md:flex-row gap-16 my-10">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt="About WearWave"
          onError={(e) => {
            e.target.src = '/assets/icons/fallback_image.png';
          }}
        />

        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            WearWave was born out of a passion for innovation and a desire to revolutionize 
            the way people shop online. Our journey began with a simple idea: to create a 
            platform where customers can effortlessly discover, explore, and purchase a 
            wide range of products from the comfort of their homes.
          </p>
          <p>
            Since our inception, we've worked tirelessly to curate a diverse selection of 
            high-quality products that cater to every taste and preference. From fashion 
            and beauty to electronics and home essentials, we offer an extensive collection 
            sourced from trusted brands and suppliers.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Our mission at WearWave is to empower customers with choice, convenience, 
            and confidence. We're dedicated to providing a seamless shopping experience 
            that exceeds expectations—from browsing and ordering to delivery and beyond.
          </p>
        </div>
      </div>

      <div className="py-4 text-2xl">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className="flex flex-col md:flex-row mb-20 text-sm gap-4">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance</b>
          <p className="text-gray-600">
            We take pride in offering only the highest quality products that
            meet our stringent standards for durability, performance, and value.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience</b>
          <p className="text-gray-600">
            Our user-friendly website and mobile app make it easy to browse,
            compare, and purchase products on the go.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service</b>
          <p className="text-gray-600">
            Our dedicated team of customer service representatives is available
            around the clock to assist you with any queries or concerns you may
            have.
          </p>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default About;