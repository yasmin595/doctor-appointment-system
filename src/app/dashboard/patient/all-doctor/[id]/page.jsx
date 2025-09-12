"use client";

import React, { useEffect, useState, use } from "react";
import { useSession } from "next-auth/react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";

const PaymentForConfirmF = ({ params }) => {
    // Unwrap params promise
    const resolvedParams = use(params);
    const id = resolvedParams.id;

    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(false);
    const [doctor, setDoctor] = useState(null);

    const [formData, setFormData] = useState({
        phone: "",
    });

    // Fetch doctor data
    useEffect(() => {
        fetch("/doctor.json")
            .then((res) => res.json())
            .then((data) => {
                const singleDoctor = data.find((d) => d.id == id);
                setDoctor(singleDoctor);
            });
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        if (!doctor || !session?.user) return;

        if (!/^\d{10,15}$/.test(formData.phone)) {
            alert("Please enter a valid phone number");
            return;
        }

        setLoading(true);

        const payload = {
            Fee: doctor.consultationFee,
            Phone: formData.phone,
            Patient: {
                Name: session.user.name,
                Email: session.user.email,
            },
            Doctor: {
                Name: doctor.name,
                id: doctor.id,
            },
        };

        try {
            const res = await axios.post("/api/payment", payload);

            if (res.data?.url) {
                // Redirect to SSLCommerz gateway
                window.location.href = res.data.url;
            } else {
                alert("Failed to initiate payment");
            }
        } catch (error) {
            console.error("Payment error:", error);
            alert("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    if (status === "loading") return <p className="text-center mt-10">Loading...</p>;
    if (!doctor) return <p className="text-center mt-10 text-red-500">Doctor not found</p>;

    return (
        <div className="flex justify-center items-center min-h-screen p-4 bg-gradient-to-br from-blue-50 via-white to-gray-100">
            <Card className="w-full max-w-md shadow-xl rounded-2xl border border-gray-200">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center text-blue-600">
                        Confirm Payment for {doctor.name}
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
                                value={doctor.consultationFee}
                                readOnly
                                className="w-full border rounded-lg px-3 py-2 bg-gray-100"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 transition-all"
                        >
                            {loading ? "Processing..." : `Pay ৳${doctor.consultationFee}`}
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
