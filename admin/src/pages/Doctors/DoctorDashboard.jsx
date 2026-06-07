import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import {
  IndianRupee,
  CalendarDays,
  Users,
  Clock3,
} from "lucide-react";

const DoctorDashboard = () => {
  const { getDashData, dashData, dToken } = useContext(DoctorContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  if (!dashData) return null;

  return (
    <div className="w-full p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Doctor Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Overview of your appointments, earnings and patients.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Earnings */}
        <div className="bg-white rounded-2xl border shadow-sm p-6 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Total Earnings
              </p>

              <h2 className="text-3xl font-bold text-gray-800 mt-2">
                ₹{dashData.earnings}
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-green-100">
              <IndianRupee
                size={28}
                className="text-green-600"
              />
            </div>
          </div>
        </div>

        {/* Appointments */}
        <div className="bg-white rounded-2xl border shadow-sm p-6 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Appointments
              </p>

              <h2 className="text-3xl font-bold text-gray-800 mt-2">
                {dashData.appointments}
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-blue-100">
              <CalendarDays
                size={28}
                className="text-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Patients */}
        <div className="bg-white rounded-2xl border shadow-sm p-6 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Patients
              </p>

              <h2 className="text-3xl font-bold text-gray-800 mt-2">
                {dashData.patients}
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-purple-100">
              <Users
                size={28}
                className="text-purple-600"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Latest Appointments */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-800">
            Latest Appointments
          </h2>
        </div>

        {dashData.latestAppointments.length > 0 ? (
          <div className="divide-y">
            {dashData.latestAppointments.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-4">
                  
                  <img
                    src={item.userData.image}
                    alt={item.userData.name}
                    className="w-12 h-12 rounded-full object-cover bg-gray-100"
                  />

                  <div>
                    <p className="font-medium text-gray-800">
                      {item.userData.name}
                    </p>

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                    

                      <span>
                        {slotDateFormat(item.slotDate)}
                      </span>

                      <span>•</span>

                      <span>{item.slotTime}</span>
                    </div>
                  </div>
                </div>

                {item.cancelled ? (
                  <span className="px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-medium">
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className="px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-medium">
                    Completed
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-yellow-50 text-yellow-600 text-xs font-medium">
                    Pending
                  </span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-10 text-center text-gray-500">
            No recent appointments found
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;