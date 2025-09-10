// app/payment-success/page.jsx
"use client";

import { useEffect, useState } from "react";

export default function PaymentSuccessPage() {
    const [status, setStatus] = useState("Loading...");

    useEffect(() => {
        const checkPayment = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/api/success?tran_id=TXN_12345`
                );
                const data = await res.json();
                setStatus(data.message || "Payment Verified ✅");
            } catch (err) {
                setStatus("Error verifying payment ❌");
            }
        };
        checkPayment();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold">Payment Success Page</h1>
            <p className="mt-4">{status}</p>
        </div>
    );
}
