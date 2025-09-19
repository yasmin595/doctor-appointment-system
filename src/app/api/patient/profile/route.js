import dbConnect from "@/database/dbConnect";
import { getServerSession } from "next-auth"; 

export async function GET(req) {
  try {
    const session = await getServerSession(); 
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const db = await dbConnect();
    const collection = db.collection("test_user");

    
    const patient = await collection.findOne(
      { email: session.user.email },
      { projection: { password: 0 } } 
    );

    if (!patient) {
      return new Response("Patient not found", { status: 404 });
    }

    return new Response(JSON.stringify(patient), { status: 200 });
  } catch (err) {
    console.error("Error fetching patient profile:", err);
    return new Response("Error fetching profile", { status: 500 });
  }
}
