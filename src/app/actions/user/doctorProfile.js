"use server"

import dbConnect from "@/database/dbConnect";

export const doctorProfile = async (email, role) => {
    const db = await dbConnect();
    const userCollection = db.collection("test_user");
    const user = await userCollection.findOne({ email, role });
    return {
        ...user,
        _id: user._id.toString(),
        createdAt: user.createdAt?.toString(),
    };
}