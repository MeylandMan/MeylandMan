import { MongoClient, ServerApiVersion } from 'mongodb';

export async function run() {
  const uri = process.env.VITE_MONGODB_URI;
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    await client.connect();
    await client.db(process.env.VITE_MONGODB_CLUSTER).command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } finally {
    await client.close();
  }
}

// Only auto-run in Node (not when imported by browser code)
if (typeof window === 'undefined') {
  run().catch(console.dir);
}