import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getCollectionDocuments, listCollectionsInfo } from '../src/apis/MongoDB.js';

dotenv.config();

const corsOptions = {
  origin: [process.env.CORS_ORIGIN || 'https://localhost:5173'],
  optionsSuccessStatus: 200
};

const app = express();
app.use(express.json());

app.get('/api/doc', async (req, res) => {
  const collectionName = req.query.collection;
  const queryParam = req.query.query;

  if (!collectionName) {
    return res.status(400).json({ ok: false, error: 'Missing collection query parameter' });
  }

  let query = {};
  if (queryParam) {
    try {
      query = JSON.parse(queryParam);
    } catch (err) {
      return res.status(400).json({ ok: false, error: 'Invalid JSON in query parameter' });
    }
  }

  try {
    const documents = await getCollectionDocuments(collectionName, query);
    res.json({ ok: true, documents });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Dedicated endpoint for collections

app.get('/api/leftNavLinks', async (req, res) => {
  try {
    const docs = await getCollectionDocuments('leftNavLinks');
    res.json(docs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.get('/api/formations', async (req, res) => {
  try {
    const docs = await getCollectionDocuments('formations');
    res.json(docs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.get('/api/experiences', async (req, res) => {
  try {
    const docs = await getCollectionDocuments('experiences');
    res.json(docs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.get('/api/projects', async (req, res) => {
  try {
    const docs = await getCollectionDocuments('projects');
    res.json(docs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.get('/api/devTools', async (req, res) => {
  try {
    const docs = await getCollectionDocuments('devTools');
    res.json(docs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.get('/api/devSkills', async (req, res) => {
  try {
    const docs = await getCollectionDocuments('devSkills');
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
