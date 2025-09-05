"use server";

import dbConnect, { collectionsNameObj } from "@/database/dbConnect";
import bcrypt from "bcrypt";

export const registerUser = async (payload) => {
  try {
    const { email, password, name } = payload;

    // Basic validation
    if (!email || !password) {
      return { success: false, message: "Email and password are required" };
    }

    const userCollection = await dbConnect(collectionsNameObj.userCollection);

    // Check if user already exists
    const existingUser = await userCollection.findOne({ email });
    if (existingUser) {
      return { success: false, message: "User already exists" };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Prepare user document
    const newUser = {
      email,
      password: hashedPassword,
      name: name || "No Name",
      createdAt: new Date(),
    };

    // Insert into DB
    const result = await userCollection.insertOne(newUser);

    // Return success with insertedId
    return {
      success: true,
      userId: result.insertedId.toString(),
    };
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, message: "Registration failed" };
  }
};
