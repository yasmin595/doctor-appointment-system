import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { symptoms } = await req.json();

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPEN_ROUTER_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: `Act as a helpful health assistant. Analyze the following symptoms and provide a JSON response with the following structure:
                                             condition : string
                                             severity : low | medium | high
                                             confidence: number
                                             symptoms: string
                                             recommendations: string
                                             recommended_specialist_department: ["string"]

    The severity should be based on the urgency of the symptoms. 
    The condition should be a likely diagnosis. 
    The confidence should be a number from 0 to 100. 
    The symptoms array should list the key symptoms identified from the user's input. 
    The recommended_specialist_department should be a always a list of all the possible doctor specialty departments to visit that could help the user.
    The recommendations should be actionable advice. 
    Do not provide any other text besides the JSON object.
    if you are unsure, provide your best guess based on the symptoms provided.
    if user tells anything but symptoms and sickness then donot respond about that, respond with JSON with as your best guess to the condition as it is not related to health or sickness.

    Symptoms: ${symptoms}`
                    },
                ],
                temperature: 0.7
            })
        });

        const data = await response.json();
        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json({ error: "AI request failed", details: err.message }, { status: 500 });
    }
}
