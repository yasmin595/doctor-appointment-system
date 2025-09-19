// app/payment-fail/page.jsx
"use client";
import { useRouter } from "next/navigation";

export default function PaymentFailPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-red-50">
            <h1 className="text-3xl font-bold text-red-700">Payment Failed ❌</h1>
            <p className="mt-4 text-gray-700">
                Your payment could not be completed. Please try again.
            </p>

            <div className="mt-8 flex gap-4">
                <button
                    onClick={() => router.push("/")}
                    className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                >
                    Go to Home
                </button>
                <button
                    onClick={() => router.push("/book-appointment")}
                    className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                    Retry Payment
                </button>
            </div>
        </div>
    );
}
