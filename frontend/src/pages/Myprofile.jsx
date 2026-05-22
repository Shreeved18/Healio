import React, { useState } from "react";
import { assets } from "../assets/assets";

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Shreeved",
    image: assets.profile_pic,
    email: "shree@gmail.com",
    phone: "1234567890",
    address: "123, Main Street, City, Country",
    gender: "Male",
    dob: "1990-01-01",
  });

  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-10">
      {/* Profile Image */}
      <div className="flex flex-col items-center">
        <img
          src={userData.image}
          alt="profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
        />

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

        <p className="text-gray-500">{userData.email}</p>
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
                value={userData.address}
                onChange={(e) =>
                  setUserData({ ...userData, address: e.target.value })
                }
                className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
              />
            ) : (
              <p className="text-gray-800">{userData.address}</p>
            )}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end mt-8">
        <button
          onClick={() => setIsEdit(!isEdit)}
          className='border border-gray-300 px-6 py-2 rounded-lg text-gray-700 font-medium transition-all duration-300 bg-white hover:bg-primary hover:text-white'
        >
          {isEdit ? "Save" : "Edit Profile"}
        </button>
      </div>
    </div>
  );
};

export default MyProfile;