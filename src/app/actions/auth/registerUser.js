"use server";

import dbConnect from "@/database/dbConnect";
import bcrypt from "bcrypt";

export const registerUser = async (payload) => {
  try {
    const { email, password, role } = payload;

    if (!email || !password) {
      return { success: false, message: "Email and password are required" };
    }

    const db = await dbConnect();
    const userCollection = db.collection("test_user");

    const existingUser = await userCollection.findOne({ email });
    if (existingUser) {
      return { success: false, message: "User already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser;

    if (role === "Doctor") {
      newUser = {
        ...payload,
        password: hashedPassword,
        consultationFee: 0,
        rating: 0,
        certificates: payload.certificates || [],
        availability: {},
        appointments: [],
        createdAt: new Date(),
      };
    } else {
      newUser = {
        ...payload,
        password: hashedPassword,
        createdAt: new Date(),
      };
    }

    const result = await userCollection.insertOne(newUser);

    return {
      success: true,
      userId: result.insertedId.toString(),
    };
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, message: "Registration failed" };
  }
};
