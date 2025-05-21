// server.js
import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import Mesaj from './messageContent.js';

dotenv.config(); 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.post('/check-password', (req, res) => {
  const enteredPassword = req.body.password;
  const correctPassword = process.env.PASSWORD; 

  if (!enteredPassword) {
    return res
      .status(400)
      .json({ success: false, message: 'Şifre sağlanmadı.' });
  }

  if (enteredPassword === correctPassword) {
    return res.status(200).json({ success: true });
  } else {
    return res
      .status(401)
      .json({ success: false, message: 'Şifre yanlış.' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const unlockDate = new Date('2025-11-08T00:00:00Z');
app.get('/api/message', (req, res) => {
  if (new Date() >= unlockDate) {
    return res.status(200).json({ message: Mesaj });
  } else {
    return res
      .status(403)
      .json({
        error:
          'Rümü Sayfa Kaynağından Mesajı Görme Diye Kilitledim HİHİHİ',
      });
  }
});

app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} üzerinde çalışıyor.`);
});
