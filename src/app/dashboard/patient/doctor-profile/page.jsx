"use client";

import { doctors } from "../data/doctor";
import DoctorCard from "./components/doctorCard";

export default function DoctorProfilePage() {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center p-6 space-y-4">
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </main>
  );
}
