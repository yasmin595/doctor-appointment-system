"use client";

import { useState } from "react";
import AppointmentForm from "../doctor-profile/components/AppointmentForm";

const BookAppointmentPage = () => {
  const [appointments, setAppointments] = useState([]);

  const handleAddAppointment = (newAppointment) => {
    setAppointments([...appointments, newAppointment]);
  };

  return (
    <div className="p-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Book an Appointment</h1>
      <AppointmentForm onAddAppointment={handleAddAppointment} />
    </div>
  );
};

export default BookAppointmentPage;
