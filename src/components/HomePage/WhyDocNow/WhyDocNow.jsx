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
          <Image
            src={DocNowImage}
            alt="Why DocNow"
            className="rounded-2xl shadow-lg w-full h-auto object-cover"
            priority
          />
        </div>

        {/* Right Side Content */}
        <div className="lg:w-1/2 w-full text-center lg:text-left space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
            Why Choose DocNow
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            DocNow makes finding and booking doctors quick and easy. Our platform provides verified doctors, instant booking confirmations, and seamless online consultations — all in one place.
          </p>
          <ul className="text-gray-700 dark:text-gray-300 space-y-2 list-disc list-inside">
            <li>Verified and experienced doctors</li>
            <li>Instant appointment booking</li>
            <li>Secure online consultations</li>
            <li>Easy-to-use platform</li>
          </ul>
        </div>

      </div>
    </section>
  );
}
