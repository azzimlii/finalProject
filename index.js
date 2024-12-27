const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'finalProject',
});

connection.connect((err) => {
  if (!err) {
    console.log('SUCCESS');
  } else {
    console.log('Error', err.message);
  }
});

app.get('/coins', (req, res) => {
  connection.query('SELECT * FROM coinInfo', (err, rows) => {
    if (err) {
      res.status(500).json({ message: "xeta", error: err });
    } else {
      res.json(rows);
    }
  });
});

app.get('/coins/:id', (req, res) => {
  const coinId = req.params.id;
  connection.query('SELECT * FROM coinInfo WHERE coin_id = ?', [coinId], (err, rows) => {
    if (err) {
      res.status(500).json({ message: "xeta", error: err });
    } else if (rows.length === 0) {
      res.status(404).json({ message: 'not found' });
    } else {
      res.json(rows[0]);
    }
  });
});

app.delete('/coins/:id', (req, res) => {
  const { id } = req.params;
  const coinIndex = coins.findIndex((coin) => coin.coin_id === parseInt(id));
  if (coinIndex !== -1) {
    coins.splice(coinIndex, 1);
    res.status(200).send({ message: 'Coin silindi.' });
  } else {
    res.status(404).send({ message: 'Coin tapılmadı.' });
  }
});

app.post('/coins', (req, res) => {
  const { name, description, obverseInfo, reverseInfo, issuingCountry, composition, quality, denomination, year, weight, price, image, typeID, image2 } = req.body;
  const query = 'INSERT INTO coins (name, description, obverseInfo, reverseInfo,issuingCountry,composition,quality,denomination,year,weight,price,image,typeID,image2) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)';
  connection.query(query, [name, description, obverseInfo, reverseInfo, issuingCountry, composition, quality, denomination, year, weight, price, image, typeID, image2], (err, result) => {
    if (err) {
      res.status(500).json({ message: "xeta", error: err });
    } else {
      res.json({ message: 'post olundu', coinId: result.insertId });
    }
  });
});

app.put('/coins/:id', (req, res) => {
  const coinId = req.params.id;
  const { coin_name, description, obverseInfo, reverseInfo, issuingCountry, composition, quality, denomination, year, weight, price, image } = req.body;
  const query = 'UPDATE coinInfo SET coin_name = ?, description = ?, obverseInfo = ?, reverseInfo = ?, issuingCountry = ?, composition = ?, quality = ?, denomination = ?, year = ?, weight = ?, price = ?, image = ? WHERE coin_id = ?';
  connection.query(query, [coin_name, description, obverseInfo, reverseInfo, issuingCountry, composition, quality, denomination, year, weight, price, image, coinId], (err, result) => {
    if (err) {
      res.status(500).json({ message: "Xəta", error: err });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Tapılmadı' });
    } else {
      res.json({ message: 'Məlumat yeniləndi', updatedCoin: { coin_id: coinId, coin_name, description, obverseInfo, reverseInfo, issuingCountry, composition, quality, denomination, year, weight, price, image } });
    }
  });
});

app.get('/admin', (req, res) => {
  connection.query('SELECT * FROM admin', (err, rows) => {
    if (err) {
      res.status(500).json({ message: "xeta", error: err });
    } else {
      res.json(rows);
    }
  });
});
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  const query = "INSERT INTO admin (name, email, password) VALUES (?, ?, ?)";
  connection.query(query, [name, email, password], (err, result) => {
    if (err) {
      console.error("Verilənlər bazasına əlavə edərkən səhv baş verdi: ", err);
      return res.status(500).json({ message: "Qeydiyyat uğursuz oldu." });
    }
    res.status(201).json({ message: "Qeydiyyat uğurla tamamlandı!" });
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM admin WHERE email = ?";
  connection.query(query, [email], (err, results) => {
    if (err) {
      console.error("Verilənlər bazasında səhv baş verdi: ", err);
      return res.status(500).json({ message: "Daxil olma zamanı səhv baş verdi." });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "İstifadəçi tapılmadı." });
    }
    const admin = results[0];
    if (password !== admin.password) {
      return res.status(401).json({ message: "Şifrə səhvdir." });
    }
    res.status(200).json({ message: "Daxil olma uğurla tamamlandı!" });
  });
});
app.listen(3000, () =>
  console.log(`App listening at port 3000`)
);