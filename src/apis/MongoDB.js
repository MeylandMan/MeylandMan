import { MongoClient, ServerApiVersion } from 'mongodb';


export async function run() {

  const client = new MongoClient(process.env.VITE_MONGODB_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  
  try {
    await client.connect();
    console.log("Connected successfully to server");

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

// Only auto-run when executed directly as a script (not when imported)
import { fileURLToPath } from 'url';
if (typeof window === 'undefined' && process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  run().catch(console.dir);
}

/**
 * Get all documents from a collection (server-side helper)
 * @param {string} collectionName
 * @param {object} query
 * @returns {Promise<Array>}
 */
export async function getCollectionDocuments(collectionName, query = {}) {
  const uri = process.env.VITE_MONGODB_URI || process.env.MONGODB_URI;
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
    const database = client.db(process.env.VITE_MONGODB_COLLECTION);
    const collection = database.collection(collectionName);
    const documents = await collection.find(query).toArray();
    return documents;
  } finally {
    await client.close();
  }
}

/**
 * List collections and counts (dev helper)
 * @returns {Promise<Array<{name:string,count:number}>>}
 */
export async function listCollectionsInfo() {
  const uri = process.env.VITE_MONGODB_URI || process.env.MONGODB_URI;
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
    const database = client.db(process.env.VITE_MONGODB_COLLECTION);
    const collections = await database.listCollections().toArray();
    const results = [];
    for (const c of collections) {
      const count = await database.collection(c.name).countDocuments();
      results.push({ name: c.name, count });
    }
    return results;
  } finally {
    await client.close();
  }
}