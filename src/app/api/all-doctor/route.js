import dbConnect from "@/database/dbConnect";

export async function GET() {
  try {
    const db = await dbConnect(); 
    const collection = db.collection("test_user");

    // role = "Doctor" filter + password hide
    const doctors = await collection
      .find({ role: "Doctor" })
      .project({ password: 0 })
      .toArray();

    // terminal check
    console.log("Fetched doctors:", doctors);

    return new Response(JSON.stringify(doctors), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error fetching doctors:", err);
    return new Response(
      JSON.stringify({ error: "Error fetching doctors" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
