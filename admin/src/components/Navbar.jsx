import React from 'react'
import { assets } from '../assets/assets'
import { useContext } from 'react';
import { AdminContext } from '../context/AdminContext.jsx';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const { aToken ,setAToken} = useContext(AdminContext)
    const navigate = useNavigate();
    const logout = () =>{
        navigate('/') 
        localStorage.removeItem('aToken')
        setAToken(null)
    }
    return (
        <div className='flex items-center justify-between px-4 sm:px-6 py-2 border-b border-gray-200 bg-white'>

            <div className='flex items-center gap-2 text-xs'>
                <img
                    src={assets.admin_logo}
                    alt="Healio Logo"
                    className='w-28 sm:w-32 cursor-pointer'
                />

                <p className='border px-2 py-0.5 rounded-full border-gray-500 text-gray-600'>
                    {aToken ? 'Admin' : 'Doctor'}
                </p>
            </div>

            <button onClick={logout} className='bg-primary text-white px-6 py-1.5 rounded-full text-sm'>
                Logout
            </button>

        </div>
    )
}

export default Navbar
