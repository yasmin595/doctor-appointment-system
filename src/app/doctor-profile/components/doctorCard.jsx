"use client";
import Image from "next/image";

const DoctorCard = ({ doctor }) => {
  if (!doctor) return null;

  return (
    <div className="w-full max-w-2xl bg-gradient-to-br from-white to-gray-50 shadow-2xl rounded-4xl p-10 border border-gray-200 hover:scale-105 transition-transform duration-300">
      
      <div className="flex items-center space-x-8">
        <Image
          src={doctor.profilePicture}
          alt={doctor.name}
          width={120}
          height={120}
          className="rounded-full border-4 border-indigo-200 shadow-lg"
        />
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900">{doctor.name}</h2>
          <p className="text-indigo-600 font-semibold text-xl mt-1">{doctor.specialization}</p>
          <p className="text-gray-500 text-base mt-1">{doctor.location}</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-6 text-gray-700">
        <div><strong>Email:</strong> {doctor.email}</div>
        <div><strong>Phone:</strong> {doctor.phone}</div>
        <div><strong>Experience:</strong> {doctor.experience}</div>
        <div><strong>Fee:</strong> {doctor.consultationFee} BDT</div>
        <div className="col-span-2"><strong>Rating:</strong> <span className="text-yellow-500 font-bold">{doctor.rating} ★</span></div>
        <div className="col-span-2 mt-2">{doctor.bio}</div>
      </div>

      {doctor.availability && (
        <div className="mt-8">
          <h3 className="font-semibold text-gray-800 text-lg mb-3">Availability</h3>
          <ul className="list-disc ml-6 text-gray-600 space-y-1">
            {Object.entries(doctor.availability).map(([day, slots], index) => (
              <li key={index}>
                <span className="font-medium text-gray-800">{day}:</span> {slots.join(", ")}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DoctorCard;
