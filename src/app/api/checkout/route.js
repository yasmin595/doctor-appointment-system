// import { NextResponse } from "next/server";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export async function POST(req) {
//     try {
//         const { items } = await req.json();

//         // Create Checkout Session
//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ["card"],
//             line_items: items.map(item => ({
//                 price_data: {
//                     currency: "usd",
//                     product_data: {
//                         name: item.name,
//                     },
//                     unit_amount: item.price * 100, // price in cents
//                 },
//                 quantity: item.quantity,
//             })),
//             mode: "payment",
//             success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
//             cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
//         });

//         return NextResponse.json({ id: session.id });
//     } catch (err) {
//         return NextResponse.json({ error: err.message }, { status: 500 });
//     }
// }
