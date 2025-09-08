"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { useParams } from "next/navigation";

const PaymentForConfirmF = ({ doctor }) => {
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const doctorId = { params }
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        transactionId: "",
        status: "Pending",
        date: new Date().toISOString().split("T")[0], // YYYY-MM-DD
    });

    // if (!doctor) return <p className="text-center mt-10">No doctor selected.</p>;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                ...formData,
                amount: doctor,
                doctorId: doctor.id,
                doctorName: doctor.name,
            };

            // Call backend to initialize SSLCommerz payment
            const res = await axios.post("/api/payment/init", payload);

            if (res.data?.url) {
                window.location.href = res.data.url; // Redirect to SSLCommerz Gateway
            } else {
                alert("Failed to create payment session.");
            }
        } catch (error) {
            console.error("Payment error:", error);
            alert("Something went wrong!");
        }

        setLoading(false);
    };

    return (
        <div className="flex justify-center items-center min-h-screen p-4 bg-gradient-to-br from-blue-50 via-white to-gray-100">
            <Card className="w-full max-w-md shadow-xl rounded-2xl border border-gray-200">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center text-blue-600">
                        Confirm Payment
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handlePayment} className="space-y-4">
                        {/* Name */}
                        <div className="space-y-2">
                            <label className="font-semibold">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                required
                                className="w-full border rounded-lg px-3 py-2"
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="font-semibold">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                                className="w-full border rounded-lg px-3 py-2"
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
                                name="amount"
                                value={doctor}
                                readOnly
                                className="w-full border rounded-lg px-3 py-2 bg-gray-100"
                            />
                        </div>

                        {/* Transaction ID */}
                        <div className="space-y-2">
                            <label className="font-semibold">Transaction ID</label>
                            <input
                                type="text"
                                name="transactionId"
                                value={formData.transactionId}
                                onChange={handleChange}
                                placeholder="Leave empty, will be handled in backend"
                                className="w-full border rounded-lg px-3 py-2"
                            />
                        </div>

                        {/* Date */}
                        <div className="space-y-2">
                            <label className="font-semibold">Date</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2 bg-gray-100"
                                readOnly
                            />
                        </div>

                        {/* Status */}
                        <div className="space-y-2">
                            <label className="font-semibold">Status</label>
                            <input
                                type="text"
                                name="status"
                                value={formData.status}
                                readOnly
                                className="w-full border rounded-lg px-3 py-2 bg-gray-100"
                            />
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 transition-all"
                        >
                            {loading ? "Processing..." : `Pay ৳${doctor}`}
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="flex justify-center">
                    <Button asChild variant="outline" className="w-full rounded-xl">
                        <Link href="/all-doctor">Cancel</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default PaymentForConfirmF;
