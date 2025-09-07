"use client";

import React from "react";
import { Star } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const feedbacks = [
  {
    id: 1,
    name: "MD. Tuhin",
    rating: 5,
    comment:
      "Excellent service! The doctor was very attentive and professional.",
  },
  {
    id: 2,
    name: "Mr. Faysal",
    rating: 4,
    comment:
      "Very helpful staff and quick appointments. Highly recommend!",
  },
  {
    id: 3,
    name: "Ahmed Khan",
    rating: 5,
    comment:
      "Great experience! The booking process was simple and easy.",
  },
];

export default function PatientFeedback() {
  return (
    <section className="py-24 bg-green-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 md:px-12 text-center">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Patient Feedback
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-12">
          Reviews from our patients to help you make an informed decision.
        </p>

        {/* Feedback Cards Grid */}
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {feedbacks.map((fb) => (
            <Card
              key={fb.id}
              className="flex flex-col items-center text-center shadow-md hover:shadow-lg transition"
            >
              <CardHeader className="flex flex-col items-center gap-3">
                {/* Avatar */}
                <Avatar className="w-16 h-16 bg-green-100 dark:bg-green-700">
                  <AvatarFallback className="text-green-700 dark:text-green-200 font-bold">
                    {fb.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                {/* Star Rating */}
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < fb.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                        }`}
                    />
                  ))}
                </div>
              </CardHeader>

              <CardContent className="flex flex-col items-center gap-2">
                {/* Comment */}
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {fb.comment}
                </p>
                {/* Patient Name */}
                <h4 className="font-semibold text-gray-800 dark:text-white">
                  {fb.name}
                </h4>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
