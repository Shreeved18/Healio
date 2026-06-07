import React from 'react'
import Login from './pages/Login.jsx'
import { ToastContainer, toast } from 'react-toastify';
import { useContext } from 'react';
import { AdminContext } from './context/AdminContext.jsx';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './pages/Admin/Dashboard.jsx';
import AddDoctor from './pages/Admin/AddDoctor.jsx';
import AllAppointments from './pages/Admin/AllAppointments.jsx';
import DoctorsList from './pages/Admin/DoctorsList.jsx';
import { Route, Routes } from 'react-router-dom';
import { DoctorContext } from './context/DoctorContext.jsx';
import DoctorAppointments from './pages/Doctors/DoctorAppointments.jsx';
import DoctorProfile from './pages/Doctors/DoctorProfile.jsx';
import DoctorDashboard from './pages/Doctors/DoctorDashboard.jsx';
const App = () => {
  const {aToken} = useContext(AdminContext)
  const {dToken} = useContext(DoctorContext)
  return aToken || dToken ? (
    <div className='min-h-screen bg-[#F8F9FD]'>
        {/* Dashboard content here */}
        <Navbar/>
        <ToastContainer/>
        <div className='flex items-start'>
          <Sidebar/>
          <Routes>
            {/* admin routes */}
            <Route path='/' element={<></>}/>
            <Route path='/admin-dashboard' element={<Dashboard/>}/>
            <Route path='/all-appointments' element={<AllAppointments/>}/>
            <Route path='/add-doctor' element={<AddDoctor/>}/>
            <Route path='/doctor-list' element={<DoctorsList/>}/>

            {/* doctor routes */}
             <Route path='/doctor-dashboard' element={<DoctorDashboard/>}/>
              <Route path='/doctor-profile' element={<DoctorProfile/>}/>
               <Route path='/doctor-appointments' element={<DoctorAppointments/>}/>

          </Routes>
        </div>
    </div>
  ):(
    <>
        <Login/>
        <ToastContainer/>
    </>
  )
}

export default App
