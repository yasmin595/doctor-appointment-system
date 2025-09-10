import dbConnect from "@/database/dbConnect";

export async function GET() {
  try {
    const db = await dbConnect(); 
    const doctorsCollection = db.collection("doctors"); 

    const doctors = await doctorsCollection.find({}).toArray();

    return new Response(JSON.stringify(doctors), { status: 200 });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return new Response("Error fetching doctors", { status: 500 });
  }
}
