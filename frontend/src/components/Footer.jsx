import React from 'react'
import { assets } from '../assets/assets'
const Footer = () => {
  return (
    <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

  {/* LEFT SECTION */}
  <div>

    <img className='mb-5 w-32' src={assets.logo} alt='Logo' />

    <p className='text-sm text-gray-500 mb-4'>
      Your health, our priority.
    </p>

    <p className='w-full md:w-2/3 text-gray-600 leading-6'>
      Healio is a trusted healthcare platform that helps users book appointments
      with experienced doctors easily and conveniently. We connect patients with
      qualified medical professionals to ensure better healthcare access for everyone.
    </p>

  </div>

  {/* COMPANY SECTION */}
  <div>

    <p className='text-xl font-medium mb-5'>
      COMPANY
    </p>

    <ul className='flex flex-col gap-2 text-gray-600'>

      <li>Home</li>
      <li>About Us</li>
      <li>Privacy Policy</li>

    </ul>

  </div>

  {/* CONTACT SECTION */}
  <div>

    <p className='text-xl font-medium mb-5'>
      CONTACT
    </p>

    <ul className='flex flex-col gap-2 text-gray-600'>

      <li>support@healio.com</li>
      <li>+1 (123) 456-7890</li>

    </ul>

  </div>

</div>
  )
}

export default Footer
