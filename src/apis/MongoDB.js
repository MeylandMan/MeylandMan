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

// Only auto-run when executed directly as a script (not when imported)
import { fileURLToPath } from 'url';
if (typeof window === 'undefined' && process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  run().catch(console.dir);
}

export async function getMongoDocument(query) {
  const uri = process.env.VITE_MONGODB_URI;
  if (!uri) throw new Error('VITE_MONGODB_URI not set');
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    await client.connect();
    const database = client.db(process.env.VITE_MONGODB_CLUSTER);
    const collection = database.collection(process.env.VITE_MONGODB_COLLECTION);
    const document = await collection.findOne(query);
    return document;
  } finally {
    await client.close();
  }
}

/**
 * Get all documents from a collection (server-side helper)
 * @param {string} collectionName
 * @param {object} query
 * @returns {Promise<Array>}
 */
export async function getCollectionDocuments(collectionName, query = {}) {
  const uri = process.env.VITE_MONGODB_URI;
  if (!uri) throw new Error('VITE_MONGODB_URI not set');

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    await client.connect();
    const database = client.db(process.env.VITE_MONGODB_CLUSTER);
    const collection = database.collection(collectionName);
    const documents = await collection.find(query).toArray();
    return documents;
  } finally {
    await client.close();
  }
}