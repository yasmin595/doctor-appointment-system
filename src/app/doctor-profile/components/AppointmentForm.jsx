"use client";
import { useState } from "react";

const AppointmentForm = ({ onAddAppointment }) => {
  const [patientName, setPatientName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAppointment = {
      id: Date.now(),
      patientName,
      date,
      time,
      status: "pending", // সবসময় pending
    };

    onAddAppointment(newAppointment);

    // Reset form
    setPatientName("");
    setDate("");
    setTime("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-8 transition hover:shadow-2xl"
    >
      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
        🩺 Book an Appointment
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Patient Name */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
            Patient Name
          </label>
          <input
            type="text"
            placeholder="Enter full name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        {/* Date */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        {/* Time */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
            Time
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-8 w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-indigo-700 hover:shadow-lg transition duration-300"
      >
        Book Appointment
      </button>
    </form>
  );
};

export default AppointmentForm;
