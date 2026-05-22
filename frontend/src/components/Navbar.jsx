import React from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = React.useState(false);
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);
  const [token, setToken] = React.useState(true);
  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>

      <img className='w-44 cursor-pointer' src={assets.logo} alt="logo" />

      <ul className='hidden md:flex items-start gap-5 font-medium'>

        <NavLink to="/">
          <li className='py-1'>HOME</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>

        <NavLink to="/doctors">
          <li className='py-1'>ALL DOCTORS</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>

        <NavLink to="/about">
          <li className='py-1'>ABOUT</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>

        <NavLink to="/contact">
          <li className='py-1'>CONTACT</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>

      </ul>
      <div className='flex items-center gap-4'>
        {
          token ? <div className='relative flex items-center gap-2'>
            <div className='flex items-center gap-2 cursor-pointer' onClick={() => setShowProfileMenu((prev) => !prev)}>
              <img src={assets.profile_pic} alt="profile" className='w-10 h-10 rounded-full cursor-pointer' />
              <img src={assets.dropdown_icon} alt="dropdown" className='w-4' />
            </div>
            <div className={`absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 ${showProfileMenu ? 'block' : 'hidden'}`}>
              <div className='min-w-48 bg-stone-100 rounded flex-col gap-4 p-4'>
                <p onClick={() => { setShowProfileMenu(false); navigate('/my-profile') }} className='hover:text-black cursor-pointer'>My Profile</p>
                <p onClick={() => { setShowProfileMenu(false); navigate('/my-appointments') }} className='hover:text-black cursor-pointer'>My Appointments</p>
                <p onClick={() => setShowProfileMenu(false)} className='hover:text-black cursor-pointer'>Logout</p>
              </div>
            </div>
          </div>
            : <div className='flex items-center gap-4'>
              <button onClick={() => navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>CREATE ACCOUNT</button>
            </div>
        }
        <img src={assets.menu_icon} alt="menu" className='w-6 md:hidden cursor-pointer' onClick={() => setShowMenu(true)} />
        {/*mobile menu*/}
        <div className={`${showMenu ? 'fixed inset-0 z-20' : 'hidden'} md:hidden bg-white overflow-y-auto transition-all`}>
          <div className='flex items-center justify-between px-6 py-4 border-b border-gray-200'>
            <img className='w-36' src={assets.logo} alt="menu" />
            <img className='w-7 cursor-pointer' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="close" />
          </div>
          <ul className='flex flex-col items-center gap-2 mt-5 px-5 py-6 text-lg font-medium'>

            <NavLink to="/">
              <li  onClick={() => setShowMenu(false)}><p className=' rounded inline-block px-5 py-2'>HOME</p></li>
            </NavLink>

            <NavLink to="/doctors">
              <li  onClick={() => setShowMenu(false)}><p className=' rounded inline-block px-5 py-2'>ALL DOCTORS</p></li>
            </NavLink>

            <NavLink to="/about">
              <li  onClick={() => setShowMenu(false)}><p className=' rounded inline-block px-5 py-2'>ABOUT</p></li>
            </NavLink>

            <NavLink to="/contact">
              <li onClick={() => setShowMenu(false)}><p className=' rounded inline-block px-5 py-2'>CONTACT</p></li>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar