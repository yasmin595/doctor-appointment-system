"use server";

import dbConnect from "@/database/dbConnect";
import { ObjectId } from "mongodb";

export async function uploadPrescription(appointmentId, prescriptionUrl) {
  const db = await dbConnect();
  const appointmentCollection = db.collection("appointments");

  const result = await appointmentCollection.updateOne(
    { _id: new ObjectId(appointmentId) },
    { $set: { Prescription_url: prescriptionUrl } }
  );

  return { success: result.modifiedCount > 0 };
}
