import React from 'react'
import { assets } from '../assets/assets'
import { Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className='mt-32 px-6 md:px-12 lg:px-20 border-t border-gray-200 bg-white'>
      
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 py-14 text-sm'>

        {/* LEFT SECTION */}
        <div className='lg:col-span-2'>

          <img
            className='w-50 cursor-pointer '
            src={assets.logo}
            alt='Healio Logo'
          />

          <p className='text-gray-500 text-base mb-4'>
            Your health, our priority.
          </p>

          <p className='max-w-md text-gray-600 leading-7'>
            Healio simplifies healthcare by helping patients connect with
            trusted doctors and book appointments effortlessly. Fast, secure,
            and designed for better healthcare experiences.
          </p>

        </div>

        {/* COMPANY */}
        <div>

          <h3 className='text-lg font-semibold text-gray-900 mb-5'>
            Company
          </h3>

          <ul className='space-y-3 text-gray-600'>

            <li className='hover:text-black transition cursor-pointer'>
              Home
            </li>

            <li className='hover:text-black transition cursor-pointer'>
              About Us
            </li>

            <li className='hover:text-black transition cursor-pointer'>
              Privacy Policy
            </li>

          </ul>

        </div>

        {/* CONTACT */}
        <div>

          <h3 className='text-lg font-semibold text-gray-900 mb-5'>
            Contact
          </h3>

          <ul className='space-y-4 text-gray-600'>

            <li className='flex items-center gap-3'>
              <Mail size={18} className='text-gray-500' />
              support@healio.com
            </li>

            <li className='flex items-center gap-3'>
              <Phone size={18} className='text-gray-500' />
              +1 (123) 456-7890
            </li>

            <li className='flex items-center gap-3'>
              <MapPin size={18} className='text-gray-500' />
              New York, USA
            </li>

          </ul>

        </div>

      </div>

      {/* BOTTOM */}
      <div className='border-t border-gray-200 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-500 text-sm'>

        <p>
          © 2026 Healio. All rights reserved.
        </p>

        <div className='flex items-center gap-5'>

          <a href='#' className='hover:text-black transition'>
            Instagram
          </a>

          <a href='#' className='hover:text-black transition'>
            Twitter
          </a>

          <a href='#' className='hover:text-black transition'>
            LinkedIn
          </a>

        </div>

      </div>

    </footer>
  )
}

export default Footer