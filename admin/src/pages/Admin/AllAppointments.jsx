import React from 'react'
import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { toast } from 'react-toastify';
const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, appointmentCancel } = useContext(AdminContext);
  const { calculateAge, currency } = useContext(AppContext);
  const { slotDateFormat } = useContext(AppContext);
  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken])
  return (
    <div className="w-full max-w-7xl mx-auto p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          All Appointments
        </h2>

        <span className="text-sm text-gray-500">
          Total: {appointments.length}
        </span>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">

        {/* Header */}
        <div className="hidden md:grid grid-cols-[60px_2.5fr_80px_1.5fr_2.5fr_100px_120px] items-center px-6 py-4 bg-gray-50 border-b font-medium text-gray-600">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        <div className="max-h-[75vh] overflow-y-auto hide-scrollbar">
          {appointments.length === 0 ? (
            <div className="flex items-center justify-center h-60 text-gray-500">
              No appointments found
            </div>
          ) : (
            appointments.map((appointment, index) => (
              <div
                key={appointment._id}
                className="
              md:grid
              md:grid-cols-[60px_2.5fr_80px_1.5fr_2.5fr_100px_120px]
              items-center
              gap-4
              px-6
              py-4
              border-b
              border-gray-100
              hover:bg-gray-50
              transition
            "
              >
                {/* Mobile Card Layout */}
                <div className="md:hidden mb-3 flex justify-between">
                  <span className="font-semibold">
                    Appointment #{index + 1}
                  </span>

                  <span className="text-green-600 font-semibold">
                    {currency}
                    {appointment.docData.fees}
                  </span>
                </div>

                {/* Index */}
                <p className="hidden md:block text-gray-700 font-medium">
                  {index + 1}
                </p>

                {/* Patient */}
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={appointment.userData.image}
                    alt={appointment.userData.name}
                    className="w-11 h-11 rounded-full object-cover shrink-0"
                  />

                  <div className="min-w-0">
                    <p className="font-medium text-gray-800 truncate">
                      {appointment.userData.name}
                    </p>

                    <p className="text-xs text-gray-500">
                      Patient
                    </p>
                  </div>
                </div>

                {/* Age */}
                <p className="text-gray-700">
                  {calculateAge(appointment.userData.dob)}
                </p>

                {/* Date */}
                <div>
                  <p className="font-medium text-gray-700">
                    {slotDateFormat(appointment.slotDate)}
                  </p>

                  <p className="text-xs text-gray-500">
                    {appointment.slotTime}
                  </p>
                </div>

                {/* Doctor */}
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={appointment.docData.image}
                    alt={appointment.docData.name}
                    className="w-11 h-11 rounded-full object-cover shrink-0"
                  />

                  <div className="min-w-0">
                    <p className="font-medium text-gray-800 truncate">
                      {appointment.docData.name}
                    </p>

                    <p className="text-xs text-gray-500 truncate">
                      {appointment.docData.speciality}
                    </p>
                  </div>
                </div>

                {/* Fees */}
                <p className="hidden md:block font-semibold text-green-600">
                  {currency}
                  {appointment.docData.fees}
                </p>

                {/* Actions */}
                <div>
                  {appointment.isCompleted ? (
                    <div className="inline-flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-green-600">
                      <span>✓</span>
                      <span className="text-sm font-medium">
                        Completed
                      </span>
                    </div>
                  ) : appointment.cancelled ? (
                    <div className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-red-600">
                      <AlertCircle size={16} />
                      <span className="text-sm font-medium">
                        Cancelled
                      </span>
                    </div>
                  ) : (
                    <button
                      onClick={() => appointmentCancel(appointment._id)}
                      className="
      w-9 h-9
      flex items-center justify-center
      rounded-full
      bg-red-100
      text-red-600
      hover:bg-red-600
      hover:text-white
      transition-all
    "
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default AllAppointments
