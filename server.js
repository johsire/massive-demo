const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');

const app = express();
app.use(bodyParser.json());

const port = 3000;

app.set('vipi', 'rasjoh');

app.get('/', (req, res) => {
  const mySetting = req.app.get('vipi')
  res.send('massive-demo' + mySetting);
});

app.get('/incidents', (req, res) => {
  res.send([]);
});

app.post('/incidents', (req, res) => {
  res.send({id: 123});
});

app.listen(port, () => {
  console.log('Started server on port', port);
});
