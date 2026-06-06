import React from 'react'
import { assets } from '../assets/assets'
const Header = () => {
  return (
    <div className='flex flex-col md:flex-row bg-primary rounded-lg px-6 md:px-10 lg:px-20 mt-10'>
       { /*---Left Side--- */}
       <div className='md:wd-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
            <p className='text-3xl md:text-5xl font-semibold text-white leading-snug'>
                Book Appointment<br/>With Trusted Doctors
            </p>
            <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
                <img className='w-28' src={assets.group_profiles} alt="Group Profiles" />
                <div>Simply browse through our extensive list of trusted doctors, <br className='hidden sm:block'/> schedule your appointment hassle-free.</div>
            </div>
            <a className='flex items-center gap-2 bg-white py-3 px-8 rounded-full font-semibold text-sm m-auto md:m-0 text-gray-600  hover:scale-105 transition-all duration-300' href="#speciality">
                Book Appointment
                <img className='w-3' src={assets.arrow_icon} alt='' />
            </a>
       </div>

       { /*---Right Side--- */}
       <div className='md:w-1/2 relative'>
            <img className='w-full md:absolute bottom-0 h-auto rounded-lg' src={assets.header_img} alt="Header" />
       </div>
    </div>
  )
}

export default Header
