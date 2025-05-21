import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { MongoClient, ObjectId } from 'mongodb';
import Mesaj from './messageContent.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve all files from project root without folders
app.use(express.static(__dirname));

// MongoDB setup
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
let yazilarCollection;

async function connectDB() {
  try {
    await client.connect();
    const db = client.db();
    yazilarCollection = db.collection('yazilar');
    console.log('MongoDB bağlantısı başarılı.');
  } catch (err) {
    console.error('MongoDB bağlantı hatası:', err);
  }
}
connectDB();

// Unlock date endpoint
const unlockDate = new Date('2025-11-08T00:00:00Z');
app.get('/api/message', (req, res) => {
  if (new Date() >= unlockDate) {
    return res.status(200).json({ message: Mesaj });
  } else {
    return res.status(403).json({ error: 'Rümü Sayfa Kaynağından Mesajı Görme Diye Kilitledim HİHİHİ' });
  }
});

// Aşk Defteri endpoints
// Get all entries
app.get('/api/yazilar', async (req, res) => {
  try {
    const data = await yazilarCollection.find().sort({ tarih: -1 }).toArray();
    res.status(200).json(data);
  } catch (err) {
    console.error('Yazilar GET hatası:', err);
    res.status(500).json({ error: 'Veri alınırken hata oluştu.' });
  }
});

// Add new entry
app.post('/api/yazilar', async (req, res) => {
  const { yazar, metin } = req.body;
  if (!yazar || !metin) {
    return res.status(400).json({ error: 'Yazar ve metin gerekli.' });
  }
  const yeniYazi = { yazar, metin, tarih: new Date() };
  try {
    const result = await yazilarCollection.insertOne(yeniYazi);
    res.status(201).json({ _id: result.insertedId, ...yeniYazi });
  } catch (err) {
    console.error('Yazi ekleme hatası:', err);
    res.status(500).json({ error: 'Yazi kaydedilirken hata oluştu.' });
  }
});

// Delete an entry (optional)
app.delete('/api/yazilar/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await yazilarCollection.deleteOne({ _id: new ObjectId(id) });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Yazi silme hatası:', err);
    res.status(500).json({ error: 'Yazi silinirken hata oluştu.' });
  }
});

// Root route: serve index.html from project root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Sunucu http://localhost:${PORT} üzerinde çalışıyor.`));
