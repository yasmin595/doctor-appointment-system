import SSLCommerzPayment from "sslcommerz-lts";

export async function POST(req) {
    const { amount, name, email, phone } = await req.json();

    const store_id = process.env.SSLCOMMERZ_STORE_ID;
    const store_passwd = process.env.SSLCOMMERZ_STORE_PASS;
    const is_live = false; // change to true for live

    const tran_id = `TRX_${Date.now()}`; // unique transaction id
    const data = {
        total_amount: amount,
        currency: "BDT",
        tran_id,
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/sslcommerz/success`,
        fail_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/sslcommerz/fail`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/sslcommerz/cancel`,
        ipn_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/sslcommerz/ipn`,
        shipping_method: "Courier",
        product_name: "Consultation",
        product_category: "Service",
        product_profile: "general",
        cus_name: name,
        cus_email: email,
        cus_phone: phone,
        cus_add1: "Dhaka",
        cus_city: "Dhaka",
        cus_country: "Bangladesh",
        ship_name: name,
        ship_add1: "Dhaka",
        ship_city: "Dhaka",
        ship_country: "Bangladesh",
    };

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    const response = await sslcz.init(data);

    return new Response(JSON.stringify(response), { status: 200 });
}
