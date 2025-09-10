// app/payment-success/page.jsx
"use client";
import { useRouter } from "next/navigation";

export default function PaymentSuccessPage() {
    const router = useRouter();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold text-green-700">Payment Successful ✅</h1>
            <p className="mt-4 text-gray-700">Thank you for your payment!</p>
            <button
                onClick={() => router.push("/")}
                className="mt-8 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
                Go to Home
            </button>
        </div>
    );
}


