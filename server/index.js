import express from 'express';
import dotenv from 'dotenv';
import { getMongoDocument, getCollectionDocuments } from '../src/apis/MongoDB.js';

dotenv.config();

const app = express();
app.use(express.json());

// Generic single-document endpoint
app.get('/api/doc', async (req, res) => {
  try {
    const { field, value } = req.query;
    const query = field && value ? { [field]: value } : {};

    const doc = await getMongoDocument(query);
    if (!doc) return res.status(404).json({ ok: false, message: 'Not found' });

    res.json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Dedicated endpoint for leftNavLinks collection
app.get('/api/leftNavLinks', async (req, res) => {
  try {
    const collectionName = 'leftNavLinks';
    const docs = await getCollectionDocuments(collectionName);
    res.json(docs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Dev-only debug endpoint: list collections and counts
app.get('/api/debug', async (req, res) => {
  try {
    const info = await listCollectionsInfo();
    res.json({ ok: true, collections: info });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API server listening on ${port}`));
