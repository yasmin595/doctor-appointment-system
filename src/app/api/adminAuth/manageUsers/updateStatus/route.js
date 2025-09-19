// src/app/api/adminAuth/manageUsers/updateStatus/route.js
import dbConnect from "@/database/dbConnect";
import { ObjectId } from "mongodb";

export async function PUT(req) {
  try {
    const db = await dbConnect();
    const collection = db.collection("test_user");

    const { userId, isVerified } = await req.json();

    if (!userId) {
      return new Response("User ID is required", { status: 400 });
    }

    const result = await collection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { isVerified } }
    );

    if (result.modifiedCount === 0) {
      return new Response("No changes made", { status: 200 });
    }

    return new Response(JSON.stringify({ message: "User updated successfully" }), { status: 200 });
  } catch (err) {
    console.error("Error updating user:", err);
    return new Response("Error updating user", { status: 500 });
  }
}
