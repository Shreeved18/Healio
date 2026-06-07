import { useState } from "react";
import { createContext } from "react";
export const DoctorContext = createContext();
import axios from "axios";
import { toast } from "react-toastify";

const DoctorContextProvider = (props)=>{
    const [dToken,setDToken] = useState(localStorage.getItem('dToken')?localStorage.getItem('dToken'):'')
    const [appointments,setAppointments] = useState([])
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [dashData,setDashData] = useState(false)
    const [profileData,setProfileData] = useState(false)

    const getAppointments = async () => {
        try {
            
            const { data } = await axios.get(backendUrl + '/api/doctor/appointment', { headers: { dToken } })
           

            if (data.success) {
                setAppointments(data.appointments.reverse())
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }

    }
    const completeAppointment = async(appointmentId)=>{
        try {
            const {data} = await axios.post(backendUrl + '/api/doctor/appointment-complete',{appointmentId}, { headers: { dToken } })
            if (data.success) {
                toast.success(data.message)
                getAppointments()
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    const cancelAppointment = async(appointmentId)=>{
        try {
            const {data} = await axios.post(backendUrl + '/api/doctor/appointment-cancel',{appointmentId}, { headers: { dToken } })
            if (data.success) {
                toast.success(data.message)
                getAppointments()
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const getDashData = async()=>{
        try {
            const {data} = await axios.get(backendUrl + '/api/doctor/dashboard', { headers: { dToken } })
            if (data.success) {
               
                setDashData(data.dashData)
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    const getprofileData = async()=>{
        try {
            const {data} = await axios.get(backendUrl + '/api/doctor/profile', { headers: { dToken } })
            if (data.success) {
               
                setProfileData(data.profileData)
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    const updateProfile = async (profileData) => {
        try {

            const updateData = {
                fees: profileData.fees,
                address: profileData.address,
                available: profileData.available
            }

            const { data } = await axios.post(
                backendUrl + '/api/doctor/update-profile',
                updateData,
                { headers: { dToken } }
            )

            if (data.success) {
                toast.success(data.message)
                // Refresh profile after update
                getprofileData()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }
    const value = {
        dToken,
        setDToken,
        getAppointments,
        appointments,
        cancelAppointment,
        completeAppointment,
        getDashData,
        setDashData,
        dashData,
        profileData,
        setProfileData,
        getprofileData,
        updateProfile

    }
    return (
        <DoctorContext.Provider value = {value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider