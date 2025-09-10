import dbConnect from "@/database/dbConnect";

export async function GET() {
  try {
    const db = await dbConnect();
    const usersCol = db.collection("test_user");

    // fetch only admins, exclude password
    const admins = await usersCol
      .find({ role: "Admin" })
      .project({ password: 0 })
      .toArray();

    return new Response(JSON.stringify(admins), { status: 200 });
  } catch (err) {
    console.error("Error fetching admins:", err);
    return new Response(JSON.stringify({ message: "Error fetching admins" }), { status: 500 });
  }
}
