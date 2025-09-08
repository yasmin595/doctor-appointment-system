"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const PaymentForm = ({ doctor, onSubmit, loading }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    if (!doctor) return null; // Prevent crash if doctor is undefined

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    {...register("name", { required: "Full name is required" })}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email address",
                        },
                    })}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            {/* Phone */}
            <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    {...register("phone", { required: "Phone number is required" })}
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>

            {/* Amount (readonly) */}
            <div className="space-y-2">
                <Label>Amount (BDT)</Label>
                <Input
                    type="number"
                    value={doctor.consultationFee}
                    readOnly
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
    );
};

export default PaymentForm;
