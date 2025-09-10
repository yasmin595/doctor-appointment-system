"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export default function PatientProfileDetails() {
  // Demo patient data (later fetch from backend)
  const patient = {
    name: "Sheikh Fahad",
    email: "fahad@example.com",
    phone: "+880123456789",
    gender: "Male",
    age: 24,
    bloodGroup: "B+",
    address: "Dhanmondi, Dhaka, Bangladesh",
    image: "https://i.pravatar.cc/150?img=3",
  };

  return (
    <section className="max-w-3xl mx-auto p-6">
      <Card className="shadow-lg rounded-2xl">
        <CardHeader className="flex flex-col items-center">
          <Avatar className="w-24 h-24">
            <AvatarImage src={patient.image} alt={patient.name} />
            <AvatarFallback>{patient.name[0]}</AvatarFallback>
          </Avatar>
          <CardTitle className="mt-4 text-2xl font-semibold">
            {patient.name}
          </CardTitle>
          <p className="text-sm text-gray-500">{patient.email}</p>
        </CardHeader>
        <Separator />
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <p className="text-gray-500 text-sm">Phone</p>
            <p className="font-medium">{patient.phone}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Gender</p>
            <p className="font-medium">{patient.gender}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Age</p>
            <p className="font-medium">{patient.age} years</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Blood Group</p>
            <p className="font-medium">{patient.bloodGroup}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-gray-500 text-sm">Address</p>
            <p className="font-medium">{patient.address}</p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
