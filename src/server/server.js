require('dotenv').config();

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const PORT = 8080;

projectData = {};

const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

app.use(express.static('dist'));

app.get('/', function (req, res) {
  res.sendFile('dist/index.html');
});

app.get('/travel', (req, res) => {
  res.send(projectData);
});

app.post('/travel', (req, res) => {
  projectData = req.body;
  res.send(projectData);
});

// designates what port the app will listen to for incoming requests
app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}!`);
});
