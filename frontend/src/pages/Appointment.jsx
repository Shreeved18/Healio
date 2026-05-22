import React from 'react'
import { assets } from '../assets/assets'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import RelatedDoctors from '../components/RelatedDoctors'

const Appointment = () => {

    const { docId } = useParams()

    const { doctors } = React.useContext(AppContext)
    const { currency } = React.useContext(AppContext)

    const [doctorInfo, setDoctorInfo] = React.useState(null)

    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

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
            endTime.setHours(21, 0, 0);

            //setting hours and minutes for the current date
            if (today.toDateString() === currentDate.toDateString()) {
                currentDate.setMinutes(Math.ceil(currentDate.getMinutes() / 30) * 30);

                if (currentDate.getMinutes() === 60) {
                    currentDate.setHours(currentDate.getHours() + 1);
                    currentDate.setMinutes(0);
                }
                if (currentDate.getHours() < 10) {
                    currentDate.setHours(10);
                    currentDate.setMinutes(0);
                }
            }
             else{
                    currentDate.setHours(10);
                    currentDate.setMinutes(0);
            }

            let timeSlots = [];
            while(currentDate < endTime){
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit',  hour12: true });
                //add slots to the array
                timeSlots.push({dateTime: new Date(currentDate), time: formattedTime});
                currentDate.setMinutes(currentDate.getMinutes() + 30);
                
            }
            if (timeSlots.length > 0) {
                setDocSlots((prev) => [...prev, timeSlots]);
            }
        }
    }
    React.useEffect(() => {
        getAvailableSlots()
    }, [doctorInfo])

    
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
                
                    <p className='flex items-center gap-2 text-lg font-medium text-gray-500 mt-4'>Appointment Fee: <span className='text-gray-600'>{currency}{doctorInfo?.fees}</span></p>
                

                </div>
            </div>
                {/* BOOKING SLOTS */}
          <div className='sm:ml-72 sm:pl-4 mt-4 font-medium'>
                 <p className=' text-gray-700'>Booking Slots</p>

                 <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
                     {
                         docslots.length > 0 &&
                         docslots.map((item, index) => (
                             <div onClick={() => setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-400 text-gray-700' }`} key={index}>
                                 <p >{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
                                 <p>{item[0] && item[0].dateTime.getDate()}</p>
                             </div>
                         ))
                     }
                 </div>
                 <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4 no-scrollbar'>
                      {docslots.length > 0 &&  
                      docslots[slotIndex].map((item, index) => (
                              <p className={`text-sm font-light shrink-0 px-5 py-2 rounded-full cursor-pointer no-scrollbar ${slotTime === item.time ? 'bg-primary text-white' : 'border border-gray-300 text-gray-400'}`} key={index} onClick={() => setSlotTime(item.time)}>
                        {item.time.toLowerCase()}
                              </p>
                       ))
                   }
                 </div>
                 <button className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6 disabled:bg-gray-400' disabled={!slotTime}>
                     Book Appointment
                 </button>
         </div>

        {doctorInfo?.speciality && (
  <RelatedDoctors
    docId={docId}
    speciality={doctorInfo.speciality}
  />
)}

        </div>
    )
}

export default Appointment