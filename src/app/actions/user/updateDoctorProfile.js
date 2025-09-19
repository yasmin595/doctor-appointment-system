"use server"

import dbConnect from "@/database/dbConnect";
import { ObjectId } from "mongodb";

export async function updateDoctorProfile(userId, updates) {
  const db = await dbConnect();
  const userCollection = db.collection("test_user");

  const res = await userCollection.updateOne(
    { _id: new ObjectId(userId) },
    { $set: updates }
  );

  return { success: res.modifiedCount > 0 };
}
