import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { Users, UserRound, CalendarDays, Clock3 } from "lucide-react";
import { AppContext } from "../../context/AppContext";

const Dashboard = () => {
  const { aToken, dashData, getDashData, } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);
  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    <div className="w-full p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Overview of doctors, patients and appointments.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl border shadow-sm p-5 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-blue-100">
            <UserRound className="w-7 h-7 text-blue-600" />
          </div>

          <div>
            <p className="text-2xl font-bold">
              {dashData?.totalDoctors || 0}
            </p>
            <p className="text-gray-500 text-sm">
              Total Doctors
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border shadow-sm p-5 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-green-100">
            <Users className="w-7 h-7 text-green-600" />
          </div>

          <div>
            <p className="text-2xl font-bold">
              {dashData?.patients || 0}
            </p>
            <p className="text-gray-500 text-sm">
              Total Patients
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border shadow-sm p-5 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-purple-100">
            <CalendarDays className="w-7 h-7 text-purple-600" />
          </div>

          <div>
            <p className="text-2xl font-bold">
              {dashData?.totalappointments || 0}
            </p>
            <p className="text-gray-500 text-sm">
              Total Appointments
            </p>
          </div>
        </div>
      </div>

      {/* Latest Appointments */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b bg-gray-50">
          <h2 className="font-semibold text-gray-800">
            Latest Appointments
          </h2>
        </div>

        {dashData?.latestAppointments?.length > 0 ? (
          <div className="divide-y">
            {dashData.latestAppointments.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-4">
                  <div className="h-11 w-11 rounded-full bg-blue-100 flex items-center justify-center">
                    <img src={item.userData.image} alt='' />
                  </div>

                  <div>
                    <p className="font-medium text-gray-800">
                      {item.userData?.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {slotDateFormat(item.slotDate)} | {item.slotTime}
                    </p>
                  </div>
                </div>

                {!item.cancelled && (
                  <button
                    onClick={() => appointmentCancel(item._id)}
                    className="
                      px-4 py-2
                      rounded-lg
                      bg-red-50
                      text-red-600
                      hover:bg-red-600
                      hover:text-white
                      transition
                    "
                  >
                    Cancel
                  </button>
                )}

                {item.cancelled && (
                  <span className="text-red-500 font-medium text-sm">
                    Cancelled
                  </span>
                )}

              </div>
            ))}
          </div>
        ) : (
          <div className="p-10 text-center text-gray-500">
            No recent appointments
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;