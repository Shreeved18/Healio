import React from 'react'
import { assets } from '../assets/assets'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Appointment = () => {

    const { docId } = useParams()

    const { doctors } = React.useContext(AppContext)

    const [doctorInfo, setDoctorInfo] = React.useState(null)

    const fetchDoctorInfo = () => {
        const doctor = doctors.find(
            (doctor) => doctor._id === docId
        )

        setDoctorInfo(doctor)
    }

    React.useEffect(() => {
        fetchDoctorInfo()
    }, [docId, doctors])

    const [docslots, setDocSlots] = React.useState([]);
    const [slotIndex, setSlotIndex] = React.useState(0);
    const [slotTime, setSlotTime] = React.useState('');

    const getAvailableSlots = async () => {
        setDocSlots([]);
        let today = new Date();
        for(let i=0; i<7; i++){
            let currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);

            //setting end time for the day
            let endTime = new Date();
            endTime.setDate(currentDate.getDate());
            endTime.setHours(23, 59, 59);

            //setting hours and minutes for the current date
            if(today.getDate() === currentDate.getDate()){
                currentDate.setHours(today.getHours(), today.getMinutes(), 0);
            }
        }
    }
    React.useEffect(() => {
        getAvailableSlots()
    }, [doctorInfo, doctors])
    return (
        <div>

            <div className='flex flex-col sm:flex-row gap-4'>

                {/* Doctor Image */}
                <div>
                    <img
                        src={doctorInfo?.image}
                        alt={doctorInfo?.name}
                        className='bg-primary w-full sm:max-w-72 rounded-lg'
                    />
                </div>

                {/* Doctor Info */}
                <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 -mt-20 sm:mt-0'>

                    <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
                        {doctorInfo?.name}

                        <img
                            src={assets.verified_icon}
                            alt="verified"
                            className='w-5'
                        />
                    </p>

                    <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>

                        <p>
                            {doctorInfo?.degree} - {doctorInfo?.speciality}
                        </p>

                        <button className='py-0.5 px-2 border text-xs rounded-full'>
                            {doctorInfo?.experience}
                        </button>
                    </div>

                    {/* About Section */}
                    <div>
                        <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
                            About

                            <img
                                src={assets.info_icon}
                                alt="info"
                                className='w-4'
                            />
                        </p>

                        <p className='text-sm text-gray-500 max-w-175 mt-1'>
                            {doctorInfo?.about}
                        </p>
                    </div>
                
                    <p className='flex items-center gap-2 text-lg font-medium text-gray-500 mt-4'>Appointment Fee: <span className='text-gray-600'>${doctorInfo?.fees}</span></p>
                

                </div>
                    {/* Appointment Form */}
                    <p>Booking Slots</p>
                    <div>

                    </div>

                <div>

                </div>

            </div>

        </div>
    )
}

export default Appointment