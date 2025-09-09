"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { useSession } from "next-auth/react";

const PaymentForConfirmF = ({ params }) => {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(false);
    const [doctor, setDoctor] = useState(null);
    const id = params.id;

    const [formData, setFormData] = useState({
        phone: "",
    });

    useEffect(() => {
        fetch("/doctor.json")
            .then(res => res.json())
            .then(data => {
                const singleDoctor = data.find(d => d.id == id);
                setDoctor(singleDoctor);
            });
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!doctor || !session?.user) {
            alert("Doctor or User not found!");
            setLoading(false);
            return;
        }

        const payload = {
            name: session.user.name,
            email: session.user.email,
            phone: formData.phone,
            amount: doctor.consultationFee,
            doctorId: doctor.id,
            doctorName: doctor.name,
        };

        try {
            const res = await axios.post("/api/payment", payload);
            if (res.data?.url) {
                // Redirect user to SSLCommerz Gateway
                window.location.href = res.data.url;
            } else {
                alert("Failed to initiate payment.");
            }
        } catch (error) {
            console.error("Payment error:", error);
            alert("Something went wrong!");
        }

        setLoading(false);
    };

    if (status === "loading") return <p>Loading...</p>;

    return (
        <div className="flex justify-center items-center min-h-screen p-4 bg-gradient-to-br from-blue-50 via-white to-gray-100">
            <Card className="w-full max-w-md shadow-xl rounded-2xl border border-gray-200">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center text-blue-600">
                        Confirm Payment for {doctor?.name}
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handlePayment} className="space-y-4">
                        {/* Name */}
                        <div className="space-y-2">
                            <label className="font-semibold">Full Name</label>
                            <input
                                type="text"
                                value={session?.user?.name || ""}
                                readOnly
                                className="w-full border rounded-lg px-3 py-2 bg-gray-100"
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="font-semibold">Email</label>
                            <input
                                type="email"
                                value={session?.user?.email || ""}
                                readOnly
                                className="w-full border rounded-lg px-3 py-2 bg-gray-100"
                            />
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                            <label className="font-semibold">Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter your phone number"
                                required
                                className="w-full border rounded-lg px-3 py-2"
                            />
                        </div>

                        {/* Total Price */}
                        <div className="space-y-2">
                            <label className="font-semibold">Total Price (BDT)</label>
                            <input
                                type="number"
                                value={doctor?.consultationFee || ""}
                                readOnly
                                className="w-full border rounded-lg px-3 py-2 bg-gray-100"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 transition-all"
                        >
                            {loading ? "Processing..." : `Pay ৳${doctor?.consultationFee}`}
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="flex justify-center">
                    <Button asChild variant="outline" className="w-full rounded-xl">
                        <Link href="/dashboard/patient/all-doctor">Cancel</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default PaymentForConfirmF;
