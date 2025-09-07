"use client";

import React from "react";
import Image from "next/image";
import DocNowImage from "../../../../public/whyDocNow.jpg";
import { Card, CardContent } from "@/components/ui/card";

export default function WhyDocNow() {
  return (
    <section className="py-24 bg-green-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-12">
        
        {/* Left Side Image */}
        <div className="lg:w-1/2 w-full flex justify-center">
          <Card className="w-full shadow-lg rounded-2xl overflow-hidden">
            <Image
              src={DocNowImage}
              alt="Why DocNow"
              className="w-full h-auto object-cover"
              priority
            />
          </Card>
        </div>

        {/* Right Side Content */}
        <div className="lg:w-1/2 w-full text-center lg:text-left space-y-6">
          <Card className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6">
            <CardContent className="space-y-4">
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
            </CardContent>
          </Card>
        </div>

      </div>
    </section>
  );
}
