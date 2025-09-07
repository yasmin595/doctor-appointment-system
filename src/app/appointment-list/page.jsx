"use client";

import { useState, useEffect } from "react";
import AppointmentList from "../doctor-profile/components/AppointmentList";
import { doctors } from "../data/doctor"; // এখান থেকে ডাটা আসবে

const AppointmentListPage = () => {
  const [appointments, setAppointments] = useState([]);

  // doctors JSON থেকে appointments লোড
  useEffect(() => {
    if (doctors && doctors.length > 0) {
      // ধরি সব ডাক্তারের appointments একসাথে দেখাতে চাও
      const allAppointments = doctors.flatMap((doctor) => doctor.appointments || []);
      setAppointments(allAppointments);
    }
  }, []);

  return (
    <div className="p-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Appointments</h1>
      <AppointmentList appointments={appointments} />
    </div>
  );
};

export default AppointmentListPage;
