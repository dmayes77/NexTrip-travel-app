require('dotenv').config();

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const PORT = process.env.PORT || 8080;

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
  console.log(projectData);
  res.send(projectData);
});

const geoURL = (place) => {
  return `http://api.geonames.org/postalCodeSearchJSON?placename=${place}&country=US&maxRows=1&username=${process.env.GN_USERNAME}`;
};

app.get('/getGeoNames/:destination', async (req, res) => {
  let { destination } = req.params;
  const response = await fetch(geoURL(destination));
  try {
    const data = await response.json();
    // console.log(data);
    // return data;
    res.send(data.postalCodes);
  } catch (error) {
    console.log('error', error);
  }
});

const weatherURL = (lat, lng) => {
  return `https://api.weatherbit.io/v2.0/forecast/daily?&days=7&lat=${lat}&lon=${lng}&units=I&key=${process.env.WEATHERBIT_KEY}`;
};

app.get('/getWeather/:lat/:lng', async (req, res) => {
  let { lat, lng } = req.params;
  const response = await fetch(weatherURL(lat, lng));
  try {
    const data = await response.json();
    // console.log(data)
    res.send(data);
  } catch (error) {
    console.log('error', error);
  }
});

const pixURL = (city) => {
  return `https://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&q=${city}+city&image_type=photo`;
};

app.get('/getImage/:city', async (req, res) => {
  let { city, state } = req.params;
  const response = await fetch(pixURL(city, state));
  try {
    const data = await response.json();
    res.send(data.hits[0]);
  } catch (error) {
    console.log('error', error);
  }
});

// designates what port the app will listen to for incoming requests
app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}!`);
});
