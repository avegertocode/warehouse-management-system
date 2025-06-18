const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'procurement' });

app.post('/submit', (req, res) => {
  const { requester_name, item_name, quantity, department } = req.body;
  db.query('INSERT INTO requisitions SET ?', { requester_name, item_name, quantity, department }, (err) => {
    if (err) return res.status(500).json({ message: 'Error' });
    res.json({ message: 'Requisition Submitted' });
  });
});

app.get('/requisitions', (req, res) => {
  db.query('SELECT * FROM requisitions', (err, results) => {
    if (err) return res.status(500).json({ message: 'Error' });
    res.json(results);
  });
});

app.post('/approve/:id', (req, res) => {
  const id = req.params.id;
  db.query('UPDATE requisitions SET status="Approved" WHERE id=?', [id], (err) => {
    if (err) return res.status(500).json({ message: 'Error' });
    res.json({ message: 'Approved' });
  });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
