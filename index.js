const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// POST verisini okuyabilmek için
app.use(bodyParser.urlencoded({ extended: false }));

// HTML dosyasını oku (sync okunuyor sadece örnek için)
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');

// Ana sayfada şifre formu göster
app.get('/', (req, res) => {
  res.send(`
    <h2>Giriş Yap</h2>
    <form method="POST" action="/login">
      <input type="password" name="password" placeholder="Şifre" required/>
      <button type="submit">Giriş</button>
    </form>
  `);
});

// Şifreyi kontrol et
app.post('/login', (req, res) => {
  const password = req.body.password;

  if (password === '1234') {  // buraya kendi şifreni koy
    res.send(html);  // şifre doğruysa HTML dosyasını gönder
  } else {
    res.send('Şifre yanlış! <a href="/">Tekrar deneyin</a>');
  }
});

window.onload = function () {
  const loginContainer = document.getElementById('login-container');
  const mainContent = document.getElementById('main-content');
  const passwordInput = document.getElementById('password-input');
  const submitBtn = document.getElementById('submit-btn');

  // Eğer domain localhost DEĞİLSE şifre sor
  if (!window.location.hostname.includes('localhost')) {
    loginContainer.style.display = 'block';
  } else {
    mainContent.style.display = 'block';
  }

  submitBtn.addEventListener('click', () => {
    const password = passwordInput.value;
    if (password === '1234') {
      loginContainer.style.display = 'none';
      mainContent.style.display = 'block';
    } else {
      alert('Şifre yanlış!');
    }
  });
};

app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});
