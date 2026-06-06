import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const Specialitymenu = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col item-center text-center  gap-4 py-16 text-gray-800" id='speciality'>
      <br/>
        <h1 className='text-3xl font-medium text-center'>Find by Speciality</h1>
        <p className='sm:w-1/3 mx-auto text-sm'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
        <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll'>
          {specialityData.map((item) => (
            <div key={item.speciality} onClick={() => {navigate(`/doctors/${item.speciality}`);scrollTo(0,0)}} className='flex flex-col items-center text-xs cursor-pointer shrink-0 hover:scale-105 transition-all duration-300'>

              <img className='w-16 sm:w-24 mb-2' src={item.image} alt={item.speciality} />
              <p className='text-sm font-medium'>{item.speciality}</p>
            </div>
          ))}
        </div>
    </div>
  )
} 

export default Specialitymenu
