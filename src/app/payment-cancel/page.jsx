// app/payment-cancel/page.jsx
"use client";
import { useRouter } from "next/navigation";

export default function PaymentCancelPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50">
            <h1 className="text-3xl font-bold text-yellow-700">Payment Cancelled ⚠️</h1>
            <p className="mt-4 text-gray-700">
                You cancelled the payment. You can try again anytime.
            </p>

            <button
                onClick={() => router.push("/book-appointment")}
                className="mt-8 px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
            >
                Retry Payment
            </button>
        </div>
    );
}
