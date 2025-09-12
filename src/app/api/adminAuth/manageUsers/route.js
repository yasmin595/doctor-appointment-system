import dbConnect from "@/database/dbConnect";

export async function GET() {
  try {
    // dbConnect এখন পুরো database return করছে
    const db = await dbConnect(); 

    // collection access directly from db
    const collection = db.collection("test_user"); 

    // fetch all users, exclude password
    const users = await collection.find({}).project({ password: 0 }).toArray();

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (err) {
    return new Response("Error fetching users", { status: 500 });
  }
}
