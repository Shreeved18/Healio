import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'
const AddDoctor = () => {

  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('General Physician')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [fees, setFees] = useState('')

  const {backendUrl, aToken} = useContext(AdminContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      if(!docImg){
        return toast.error('Image Not Selected')
      }

      const formData = new FormData()
      formData.append('image', docImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('degree', degree)
      formData.append('speciality', speciality)
      formData.append('fees', fees)
      formData.append('about', about)
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))
      

      formData.forEach((value,key)=>{
        console.log(`${key} : ${value}`);
      })

      const {data} = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } })
      if(data.success){
        toast.success(data.message);
        setDocImg(false)
        setName('')
        setEmail('')
        setPassword('')
        setExperience('1 Year')
        setAbout('')
        setSpeciality('General Physician')
        setDegree('')
        setAddress1('')
        setAddress2('')
        setFees('')
      }
      else{
        toast.error(data.message);
      }
    } catch (error) {
        toast.error(error.message);
        console.log(error);
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>

      <p className='mb-3 text-lg font-medium'>Add Doctor</p>

      <div className='bg-white px-8 py-8 border border-gray-200 rounded w-full max-w-4xl'>

        {/* Upload Section */}
        <div className='flex items-center gap-4 mb-8 text-gray-500'>

          <label htmlFor='doc-img'>
            <img
              className='w-16 bg-gray-100 rounded-full cursor-pointer'
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt='Upload'
            />
          </label>

          <input
            type='file'
            id='doc-img'
            hidden
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setDocImg(e.target.files[0])
              }
            }}
          />

          <p>
            Upload doctor <br /> picture
          </p>

        </div>

        {/* Form Fields */}
        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>

          {/* Left Section */}
          <div className='w-full lg:flex-1 flex flex-col gap-4'>

            <div className='flex flex-col gap-1'>
              <p>Doctor Name</p>

              <input
                className='border rounded px-3 py-2'
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder='Name'
              />
            </div>

            <div className='flex flex-col gap-1'>
              <p>Doctor Email</p>

              <input
                className='border rounded px-3 py-2'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder='Email'
              />
            </div>

            <div className='flex flex-col gap-1'>
              <p>Doctor Password</p>

              <input
                className='border rounded px-3 py-2'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder='Password'
              />
            </div>

            <div className='flex flex-col gap-1'>
              <p>Experience</p>

              <select
                className='border rounded px-3 py-2'
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              >
                <option value='1 Year'>1 Year</option>
                <option value='2 Year'>2 Year</option>
                <option value='3 Year'>3 Year</option>
                <option value='4 Year'>4 Year</option>
                <option value='5 Year'>5 Year</option>
                <option value='6 Year'>6 Year</option>
                <option value='7 Year'>7 Year</option>
                <option value='8 Year'>8 Year</option>
                <option value='9 Year'>9 Year</option>
                <option value='10 Year'>10 Year</option>
              </select>
            </div>

            <div className='flex flex-col gap-1'>
              <p>Fees</p>

              <input
                className='border rounded px-3 py-2'
                type='number'
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                required
                placeholder='Fees'
              />
            </div>

          </div>

          {/* Right Section */}
          <div className='w-full lg:flex-1 flex flex-col gap-4'>

            <div className='flex flex-col gap-1'>
              <p>Speciality</p>

              <select
                className='border rounded px-3 py-2'
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
              >
                <option value='General Physician'>General Physician</option>
                <option value='Gynecologist'>Gynecologist</option>
                <option value='Dermatologist'>Dermatologist</option>
                <option value='Pediatricians'>Pediatricians</option>
                <option value='Neurologist'>Neurologist</option>
                <option value='Gastroenterologist'>Gastroenterologist</option>
              </select>
            </div>

            <div className='flex flex-col gap-1'>
              <p>Education</p>

              <input
                className='border rounded px-3 py-2'
                type='text'
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                required
                placeholder='Education'
              />
            </div>

            <div className='flex flex-col gap-1'>
              <p>Address</p>

              <input
                className='border rounded px-3 py-2 mb-2'
                type='text'
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                required
                placeholder='Address 1'
              />

              <input
                className='border rounded px-3 py-2'
                type='text'
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                required
                placeholder='Address 2'
              />
            </div>

          </div>

        </div>

        {/* About */}
        <div className='mt-6 flex flex-col gap-1 text-gray-600'>

          <p>About</p>

          <textarea
            className='w-full px-4 pt-2 border rounded'
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            required
            placeholder='Write about doctor'
            rows={5}
          />

        </div>

        {/* Submit Button */}
        <button
          type='submit'
          className='bg-primary px-10 py-3 mt-6 text-white rounded-full hover:scale-105 transition-all'
        >
          Add Doctor
        </button>

      </div>

    </form>
  )
}

export default AddDoctor