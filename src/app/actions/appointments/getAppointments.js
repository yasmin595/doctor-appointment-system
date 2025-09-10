"use server"
import dbConnect from "@/database/dbConnect";

export async function getAppointments(doctor_email){
 try {
    const db = await dbConnect();
    const appointmentCollection = db.collection("appointments");

    const appointments = await appointmentCollection
      .find({ "Doctor.Email": doctor_email })
      .sort({ Date: -1 })
      .toArray();

    return appointments.map((appointment) => ({
      ...appointment,
      _id: appointment._id.toString(),
      Date: appointment.Date?.toString(),
    }));
  } catch (error) {
    console.error("Error fetching doctor appointments:", error);
    throw new Error("Failed to fetch doctor appointments");
  }
}