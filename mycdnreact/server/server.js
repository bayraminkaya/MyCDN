// server/server.js
const express = require('express');
const app = express();
const port = 3001; // İstediğiniz bir port numarasını seçebilirsiniz

// Örnek dosya listesi
const userFiles = [
  { id: 1, name: 'dosya1.txt', size: 1024 },
  { id: 2, name: 'dosya2.jpg', size: 2048 },
  // ... Diğer dosyalar
];

app.get('/api/user/files', (req, res) => {
  res.json(userFiles);
});

app.listen(port, () => {
  console.log(`Server çalışıyor: http://localhost:${port}`);
});
