"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Banner = () => {
  const router = useRouter();

  const handleBook = () => {
    router.push("/alldoctors"); 
  };

  return (
    <section
      className="relative w-full min-h-[400px] sm:min-h-[600px] md:min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-12 py-12 sm:py-20 bg-cover bg-center"
      style={{
        backgroundImage: "url('/banner-img.png')",
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>

      {/* Content */}
      <div className="relative max-w-3xl text-white space-y-6 sm:space-y-8 px-2 sm:px-4 md:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold leading-tight drop-shadow-[0_4px_6px_rgba(0,0,0,0.7)]">
          Your Health, Our Priority
        </h1>
        <p className="text-base sm:text-lg md:text-xl font-medium max-w-2xl mx-auto drop-shadow-[0_3px_5px_rgba(0,0,0,0.5)]">
          Book appointments with trusted doctors anytime, anywhere.  
          Access top healthcare professionals at your fingertips.
        </p>
        <button
          onClick={handleBook}
          className="bg-green-600 hover:bg-green-700 transition px-6 sm:px-10 py-3 sm:py-4 rounded-md font-semibold shadow-lg text-base sm:text-lg md:text-xl"
        >
          Book Appointment
        </button>
      </div>
    </section>
  );
};

export default Banner;
