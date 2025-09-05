"use client";

import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";

export default function AllDoctorPage() {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        fetch("/doctor.json")
            .then((res) => res.json())
            .then((data) => setDoctors(data));
    }, []);

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-8">All Doctors</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.map((doctor) => (
                    <Card
                        key={doctor.id}
                        className="hover:shadow-lg transition border border-stone-300"
                    >
                        <CardHeader className="flex flex-col items-center">
                            <img
                                src={doctor.profilePicture}
                                alt={doctor.name}
                                className="w-28 h-28 rounded-full mb-3"
                            />
                            <CardTitle className="text-xl">{doctor.name}</CardTitle>
                            <p className="text-stone-600">{doctor.specialization}</p>
                            <p className="text-sm text-stone-500">{doctor.location}</p>
                        </CardHeader>

                        <CardContent className="space-y-2 text-center">
                            <p>
                                <span className="font-semibold">Experience:</span>{" "}
                                {doctor.experience}
                            </p>
                            <p>
                                <span className="font-semibold">Fee:</span> ৳
                                {doctor.consultationFee}
                            </p>
                            <p>
                                <span className="font-semibold">Rating:</span> ⭐{" "}
                                {doctor.rating}
                            </p>

                            <div>
                                <p className="font-semibold">Available Days:</p>
                                <ul className="list-disc list-inside text-sm text-stone-600">
                                    {doctor.availability.map((day, i) => (
                                        <li key={i}>{day}</li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <p className="font-semibold">Time Slots:</p>
                                <ul className="list-disc list-inside text-sm text-stone-600">
                                    {doctor.timeSlots.map((slot, i) => (
                                        <li key={i}>{slot}</li>
                                    ))}
                                </ul>
                            </div>

                            <Button className="w-full mt-3">Book Appointment</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
