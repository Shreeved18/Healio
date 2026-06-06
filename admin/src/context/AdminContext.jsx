import { createContext } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
export const AdminContext = createContext();
import axios from "axios";
const AdminContextProvider = (props) => {
    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '');
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [dashData,setDashData] = useState(false);
    
    const fetchDoctors = async () => {
        try {

            const { data } = await axios.post(backendUrl + '/api/admin/all-doctors', {}, { headers: { aToken } })

            if (data.success) {
                setDoctors(data.doctors)
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }

    }

    const changeAvailability = async (docId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/change-availability', { docId }, { headers: { aToken } });
            console.log(data)
            if (data.success) {
                fetchDoctors();
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }

    }
    const getAllAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/appointments', { headers: { aToken } });
            console.log(data)
            if (data.success) {
                console.log(data.appointments)
                setAppointments(data.appointments);
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    const appointmentCancel = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/cancel-appointment', { appointmentId }, { headers: { aToken } });
            
            if (data.success) {
                toast.success(data.message);
                getDashData();
                getAllAppointments();
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const getDashData = async () =>{
       
        try{
            const {data} = await axios.get(backendUrl+'/api/admin/dashboard',{headers:{aToken}})
            if(data.success){

                setDashData(data.dashData);
                console.log(data.dashData)
                
            }else{
                toast.error(data.message);
            }
        }catch(error){
            console.log(error.message)
        }
    }
    const value = {
        aToken,
        setAToken,
        backendUrl, doctors, fetchDoctors,changeAvailability,getAllAppointments,appointments,appointmentCancel,dashData,getDashData
    }
    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider