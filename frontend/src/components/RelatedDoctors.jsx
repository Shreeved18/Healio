import React, {useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const RelatedDoctors = ({ docId, speciality }) => {
  const { doctors } = useContext(AppContext)
  const navigate = useNavigate()

  const [relDocs, setRelDocs] = useState([]);
  useEffect(() => {
    if(doctors.length > 0 && speciality){ 
      const related = doctors.filter((doctor) => doctor.speciality === speciality && doctor._id !== docId);
      setRelDocs(related);
    }
  }, [docId, speciality, doctors])

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900'>

      <h1 className='text-3xl font-medium'>
        Top Doctors to Book
      </h1>

      <p className='sm:w-1/3 text-center text-sm text-gray-600'>
        Simply browse through our extensive list of trusted doctors
      </p>

      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 pt-5'>

        {relDocs.slice(0, 5).map((doctor) => (
          <div
            key={doctor._id}
            onClick={() => {
              navigate(`/appointment/${doctor._id}`);
              scrollTo(0, 0);
            }}
            className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300'
          >

            <img
              className='bg-blue-50 w-full h-60 object-cover'
              src={doctor.image}
              alt={doctor.name}
            />

            <div className='p-4'>

              <div className='flex items-center gap-2 text-sm text-green-500'>
                <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                <p>Available</p>
              </div>

              <p className='text-gray-900 text-lg font-medium'>
                {doctor.name}
              </p>

              <p className='text-gray-600 text-sm'>
                {doctor.speciality}
              </p>

            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
            navigate(`/doctors/${encodeURIComponent(speciality)}`)
          scrollTo(0, 0)
        }}
        className='bg-blue-50 text-gray-600 py-3 px-12 rounded-full mt-10 hover:bg-gray-200 transition-all duration-300'
      >
        More
      </button>

    </div>
  )
}

export default RelatedDoctors