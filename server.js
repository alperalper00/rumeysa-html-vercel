import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { MongoClient, ObjectId } from 'mongodb';
import Mesaj from './messageContent.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname));


const unlockDate = new Date('2025-11-08T00:00:00Z');
app.get('/api/message', (req, res) => {
  if (new Date() >= unlockDate) {
    return res.status(200).json({ message: Mesaj });
  } else {
    return res.status(403).json({ error: 'Rümü Sayfa Kaynağından Mesajı Görme Diye Kilitledim HİHİHİ' });
  }
});

/
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Sunucu http://localhost:${PORT} üzerinde çalışıyor.`));
