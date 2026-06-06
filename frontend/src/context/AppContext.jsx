import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();


const AppContextProvider = (props) => {
    const currency = "$";
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [doctors,setDoctors] = useState([]);
    const [token,setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');
    const [userData,setUserData] = useState(null)
    const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",];

    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split("_");

        return (
            dateArray[0] +
            " " +
            months[Number(dateArray[1])] +
            " " +
            dateArray[2]
        );
    };
    const fetchDoctor = async ()=>{
        try {
            const {data} = await axios.get(backendUrl+'/api/doctor/list');

            if(data.success){
                setDoctors(data.doctors);
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }
    const loadUserProfileData = async ()=>{
        try {
        
            const {data} = await axios.get(backendUrl+'/api/user/get-profile',{headers:{ Authorization: `Bearer ${token}` }})

      
            if(data.success){
                setUserData(data.userData)
                
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        fetchDoctor();
    }, [])

    useEffect(()=>{
   
        if(token){
            loadUserProfileData()
        }else{
            setUserData(null)
        }
       
    }, [token])

    const value = {
        doctors,fetchDoctor,
        currency,token,setToken,backendUrl,userData,setUserData,loadUserProfileData,slotDateFormat
    }
  

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;