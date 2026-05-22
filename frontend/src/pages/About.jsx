import React from 'react'
import { assets } from '../assets/assets'
const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>
      <div className='my-10 flex flex-col md:flex-row items-center gap-12 mt-5  lg:flex-row'>
        <img src={assets.about_image} alt="about" className='w-full h-96 object-cover rounded-lg' />
        <div className='flex flex-col justify-center gap-6  text-sm'>
          <p>Welcome to Healio, your modern companion for smarter, simpler healthcare.</p>
          <p>At Healio, we believe taking care of your health shouldn’t feel complicated. From booking doctor appointments to keeping track of your medical needs, our platform is designed to make every step smooth, fast, and stress-free. Whether you’re visiting a specialist for the first time or continuing long-term care, Healio keeps everything organized so you can focus on what truly matters—your well-being.</p>
          <p>We combine thoughtful design with powerful healthcare technology to create an experience that feels effortless. Our goal is to remove the usual friction in healthcare and replace it with clarity, convenience, and confidence.</p>
          <b>Our Vision</b>
          <p>At Healio, our vision is simple yet powerful: to build a connected healthcare ecosystem where patients and doctors come together seamlessly. We aim to make quality healthcare more accessible, more efficient, and more human—anytime, anywhere.</p>
          <p>Healio isn’t just a platform. It’s a step toward a healthier, more connected future.</p>
        </div>
      </div>

      <div className='text-xl my-4  text-gray-500'>
        <p>WHY <span className='text-gray-700 font-semi-bold'>CHOOSE US</span></p>
      </div>
      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border border-gray-300 px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-4 hover:bg-primary  hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>EFFICIENCY:</b>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className='border border-gray-300 px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-4 hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>CONVENIENCE:</b>
          <p>Access to a network of trusted healthcare professionals in your area.</p>
        </div>
        <div className='border border-gray-300 px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-4 hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>PERSONALIZATION:</b>
          <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>
    </div>
  )
}

export default About
