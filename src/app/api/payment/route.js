import { NextResponse } from "next/server";
import axios from "axios";
import dbConnect from "@/lib/dbConnect";
// import dbConnect from "@/database/dbConnect";

export async function POST(req) {
    try {
        const data = await req.json();
        const db = await dbConnect();

        const { name, email, phone, amount, doctorId, doctorName } = data;
        const tran_id = "TXN_" + Date.now();

        // Save transaction (Pending)
        await db.collection("transactions").insertOne({
            tran_id,
            name,
            email,
            phone,
            amount,
            doctorId,
            doctorName,
            status: "Pending",
            createdAt: new Date(),
        });

        const payload = {
            store_id: process.env.SSL_STORE_ID,
            store_passwd: process.env.SSL_STORE_PASS,
            total_amount: amount,
            currency: "BDT",
            tran_id,
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/success`,
            fail_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/fail`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/cancel`,
            cus_name: name,
            cus_email: email,
            cus_add1: "Dhaka",
            cus_city: "Dhaka",
            cus_country: "Bangladesh",
            cus_phone: phone,
            product_name: doctorName || "Doctor Appointment",
            product_category: "Healthcare",
            product_profile: "general",
        };

        const response = await axios.post(
            process.env.SSL_SESSION_API,
            new URLSearchParams(payload).toString(),
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );

        const result = response.data;

        if (result?.GatewayPageURL) {
            return NextResponse.json({ url: result.GatewayPageURL });
        }

        return NextResponse.json({ error: "Failed to initiate payment" }, { status: 400 });
    } catch (error) {
        console.error("Payment Init Error:", error.response?.data || error.message);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
