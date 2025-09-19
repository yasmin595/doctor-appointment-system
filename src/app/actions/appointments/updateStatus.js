"use server";

import dbConnect from "@/database/dbConnect";
import { ObjectId } from "mongodb";

export async function updateAppointmentStatus(appointmentId, newStatus) {
    const db = await dbConnect();
    const appointmentCollection = db.collection("appointments");

    const result = await appointmentCollection.updateOne(
        { _id: appointmentId },
        { $set: { Status: newStatus } }
    );
    console.log(result)

    return { success: result.modifiedCount > 0};
}
