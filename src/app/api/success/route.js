import { NextResponse } from "next/server";

export async function POST(req) {
    const data = await req.formData();
    console.log("✅ Payment Success:", Object.fromEntries(data));

    // You can save this data in your DB (MongoDB / Prisma etc.)
    // Example: transactionId, status, amount

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/payment-success`);
}
