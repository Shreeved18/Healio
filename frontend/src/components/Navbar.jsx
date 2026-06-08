import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext.jsx'

const Navbar = () => {

  const navigate = useNavigate()

  const { token, setToken, userData } = useContext(AppContext)

  const [showMenu, setShowMenu] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const logout = () => {
    setToken(false)
    localStorage.removeItem('token')
  }

  const navLinkClass = ({ isActive }) =>
    `relative pb-1 transition-all duration-200 ${isActive
      ? 'text-primary font-semibold'
      : 'text-gray-700 hover:text-primary'
    }`

  return (

    <header className='w-full border-b border-gray-200  bg-white sticky top-0 z-50'>

      <div className='flex items-center justify-between h-16 px-4 md:px-8 lg:px-12'>

        {/* Logo */}
        <img
          onClick={() => navigate('/')}
          className='w-42 cursor-pointer'
          src={assets.logo}
          alt="logo"
        />

        {/* Desktop Nav */}
        <ul className="md:flex items-start gap-5 font-medium hidden">

          <NavLink to="/" onClick={() => window.scrollTo(0, 0)}>
            <li className="py-1">HOME</li>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
          </NavLink>

          <NavLink to="/doctors" onClick={() => window.scrollTo(0, 0)}>
            <li className="py-1">ALL DOCTORS</li>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
          </NavLink>

          <NavLink to="/about" onClick={() => window.scrollTo(0, 0)}>
            <li className="py-1">ABOUT</li>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
          </NavLink>

          <NavLink to="/contact" onClick={() => window.scrollTo(0, 0)}>
            <li className="py-1">CONTACT</li>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
          </NavLink>

          <p
            onClick={() => {
              window.location.href = import.meta.env.VITE_ADMIN_URL
            }}
            className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer border border-gray-200 rounded-full flex items-center gap-2'
          >
            Admin Panel
          </p>
        </ul>


        {/* Right Side */}
        <div className='flex items-center gap-4'>

          {
            token && userData ? (

              <div className='relative'>

                <div
                  className='flex items-center gap-2 cursor-pointer'
                  onClick={() => setShowProfileMenu(prev => !prev)}
                >
                  <img
                    src={userData.image}
                    alt="profile"
                    className='w-9 h-9 rounded-full object-cover'
                  />

                  <img
                    src={assets.dropdown_icon}
                    alt="dropdown"
                    className='w-3'
                  />
                </div>

                {
                  showProfileMenu && (
                    <div className='absolute right-0 top-12 bg-white shadow-lg border rounded-xl min-w-52 p-3 z-20'>

                      <p
                        onClick={() => {
                          navigate('/my-profile')
                          setShowProfileMenu(false)
                        }}
                        className='px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer'
                      >
                        My Profile
                      </p>

                      <p
                        onClick={() => {
                          navigate('/my-appointments')
                          setShowProfileMenu(false)
                        }}
                        className='px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer'
                      >
                        My Appointments
                      </p>

                      <p
                        onClick={logout}
                        className='px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer text-red-500'
                      >
                        Logout
                      </p>

                    </div>
                  )
                }

              </div>

            ) : (

              <button
                onClick={() => navigate('/login')}
                className='hidden md:block bg-primary text-white px-6 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition'
              >
                CREATE ACCOUNT
              </button>

            )
          }

          {/* Mobile Menu Icon */}
          <img
            src={assets.menu_icon}
            alt="menu"
            className='w-6 md:hidden cursor-pointer'
            onClick={() => setShowMenu(true)}
          />

        </div>

      </div>

      {/* Mobile Menu */}
      <div
        className={`${showMenu ? 'fixed inset-0 z-50 bg-white' : 'hidden'
          } md:hidden`}
      >

        <div className='flex items-center justify-between px-5 h-16 border-b'>

          <img className='w-32' src={assets.logo} alt="logo" />

          <img
            className='w-6 cursor-pointer'
            onClick={() => setShowMenu(false)}
            src={assets.cross_icon}
            alt="close"
          />

        </div>

        <ul className='flex flex-col gap-5 p-6 text-lg font-medium'>

          <NavLink to="/" onClick={() => setShowMenu(false)}>
            HOME
          </NavLink>

          <NavLink to="/doctors" onClick={() => setShowMenu(false)}>
            ALL DOCTORS
          </NavLink>

          <NavLink to="/about" onClick={() => setShowMenu(false)}>
            ABOUT
          </NavLink>

          <NavLink to="/contact" onClick={() => setShowMenu(false)}>
            CONTACT
          </NavLink>

        </ul>

      </div>

    </header>
  )
}

export default Navbar