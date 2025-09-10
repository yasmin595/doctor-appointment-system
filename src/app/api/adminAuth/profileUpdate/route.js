import dbConnect from "@/database/dbConnect";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";

export async function PUT(req) {
  try {
    const body = await req.json();
    const { _id, newPassword, currentPassword, ...updateFields } = body;

    // Validate _id
    if (!_id || !ObjectId.isValid(_id)) {
      return new Response(JSON.stringify({ message: "Invalid user _id" }), { status: 400 });
    }

    const db = await dbConnect();
    const usersCol = db.collection("test_user");

    // Fetch the current user by _id
    const user = await usersCol.findOne({ _id: new ObjectId(_id) });

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    // Handle password update only if newPassword provided
    if (newPassword && newPassword.trim() !== "") {
      // If user has a password, verify currentPassword
      if (user.password && currentPassword) {
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
          return new Response(
            JSON.stringify({ message: "Current password is incorrect" }),
            { status: 400 }
          );
        }
      }
      // Hash the new password
      updateFields.password = await bcrypt.hash(newPassword, 10);
    }

    // Use updateOne instead of findOneAndUpdate for better compatibility
    const result = await usersCol.updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateFields }
    );

    // Check if the update was successful
    if (result.modifiedCount === 0 && result.matchedCount === 0) {
      return new Response(
        JSON.stringify({ message: "User not found or no changes made" }),
        { status: 404 }
      );
    }

    if (result.modifiedCount === 0) {
      return new Response(
        JSON.stringify({ message: "No changes were made to the user" }),
        { status: 200 }
      );
    }

    // Fetch the updated user data to return
    const updatedUser = await usersCol.findOne(
      { _id: new ObjectId(_id) },
      { projection: { password: 0 } } // exclude password
    );

    // Return updated user
    return new Response(JSON.stringify(updatedUser), { status: 200 });

  } catch (err) {
    console.error("Error updating profile:", err);
    return new Response(
      JSON.stringify({ message: "Error updating profile", error: err.message }),
      { status: 500 }
    );
  }
}