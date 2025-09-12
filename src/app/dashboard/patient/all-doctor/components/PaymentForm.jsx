"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const PaymentForm = ({ doctor, loading }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    if (!doctor) return null; // Prevent crash if doctor is undefined
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        transactionId: "",
        status: "Pending",
        date: new Date().toISOString().split("T")[0],
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    return (
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
                    value={doctor?.consultationFee}
                    readOnly
                    className="w-full border rounded-lg px-3 py-2"
                />
            </div>

            {/* Transaction ID */}
            <div className="space-y-2">
                <label className="font-semibold">Transaction ID</label>
                <input
                    type="text"
                    name="transactionId"
                    value={formData?.transactionId}
                    onChange={handleChange}
                    placeholder="Leave empty, will be handled in backend"
                    className="w-full border rounded-lg px-3 py-2"
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
    );
};

export default PaymentForm;
