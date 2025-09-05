
// ✅ GET static users (mock data)
// ✅ Static users API
export async function GET() {
const users = [
  { _id: "1", name: "Md. Royel Ali", email: "royel@example.com", role: "admin" },

  { _id: "2", name: "John Doe", email: "john@example.com", role: "patient" },
  { _id: "3", name: "Sarah Khan", email: "sarah@example.com", role: "patient" },
  { _id: "4", name: "Michael Lee", email: "michael@example.com", role: "patient" },
  { _id: "5", name: "Emily Davis", email: "emily@example.com", role: "patient" },
  { _id: "6", name: "David Kim", email: "david@example.com", role: "patient" },

  { _id: "7", name: "Jane Smith", email: "jane@example.com", role: "doctor", status: "unverified" },
  { _id: "8", name: "Dr. Robert Brown", email: "robert@example.com", role: "doctor", status: "unverified" },
  { _id: "9", name: "Dr. Olivia Green", email: "olivia@example.com", role: "doctor", status: "unverified" },
  { _id: "10", name: "Dr. Ethan White", email: "ethan@example.com", role: "doctor", status: "unverified" },
  { _id: "11", name: "Dr. Sophia Black", email: "sophia@example.com", role: "doctor", status: "unverified" },
  { _id: "12", name: "Dr. Liam Wilson", email: "liam@example.com", role: "doctor", status: "unverified" },
  { _id: "13", name: "Dr. Ava Johnson", email: "ava@example.com", role: "doctor", status: "unverified" },
  { _id: "14", name: "Dr. Noah Martin", email: "noah@example.com", role: "doctor", status: "unverified" },
  { _id: "15", name: "Dr. Mia Thompson", email: "mia@example.com", role: "doctor", status: "unverified" },
];


  return Response.json(users);
}



// ✅ GET all users
// export async function GET() {
//   try {
//     const collection = await dbConnect("users");
//     const users = await collection.find({}).project({ password: 0 }).toArray(); // exclude password

//     return Response.json(users);
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     return Response.json({ error: "Failed to fetch users" }, { status: 500 });
//   }
// }