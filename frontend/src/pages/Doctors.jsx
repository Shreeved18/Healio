import React from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
const Doctors = () => {

    const { speciality } = useParams()
    const { doctors } = React.useContext(AppContext)
    const [FilterDoctors, setFilterDoctors] = React.useState([]);
    const [showFilter, setShowFilter] = React.useState(false);
    const navigate = useNavigate();
    const applyFilter = () => {
        if(speciality) {
            setFilterDoctors(doctors.filter((doctor) => doctor.speciality.toLowerCase() === speciality.toLowerCase()));
        }
        else{
            setFilterDoctors(doctors);
        }
    }
    React.useEffect(() => {
        applyFilter();
    }, [doctors,speciality]);

    return (
        <div>
            <p className='text-gray-600'>Browse through the doctors specialist.</p>
            <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
                <button className={ `px-3 py-1 rounded border text-sm transition-all sm:hidden ${showFilter ? "bg-primary text-white" : ""}` } onClick={()=>setShowFilter(prev=>!prev)}>Filters</button>
                <div className={` flex-col gap-4 text-sm text-gray-600 ${showFilter ? "flex" : "hidden sm-flex"}`} >
                    <p onClick={()=>speciality?.toLowerCase()==='general physician' ? navigate('/doctors/') : navigate('/doctors/General Physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality?.toLowerCase()==="general physician" ? "bg-indigo-100 text-black": ""}`}>General Physician</p>
                    <p onClick={()=>speciality?.toLowerCase()==='gynecologist' ? navigate('/doctors/') : navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality?.toLowerCase()==="gynecologist" ? "bg-indigo-100 text-black": ""}`}>Gynecologist</p>
                    <p onClick={()=>speciality?.toLowerCase()==='dermatologist' ? navigate('/doctors/') : navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality?.toLowerCase()==="dermatologist" ? "bg-indigo-100 text-black": ""}`}>Dermatologist</p>
                    <p onClick={()=>speciality?.toLowerCase()==='pediatricians' ? navigate('/doctors/') : navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality?.toLowerCase()==="pediatricians" ? "bg-indigo-100 text-black": ""}`}>Pediatricians</p>
                    <p onClick={()=>speciality?.toLowerCase()==='neurologist' ? navigate('/doctors/') : navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality?.toLowerCase()==="neurologist" ? "bg-indigo-100 text-black": ""}`}>Neurologist</p>
                    <p onClick={()=>speciality?.toLowerCase()==='gastroenterologist' ? navigate('/doctors/') : navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality?.toLowerCase()==="gastroenterologist" ? "bg-indigo-100 text-black": ""}`}>Gastroenterologist</p>
                </div>

                <div className='w-full grid grid-cols-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-5 '>
                    {FilterDoctors.map((doctor) => (
                        <div
                           onClick={()=>{navigate(`/appointment/${doctor._id}`); scrollTo(0,0)}}
                            className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300'
                        >

                            <img
                                className='bg-indigo-100 w-full h-60 object-cover'
                                src={doctor.image}
                                alt={doctor.name}
                            />

                            <div className='p-4'>

                                <div className='flex items-center gap-2 text-sm text-green-500'>
                                    <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                                    <p>Available</p>
                                </div>

                                <p className='text-gray-900 text-lg font-medium'>
                                    {doctor.name}
                                </p>

                                <p className='text-gray-600 text-sm'>
                                    {doctor.speciality}
                                </p>

                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Doctors