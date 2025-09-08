import { NextResponse } from "next/server";

export async function POST(req) {
    const data = await req.formData();
    console.log("❌ Payment Failed:", Object.fromEntries(data));

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/payment-fail`);
}
