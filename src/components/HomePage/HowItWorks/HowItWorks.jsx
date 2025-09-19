"use client";

import React from "react";
import { Calendar, Search, CreditCard, Stethoscope } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const steps = [
  {
    id: 1,
    title: "Search a Doctor",
    description: "Find doctors by specialty, name, or location quickly.",
    icon: <Search className="w-10 h-10 text-green-600" />,
  },
  {
    id: 2,
    title: "Select Appointment Time",
    description: "Choose a suitable date and time that fits your schedule.",
    icon: <Calendar className="w-10 h-10 text-green-600" />,
  },
  {
    id: 3,
    title: "Confirm & Pay",
    description: "Easily confirm your booking and pay securely online.",
    icon: <CreditCard className="w-10 h-10 text-green-600" />,
  },
  {
    id: 4,
    title: "Get Consultation",
    description: "Meet your doctor at the clinic or through video call.",
    icon: <Stethoscope className="w-10 h-10 text-green-600" />,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 bg-green-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 md:px-12 text-center">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-12">
          How It Works
        </h2>

        {/* Steps Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <Card
              key={step.id}
              className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition text-center"
            >
              <CardHeader className="flex flex-col items-center mb-4">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-700 mb-2">
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {step.title}
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
