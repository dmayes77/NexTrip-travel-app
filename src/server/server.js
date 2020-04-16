require('dotenv').config();

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const yelp = require('yelp-fusion');
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
  return `https://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&q=${city}+city&image_type=photo`;
};

app.get('/getImage/:city', async (req, res) => {
  let { city, state } = req.params;
  const response = await fetch(pixURL(city, state));
  try {
    const data = await response.json();
    data.total !== 0
      ? res.send({ imgURL: data.hits[0].webformatURL })
      : res.send({
          imgURL:
            'https://cdn.pixabay.com/photo/2015/07/19/11/05/panels-851426_1280.jpg',
        });
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
