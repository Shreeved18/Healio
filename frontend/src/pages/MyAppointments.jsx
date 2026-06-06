import React from 'react'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify';
import axios from 'axios';
import { Trash2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MyAppointments = () => {
  const { backendUrl, token, fetchDoctor ,slotDateFormat} = React.useContext(AppContext);
  const [appointments, setAppointments] = React.useState([]);
  const navigate = useNavigate();
  const getAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/get-appointments', {
        headers: { token }
      });

      if (data.success) {
        setAppointments(data.appointments);
        console.log(data.appointments);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  const cancelAppointment = async (id) => {
    const appointmentId = id;
    const userConfirmation = window.confirm('Are you sure you want to cancel this appointment?');
    if (userConfirmation) {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, {
        headers: { token }
      });

      if (data.success) {
        toast.success(data.message);
        getAppointments();
        fetchDoctor();
      } else {
        toast.error(data.message);
      }

    } else {

      toast.info('Appointment cancellation aborted.');
    }
  }

  React.useEffect(() => {
    if (token) {
      getAppointments();
    }
  }, [token])

  const initpay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Healio',
      description: 'Appointment Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(backendUrl + '/api/user/verify-payment', {
            ...response,
            appointmentId: order.receipt
          }, {
            headers: { token }
          });

          if (data.success) {
            toast.success('Payment successful!');
            getAppointments();
            navigate('/my-appointments');
          } else {
            toast.error('Payment verification failed. Please contact support.');
          }
        } catch (error) {
          console.log(error);
          toast.error('Payment verification failed. Please contact support.');
        }
      },
      theme: {
        color: '#2563eb',
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  }
  const appointmentRazorpay = async (id) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId: id }, {
        headers: { token }
      });

      if (data.success) {
        initpay(data.order);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Payment failed. Please try again.');
    }
  }
  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</p>
      <div>
        {appointments.map((item, index) => (
          <div key={index} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 border-b py-2'>
            <div>
              <img className='bg-indigo-50 w-full h-60 ' src={item.docData.image} alt={item.docData.name} />
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 text-semibold'>{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p className='text-zinc-700 font-medium mt-1'>Address:</p>
              <p className='text-xs'>{JSON.parse(item.docData.address).line1}</p>
              <p className='text-xs'>{JSON.parse(item.docData.address).line2}</p>
              <p className='text-sm mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
            </div>
            <div></div>

            <div className='flex flex-col gap-2 justify-end'>
              {!item.cancelled && item.payment && <div className="flex items-center gap-1.5 rounded-lg bg-green-50 px-3 py-2 text-green-500">
                <AlertCircle size={16} />
                <span className="text-sm font-medium">
                  Payment Successful
                </span>
              </div>}
              {!item.cancelled && !item.payment && <button onClick={() => { appointmentRazorpay(item._id) }} className='text-sm text-center text-stone-500 sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Pay Online</button>}
              {!item.cancelled && <button onClick={() => { cancelAppointment(item._id) }} className='text-sm text-center text-stone-500 sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel Appointment</button>}

              {item.cancelled && (

                <div className="flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-red-500">
                  <AlertCircle size={16} />
                  <span className="text-sm font-medium">
                    Appointment Cancelled
                  </span>
                </div>

              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments
