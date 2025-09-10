"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export default function PatientProfileDetails() {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await fetch("/api/patient/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch patient profile");
        }

        const data = await res.json();
        setPatient(data);
      } catch (error) {
        console.error("Error fetching patient:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, []);

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  if (!patient) {
    return <div className="text-center mt-20">No patient profile found.</div>;
  }

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
