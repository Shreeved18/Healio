import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from '../context/AppContext'
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)
  console.log(userData)

  const updateUserProfile = async () => {
    try {
      const formData = new FormData()

      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)

      image && formData.append('image', image)
      const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return userData && (

    <div className="max-w-3xl mx-auto bg-white shadow-sm border border-gray-100 rounded-3xl p-8 mt-10 hover:bg-indigo-50">


      {/* Profile Image */}
      <div className="flex flex-col items-center">

        {
          isEdit
            ? <label htmlFor="image">
              <div className='inline-block relative cursor-pointer'>
                <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
                <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} alt="" />
                <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
              </div>
            </label>
            : <img
              src={userData.image}
              alt=""
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
            />
        }

        {/* Name */}
        {isEdit ? (
          <input
            type="text"
            value={userData.name}
            onChange={(e) =>
              setUserData({ ...userData, name: e.target.value })
            }
            className="mt-4 border rounded-lg px-4 py-2 text-center text-xl font-semibold outline-none"
          />
        ) : (
          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            {userData.name}
          </h2>
        )}

        <p className="text-gray-500">{userData?.email}</p>

      </div>

      <hr className="my-6" />

      {/* Contact Information */}
      <div className="space-y-5">
        <h3 className="text-lg font-semibold text-gray-700">
          Contact Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Phone */}
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Phone
            </label>

            {isEdit ? (
              <input
                type="text"
                value={userData.phone}
                onChange={(e) =>
                  setUserData({ ...userData, phone: e.target.value })
                }
                className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
              />
            ) : (
              <p className="text-gray-800">{userData.phone}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Gender
            </label>

            {isEdit ? (
              <select
                value={userData.gender}
                onChange={(e) =>
                  setUserData({ ...userData, gender: e.target.value })
                }
                className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <p className="text-gray-800">{userData.gender}</p>
            )}
          </div>

          {/* DOB */}
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Date of Birth
            </label>

            {isEdit ? (
              <input
                type="date"
                value={userData.dob}
                onChange={(e) =>
                  setUserData({ ...userData, dob: e.target.value })
                }
                className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
              />
            ) : (
              <p className="text-gray-800">{userData.dob}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Address
            </label>

            {isEdit ? (
              <input
                type="text"
                value={userData.address.line1}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    address: {
                      ...userData.address,
                      line1: e.target.value,
                    },
                  })
                }
                className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
              />
            ) : (
              <p className="text-gray-800">{userData.address.line1}</p>
            )}
            {isEdit ? (
              <input
                type="text"
                value={userData.address.line2}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    address: {
                      ...userData.address,
                      line2: e.target.value,
                    },
                  })
                }
                className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
              />
            ) : (
              <p className="text-gray-800">{userData.address.line2}</p>
            )}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end mt-8">
        {isEdit ? (
          <button
            onClick={() => updateUserProfile()}
            className='border border-gray-300 px-6 py-2 rounded-lg text-gray-700 font-medium transition-all duration-300 bg-white hover:bg-primary hover:text-white'
          >
            Save
          </button>) : (
          <button
            onClick={() => setIsEdit(!isEdit)}
            className='border border-gray-300 px-6 py-2 rounded-lg text-gray-700 font-medium transition-all duration-300 bg-white hover:bg-primary hover:text-white'
          >
            Edit Profile
          </button>
        )}










      </div>
    </div>
  );
};

export default MyProfile;