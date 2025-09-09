import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url, process.env.NEXT_PUBLIC_BASE_URL);
        const tran_id = searchParams.get("tran_id");

        if (!tran_id) {
            return NextResponse.json({ error: "Transaction ID missing" }, { status: 400 });
        }

        const db = await dbConnect();
        const appointment = await db.collection("appointments").findOne({ transaction_Id: tran_id });

        if (!appointment) {
            return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
        }

        await db.collection("appointments").updateOne(
            { transaction_Id: tran_id },
            { $set: { isPaid: true, paymentStatus: "success", paymentDate: new Date() } }
        );

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        return NextResponse.redirect(`${baseUrl}/payment-success`);
    } catch (error) {
        console.error("Payment Success Error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
