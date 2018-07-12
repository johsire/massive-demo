const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');

require('dotenv').config();

const connectionString = 


const app = express();
app.use(bodyParser.json());

const port = 3000;

// 'vipi' is a global variable for all my routes
app.set('vipi', 'rasjoh');

app.get('/', (req, res) => {
  const db = req.app.get('db')
  db.getAllInjuries().then(injuries => {
    res.send(injuries);
  })
});

app.get('/incidents', (req, res) => {
  res.send([]);
});

app.post('/incidents', (req, res) => {
  res.send({id: 123});
});

massive(connectionString).then(connection => {
  app.set('db', connection);
})

app.listen(port, () => {
  console.log('Started server on port', port);
});
