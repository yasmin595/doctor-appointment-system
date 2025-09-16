import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

async function handleSuccess(req) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://appointment-management-system-black.vercel.app";
        let tran_id;

        if (req.method === "POST") {
            const formData = await req.formData(); // SSLCommerz sends x-www-form-urlencoded
            tran_id = formData.get("tran_id");
        } else {
            const { searchParams } = new URL(req.url, baseUrl);
            tran_id = searchParams.get("tran_id");
        }

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

        // Redirect user to frontend page
        return NextResponse.redirect(`${baseUrl}/payment-success`);
    } catch (error) {
        console.error("Payment Success Error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

// Handle both GET and POST
export async function GET(req) {
    return handleSuccess(req);
}

export async function POST(req) {
    return handleSuccess(req);
}
