require('dotenv').config();

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');

let projectData = {};

const app = express();

const gnUsername = process.env.GN_USERNAME;
const weatherBitKey = process.env.WEATHERBIT_KEY;
const pixabayKey = process.env.PIXABAY_KEY;

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

app.use(express.static('dist'));

// console.log(__dirname);

app.get('/', function (req, res) {
  res.sendFile('dist/index.html');
});

app.post('/api', (req, res) => {
  projectData = req.body;
  res.send(projectData);
});

app.get('/travel', (req, res) => {
  getWeather().then((data) => {
    res.send({ data });
  });
});

let place = 'chattanooga, tn';

const getGeo = async (place) => {
  const geoRes = await fetch(
    `http://api.geonames.org/postalCodeSearchJSON?placename=${place}&maxRows=1&username=${gnUsername}`
  );
  try {
    const geoData = await geoRes.json();
    projectData.geoData = geoData.postalCodes[0];
    const imgRes = await fetch(
      `https://pixabay.com/api/?key=${pixabayKey}&q=${projectData.geoData.placeName}&image_type=photo`
    );
    try {
      const imgData = await imgRes.json();
      projectData.imageData = imgData.hits[0];
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

const getWeather = async () => {
  await getGeo(place);
  let { lat, lng } = projectData.geoData;
  const res = await fetch(
    `https://api.weatherbit.io/v2.0/forecast/daily?&days=7&lat=${lat}&lon=${lng}&units=I&key=${weatherBitKey}`
  );
  try {
    const weatherData = await res.json();
    projectData.weatherData = weatherData.data;
    return projectData;
  } catch (error) {
    console.log(error);
  }
};

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});

app.get('/test', function (req, res) {
  res.send(mockAPIResponse);
});
