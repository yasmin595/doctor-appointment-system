
'use server'
export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    const body = await req.json();
    await dbConnect();

    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      body,
      { new: true }
    );

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: "Error updating profile" }), { status: 500 });
  }
}