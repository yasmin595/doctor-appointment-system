import dbConnect from "@/database/dbConnect";
import { ObjectId } from "mongodb";

export async function DELETE(req, { params }) {
  const { id } = params; // dynamic id from URL
  const db = await dbConnect();
  const result = await db.collection("test_user").deleteOne({ _id: new ObjectId(id) });

  if (result.deletedCount > 0) {
    return new Response(JSON.stringify({ message: "User deleted successfully" }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
  }
}
