// import { MongoClient, ServerApiVersion } from "mongodb";

// export const collectionsNameObj = {
//   userCollection: "test_user",
// };

// let client;
// let db;

// export default async function dbConnect(collectionName) {
//   if (!client) {
//     const uri = process.env.MONGODB_URI;
//     client = new MongoClient(uri, {
//       serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//       },
//     });
//     await client.connect(); // <-- এখানে connect করতে হবে
//     db = client.db(process.env.DB_NAME);
//   }

//   return db.collection(collectionName);
// }
import { MongoClient, ServerApiVersion } from "mongodb";

//export const collectionsNameObj = { userCollection: "test_user" };

      let client;
      let db;

export default async function dbConnect() {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI, {
      serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
    });
    await client.connect();
    db = client.db(process.env.DB_NAME);
  }
  //return db.collection(collectionName);
  return db;
}

