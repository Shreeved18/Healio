
import { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'

const DoctorProfile = () => {

  const { dToken, profileData, setProfileData, getprofileData, updateProfile } = useContext(DoctorContext)
  const { currency } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    if (dToken) {
      getprofileData()
    }
  }, [dToken])


  if (!profileData) return <div>Loading...</div>

  return (
    <div className='flex flex-col gap-4 m-5'>

      <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg' src={profileData.image} alt='' />

      <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>

        <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{profileData.name}</p>

        <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
          <p>{profileData.degree} - {profileData.speciality}</p>
          <button className='py-0.5 px-2 border text-xs rounded-full'>{profileData.experience}</button>
        </div>

        <div className='mt-3'>
          <p className='font-medium'>About:</p>
          <p className='text-sm text-gray-600 max-w-175 mt-1'>{profileData.about}</p>
        </div>

        <p className='text-gray-600 font-medium mt-4'>
          Appointment Fee:
          {isEdit
            ? <input type='number' value={profileData.fees} onChange={e => setProfileData(prev => ({ ...prev, fees: e.target.value }))} className='ml-2 border px-2 rounded' />
            : <span className='text-gray-800'> {currency}{profileData.fees}</span>}
        </p>


        <div className='flex gap-1 pt-2'>
          <input
            type='checkbox'
            checked={profileData.available}
            disabled={!isEdit}
            onChange={() => setProfileData(prev => ({ ...prev, available: !prev.available }))}
          />
          <label>Available</label>
        </div>

        {isEdit
          ? <button className='mt-4 px-4 py-1 border rounded-full' onClick={()=>{updateProfile(profileData);setIsEdit(false)}}>Save</button>
          : <button className='mt-4 px-4 py-1 border rounded-full' onClick={() => setIsEdit(true)}>Edit</button>}
      </div>
    </div>
  )
}

export default DoctorProfile

