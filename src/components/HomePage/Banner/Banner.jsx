"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

const Banner = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleBook = () => {
    if (status === "loading") return; // still checking session
    if (!session) {
      router.push("/login"); // not logged in
    } else {
      router.push("/dashboard/patient/all-doctor"); // logged in
    }
  };

  return (
    <section
      className="relative w-full min-h-[400px] sm:min-h-[600px] md:min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-12 py-12 sm:py-20 bg-cover bg-center"
      style={{
        backgroundImage: "url('/BANNER_PIC.jpg')",
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>

      {/* Content */}
      <div className="relative max-w-3xl text-white space-y-6 sm:space-y-8 px-2 sm:px-4 md:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold leading-tight drop-shadow-lg">
          Your Health, Our Priority
        </h1>
        <p className="text-base sm:text-lg md:text-xl font-medium max-w-2xl mx-auto drop-shadow-md">
          Book appointments with trusted doctors anytime, anywhere.  
          Access top healthcare professionals at your fingertips.
        </p>

        {/* Shadcn Button */}
        <Button
          onClick={handleBook}
          size="lg"
          className="bg-green-600 hover:bg-green-700 text-white shadow-lg"
        >
          Book Appointment
        </Button>
      </div>
    </section>
  );
};

export default Banner;
