export async function POST(req) {
    try {
        const tranId = "TXN_" + Date.now();

        const paymentData = {
            store_id: process.env.SSL_STORE_ID,
            store_passwd: process.env.SSL_STORE_PASS,
            total_amount: 1000,
            currency: "BDT",
            tran_id: tranId,
            success_url: "http://localhost:3000/api/payment-success",
            fail_url: "http://localhost:3000/api/payment-fail",
            cancel_url: "http://localhost:3000/api/payment-cancel",
            cus_name: "Test Customer",
            cus_email: "test@example.com",
            cus_add1: "Dhaka",
            cus_phone: "01700000000",
            product_category: "Service",
            product_profile: "general",
        };

        const response = await fetch(process.env.SSL_SESSION_API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(paymentData),
        });

        const data = await response.json();
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        console.error("SSLCommerz Init Error:", error);
        return new Response(
            JSON.stringify({ error: "Payment initiation failed" }),
            { status: 500 }
        );
    }
}
