const express = require('express');
const cors = require('cors');

const app = express();
const port = 7148;

// CORS middleware'ini etkinleştir
app.use(cors());

const userFiles = [
  { id: 1, name: 'dosya1.txt', size: 1024 },
  { id: 2, name: 'dosya2.jpg', size: 2048 },
  // ... Diğer dosyalar
];

app.get('/api/users', (req, res) => {
  res.json(userFiles);
});

app.listen(port, () => {
  console.log(`Server çalışıyor: http://localhost:${port}`);
});
