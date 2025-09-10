"use client";

const AppointmentList = ({ appointments, onUpdateStatus }) => {
  // cancelled ছাড়া সব appointments দেখাবে
  const visibleAppointments = appointments.filter(
    (appointment) => appointment.status !== "cancelled"
  );

  if (!visibleAppointments || visibleAppointments.length === 0) {
    return <p className="text-gray-500">No appointments available</p>;
  }

  return (
    <div className="w-full max-w-5xl">
      <table className="w-full border border-gray-300 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="py-3 px-4 border-b">#</th>
            <th className="py-3 px-4 border-b">Patient Name</th>
            <th className="py-3 px-4 border-b">Date</th>
            <th className="py-3 px-4 border-b">Time</th>
            <th className="py-3 px-4 border-b">Status</th>
            <th className="py-3 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {visibleAppointments.map((appointment, index) => (
            <tr
              key={appointment.id}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{appointment.patientName}</td>
              <td className="py-2 px-4 border-b">{appointment.date}</td>
              <td className="py-2 px-4 border-b">{appointment.time}</td>
              <td
                className={`py-2 px-4 border-b font-medium ${
                  appointment.status === "confirmed"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {appointment.status}
              </td>
              <td className="py-2 px-4 border-b">
                {appointment.status === "pending" ? (
                  <select
                    defaultValue=""
                    onChange={(e) => onUpdateStatus(appointment.id, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="" disabled>
                      Take Action
                    </option>
                    <option value="confirmed">Confirm</option>
                    <option value="cancelled">Cancel</option>
                  </select>
                ) : (
                  <span className="text-gray-500 italic">No action needed</span>
                )}
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentList;
