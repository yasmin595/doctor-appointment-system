export async function POST(req) {
    const data = await req.json();
    console.log("Payment success:", data);

    // TODO: You can validate transaction here using SSLCommerz validate API
    return new Response(JSON.stringify({ message: "Payment success received" }), { status: 200 });
}
