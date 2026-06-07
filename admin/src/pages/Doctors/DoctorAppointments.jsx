import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";

const DoctorAppointments = () => {
  const { appointments, getAppointments, dToken,completeAppointment,cancelAppointment } = useContext(DoctorContext);
  const { slotDateFormat,calculateAge } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }


  }, [dToken]);
 
  return (
    <div className="w-full m-5 bg-white rounded-lg border">
  <div className="p-4 border-b">
    <h2 className="text-lg font-semibold">All Appointments</h2>
  </div>

  {/* Header */}
  <div className="hidden md:grid grid-cols-[0.5fr_2fr_1fr_0.7fr_2fr_1fr_1fr] px-6 py-3 bg-gray-50 text-gray-600 font-medium border-b">
    <p>#</p>
    <p>Patient</p>
    <p>Payment</p>
    <p>Age</p>
    <p>Date & Time</p>
    <p>Fees</p>
    <p>Action</p>
  </div>

  {/* Rows */}
  {appointments.map((item, index) => (
    <div
      key={item._id}
      className="grid md:grid-cols-[0.5fr_2fr_1fr_0.7fr_2fr_1fr_1fr] items-center px-6 py-4 border-b text-sm"
    >
      <p>{index + 1}</p>

      {/* Patient */}
      <div className="flex items-center gap-3">
        <img
          src={item.userData.image}
          alt=""
          className="w-10 h-10 rounded-full object-cover"
        />
        <p className="font-medium">{item.userData.name}</p>
      </div>

      {/* Payment */}
      <span
        className={`w-fit px-3 py-1 rounded-full text-xs border ${
          item.payment
            ? "border-green-300 text-green-600 bg-green-50"
            : "border-gray-300 text-gray-600"
        }`}
      >
        {item.payment ? "Online" : "Cash"}
      </span>

      {/* Age */}
      <p>{calculateAge(item.userData.dob)}</p>

      {/* Date */}
      <p>
        {slotDateFormat(item.slotDate)}, {item.slotTime}
      </p>

      {/* Fees */}
      <p className="font-medium">₹{item.amount}</p>

      {/* Action */}
      <div className="flex items-center gap-2">
        {item.cancelled ? (
          <span className="text-red-500 font-medium">Cancelled</span>
        ) : item.isCompleted ? (
          <span className="text-green-500 font-medium">Completed</span>
        ) : (
          <>
            <button onClick={()=>cancelAppointment(item._id)} className="w-8 h-8 rounded-full bg-red-50 text-red-500 hover:bg-red-100">
              ✕
            </button>

            <button onClick={()=>completeAppointment(item._id)} className="w-8 h-8 rounded-full bg-green-50 text-green-500 hover:bg-green-100">
              ✓
            </button>
          </>
        )}
      </div>
    </div>
  ))}
</div>
  )
};

export default DoctorAppointments;