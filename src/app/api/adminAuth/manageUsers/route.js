
// ✅ GET all users

export async function GET() {
  try {
    const collection = await dbConnect("users");
    const users = await collection.find({}).project({ password: 0 }).toArray(); // exclude password

    return Response.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return Response.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

