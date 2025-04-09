import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Add a global type declaration for TypeScript
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

async function connectWithRetry(
  retries = 5,
  delay = 3000
): Promise<MongoClient> {
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`Attempting to connect to MongoDB (Attempt ${i + 1})...`);
      client = new MongoClient(uri, options);
      return await client.connect();
    } catch (error) {
      console.error("Failed to connect to MongoDB:", error);
      if (i < retries - 1) {
        console.log(`Retrying in ${delay / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        throw new Error(
          "Exceeded maximum retry attempts to connect to MongoDB"
        );
      }
    }
  }
  throw new Error("Failed to connect to MongoDB after retries");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = connectWithRetry();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = connectWithRetry();
}

// if (process.env.NODE_ENV === "development") {
//   // In development mode, use a global variable to preserve the MongoClient across module reloads
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, options);
//     global._mongoClientPromise = client.connect();
//   }
//   clientPromise = global._mongoClientPromise;
// } else {
//   // In production mode, it's best to not use a global variable
//   client = new MongoClient(uri, options);
//   clientPromise = client.connect();
// }

export default clientPromise;
