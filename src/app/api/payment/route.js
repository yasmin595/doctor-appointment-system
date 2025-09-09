import { NextResponse } from "next/server";
import axios from "axios";
import dbConnect from "@/lib/dbConnect";

export async function POST(req) {
    try {
        const data = await req.json();
        const db = await dbConnect();

        // Save initial appointment
        const result = await db.collection("appointments").insertOne({
            ...data,
            isPaid: false,
            paymentStatus: "pending",
            createdAt: new Date(),
        });

        // Generate a transaction ID
        const tran_id = "TXN_" + Date.now();

        // Update the appointment with transaction ID
        await db.collection("appointments").updateOne(
            { _id: result.insertedId },
            { $set: { transaction_Id: tran_id } }
        );

        // Prepare SSLCommerz payload
        const payload = {
            store_id: process.env.SSL_STORE_ID,
            store_passwd: process.env.SSL_STORE_PASS,
            total_amount: data.Fee,
            currency: "BDT",
            tran_id,
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/success?tran_id=${tran_id}`,
            fail_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/fail?tran_id=${tran_id}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/cancel?tran_id=${tran_id}`,
            cus_name: data.Patient?.Name || "Customer",
            cus_email: data.Patient?.Email || "customer@example.com",
            cus_add1: "Dhaka",
            cus_city: "Dhaka",
            cus_country: "Bangladesh",
            cus_phone: data.Phone || "0123456789",
            product_name: data.Doctor?.Name || "Doctor Appointment",
            product_category: "Healthcare",
            product_profile: "general",
        };

        const response = await axios.post(
            process.env.SSL_SESSION_API,
            new URLSearchParams(payload).toString(),
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );

        const resultData = response.data;

        if (resultData?.GatewayPageURL) {
            return NextResponse.json({ url: resultData.GatewayPageURL });
        }

        return NextResponse.json({ error: "Failed to initiate payment" }, { status: 400 });
    } catch (error) {
        console.error("Payment Init Error:", error.response?.data || error.message);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
