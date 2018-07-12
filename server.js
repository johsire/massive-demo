const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
require('dotenv').config()


const app = express();
massive( process.env.CONNECTION_STRING ).then( dbInstance => app.set('db', dbInstance) );
app.use(bodyParser.json());


// 'vipi' is a global variable for all my routes
app.set('vipi', 'rasjoh');

app.get('/', (req, res) => {
  const db = req.app.get('db')
  db.getAllInjuries().then(injuries => {
    res.send(injuries);
  })
});

app.get('/incidents', (req, res) => {
  const db = req.app.get('db');
  const state = req.query.state;
  // console.log(state);

  if (state) {
    db.getIncidentsByState({state: state}).then(incidents => {
      res.send(incidents);
    })
  }
  else {
    db.getAllIncidents().then(incidents => {
      res.send(incidents);
    })
  }
});

app.post('/incidents', (req, res) => {
  const db = req.app.get('db');
  const incident = req.body;
  db.createIncident(incident).then(result  =>{
  res.send(result);
 });
});

// massive(CONNECTION_STRING).then(connection => {
//   app.set('db', connection);
// })


const port = 3000;

app.listen(port, () => {
  console.log('Started server on port', port);
});
