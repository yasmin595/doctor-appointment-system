import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        const body = await req.json()
        const tran_id = "TXN_" + Date.now()

        const paymentData = {
            store_id: process.env.SSL_STORE_ID,
            store_passwd: process.env.SSL_STORE_PASS,
            total_amount: body.amount || 1000,
            currency: "BDT",
            tran_id,
            success_url: "http://localhost:3000/api/payment/success",
            fail_url: "http://localhost:3000/api/payment/fail",
            cancel_url: "http://localhost:3000/api/payment/cancel",
            cus_name: body.cus_name || "Test Customer",
            cus_email: body.cus_email || "test@example.com",
            cus_add1: "Dhaka",
            cus_phone: body.cus_phone || "01700000000",
            product_category: "Service",
            product_profile: "general",
        }

        const response = await fetch(process.env.SSL_SESSION_API, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(paymentData).toString(),
        })

        const result = await response.json()

        if (result?.GatewayPageURL) {
            return NextResponse.json(result)
        } else {
            return NextResponse.json(
                { error: "Failed to create payment session", details: result },
                { status: 400 }
            )
        }
    } catch (error) {
        console.error("SSLCommerz Init Error:", error)
        return NextResponse.json(
            { error: "Payment initiation failed", message: error.message },
            { status: 500 }
        )
    }
}
