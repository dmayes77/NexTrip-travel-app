import 'regenerator-runtime/runtime.js';

let data = {};

const getGeoData = async (url, city, state) => {
  const geoRes = await fetch(`${url}/getGeoNames/${city}/${state}`);
  try {
    const geoData = await geoRes.json();
    let { lat, lng } = geoData[0];
    return { lat, lng };
  } catch (error) {
    console.log('getGeoNames error:', error);
  }
};

const getWeatherData = async (url, lat, lng) => {
  // get weather
  const weatherRes = await fetch(`${url}/getWeather/${lat}/${lng}`);
  try {
    const weatherData = await weatherRes.json();
    const forecast = weatherData.data;
    data.forecast = forecast;
    return data;
  } catch (error) {
    console.log('getWeather error', error);
  }
};

const getImages = async (url, city) => {
  //get images
  const imgRes = await fetch(`${url}/getImage/${city}`);
  try {
    const imageURL = await imgRes.json();
    const { imgURL } = imageURL;
    data.imgURL = imgURL;
    return data;
  } catch (error) {
    console.log('getImage error', error);
  }
};

const getRestaurants = async (url, city, state) => {
  //get local restaurant data
  const restaurantRes = await fetch(`${url}/yelp/restaurants/${city}/${state}`);
  try {
    const restaurants = await restaurantRes.json();
    data.restaurants = restaurants;
    return data;
  } catch (error) {
    console.log('yelp restaurants error', error);
  }
};

const getEvents = async (url, city, state) => {
  // get local events data
  const eventRes = await fetch(`${url}/yelp/events/${city}/${state}`);
  try {
    const events = await eventRes.json();
    data.events = events;
    return data;
  } catch (error) {
    console.log('yelp events error', error);
  }
};

const postData = async (url = '', newData = {}) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newData),
  });
  try {
    const data = await res.json();
    return data;
  } catch (err) {
    console.log('data not sent:', err);
    return false;
  }
};

const getData = (url, city, state, date) => {
  getGeoData(url, city, state)
    .then((data) => getWeatherData(url, data.lat, data.lng))
    .then(getImages(url, city))
    .then(getRestaurants(url, city, state))
    .then(getEvents(url, city, state))
    .then((data) => postData(`${url}/travel`, data))
    .then((data) => Client.updateUI(city, state, data, date));
};

document
  .getElementById('submit-btn')
  .addEventListener('click', () => Client.handleSubmit(event));

export { getData, postData };
