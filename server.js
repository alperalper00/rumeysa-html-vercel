import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import Mesaj from './messageContent.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const unlockDate = new Date('2025-11-08T00:00:00Z');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/message', (req, res) => {
  if (new Date() >= unlockDate) {
    return res.status(200).json({ message: Mesaj });
  } else {
    return res.status(403).json({ error: `Rümü Sayfa Kaynağından Mesajı Görme Diye Kilitledim HİHİHİ` });

  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Sunucu http://localhost:${PORT} üzerinde çalışıyor.`)
);



