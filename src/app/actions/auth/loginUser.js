"use server";
import dbConnect, { collectionsNameObj } from "@/database/dbConnect";
import bcrypt from "bcrypt";

export const loginUser = async (payload) => {
  const { email, password, role } = payload;

  //const userCollection = await dbConnect(collectionsNameObj.userCollection);
  const db = await dbConnect();
  const userCollection = db.collection("test_user");
  const user = await userCollection.findOne({ email, role });
  //console.log("Found user:", user);

  if (!user) return null;

  const isPasswordOK = await bcrypt.compare(password, user.password);
  if (!isPasswordOK) return null;

  return user;
};
