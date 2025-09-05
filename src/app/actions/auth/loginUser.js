"use server";
import dbConnect, { collectionsNameObj } from "@/database/dbConnect";
import bcrypt from "bcrypt";

export const loginUser = async (payload) => {
  const { email, password } = payload;

  const userCollection = await dbConnect(collectionsNameObj.userCollection);
  const user = await userCollection.findOne({ email });

  if (!user) return null;

  const isPasswordOK = await bcrypt.compare(password, user.password);
  if (!isPasswordOK) return null;

  // Return user object compatible with NextAuth
  return {
    id: user._id.toString(),
    name: user.name || "No Name",
    email: user.email,
    image: user.image || null,
  };
};
