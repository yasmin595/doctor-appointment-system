"use client";

import React from "react";
import Image from "next/image";
import DocNowImage from "../../../../public/whyDocNow.jpg";

export default function WhyDocNow() {
  return (
    <section className="py-24 bg-green-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-12">
        
        {/* Left Side Image */}
        <div className="lg:w-1/2 w-full flex justify-center">
          <div className="w-full shadow-lg rounded-2xl overflow-hidden">
            <div className="relative w-full h-80 md:h-[500px]"> 
              <Image
                src={DocNowImage}
                alt="Why DocNow"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Right Side Content */}
        <div className="lg:w-1/2 w-full text-center lg:text-left space-y-6">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
              Why Choose DocNow
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg mt-4">
              DocNow makes finding and booking doctors quick and easy. Our
              platform provides verified doctors, instant booking confirmations,
              and seamless online consultations — all in one place.
            </p>
            <ul className="text-gray-700 dark:text-gray-300 space-y-2 list-disc list-inside mt-4">
              <li>Verified and experienced doctors</li>
              <li>Instant appointment booking</li>
              <li>Secure online consultations</li>
              <li>Easy-to-use platform</li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
