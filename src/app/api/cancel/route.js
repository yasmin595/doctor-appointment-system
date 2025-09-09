import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const tran_id = searchParams.get("tran_id");

    if (!tran_id) return NextResponse.json({ error: "Transaction ID missing" }, { status: 400 });

    const db = await dbConnect();
    await db.collection("appointments").updateOne(
        { transaction_Id: tran_id },
        { $set: { paymentStatus: "canceled", updatedAt: new Date() } }
    );

    return NextResponse.redirect("/payment-canceled");
}
