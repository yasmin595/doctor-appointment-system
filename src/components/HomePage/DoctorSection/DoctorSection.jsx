"use client";
import { useEffect, useState } from "react";
import DoctorsCard from "../DoctorsCard/DoctorsCard";


export default function DoctorSection() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch("/api/all-doctor"); // GET API (role=Doctor)
        const data = await res.json();
        console.log("Doctors:", data);
        setDoctors(data);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <section className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Our Doctors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {doctors.length > 0 ? (
          doctors.map((doc) => <DoctorsCard key={doc._id} doctor={doc} />)
        ) : (
          <p className="col-span-3 text-center text-gray-500">No doctors found</p>
        )}
      </div>
    </section>
  );
}
