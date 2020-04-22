require('dotenv').config();
require('regenerator-runtime/runtime.js');

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const yelp = require('yelp-fusion');
const PORT = process.env.PORT || 8080;

let projectData = {};

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

const geoURL = (city, state) => {
  const link = `http://api.geonames.org/postalCodeSearchJSON?placename=${city}+${state}&country=US&maxRows=1&username=${process.env.GN_USERNAME}`;
  return link;
};

app.get('/getGeoNames/:city/:state', async (req, res) => {
  let { city, state } = req.params;
  const response = await fetch(geoURL(city, state));
  try {
    const data = await response.json();
    res.send(data.postalCodes);
  } catch (error) {
    res.status(500).send({ error: 'Something is wrong' });
  }
});

const weatherURL = (lat, lng) => {
  return `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lng}&units=I&key=${process.env.WEATHERBIT_KEY}`;
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
  return `https://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&q=${city}+city&image_type=photo&SameSite=None`;
};

const noImgURL = `https://pixabay.com/get/57e0d44a435bad14f1dc8460962932771039dee6504c704c7d287fdd9245c55e_640.jpg`;

app.get('/getImage/:city', async (req, res) => {
  let { city } = req.params;
  const response = await fetch(pixURL(city));
  try {
    // response.setHeader('SameSite=None');
    const data = await response.json();
    data.total !== 0
      ? res.send({ imgURL: data.hits[0].largeImageURL })
      : res.send({ imgURL: noImgURL });
  } catch (error) {
    console.log('error', error);
  }
});

//code from https://github.com/Yelp/yelp-fusion/blob/master/fusion/node/sample.js
const client = yelp.client(process.env.YELP_API_KEY);
app.get('/yelp/restaurants/:city/:state', async (req, res) => {
  let { city, state } = req.params;

  client
    .search({
      catergorie: 'restaurants',
      location: `${city}, ${state}`,
      limit: 3,
      sort_by: 'rating',
    })
    .then((response) => {
      res.send(response.jsonBody.businesses);
    })
    .catch((e) => {
      console.log(e);
    });
});

app.get('/yelp/events/:city/:state', async (req, res) => {
  let { city, state } = req.params;

  client
    .eventSearch({
      categories: 2,
      location: `${city}, ${state}`,
      start_date: Math.round(new Date().getTime() / 1000),
      sort_on: 'time_start',
      sort_by: 'asc',
      limit: 3,
    })
    .then((response) => {
      res.send(response.jsonBody.events);
    })
    .catch((e) => {
      console.log(e);
    });
});

// designates what port the app will listen to for incoming requests
app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}!`);
});
