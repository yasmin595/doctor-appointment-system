import dbConnect from "@/database/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions"; // ✅ reuse same options as your NextAuth config

export async function GET(req) {
  try {
    // ✅ Get logged-in session
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    const db = await dbConnect();
    const usersCol = db.collection("test_user");

    // ✅ Fetch the logged-in admin by email
    const admin = await usersCol.findOne(
      { email: session.user.email, role: "Admin" },
      { projection: { password: 0 } } // exclude password field
    );

    if (!admin) {
      return new Response(JSON.stringify({ message: "Admin not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(admin), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: "Error fetching admin" }), { status: 500 });
  }
}
