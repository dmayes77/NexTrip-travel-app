import 'regenerator-runtime/runtime.js';
import { updateUI } from './updateUI';

let data = [];
const url = 'http://localhost:8080';

const getData = async () => {
  const place = await document.getElementById('zip').value;
  //get geodata
  const geoRes = await fetch(`${url}/getGeoNames/${place}`);
  try {
    const geoData = await geoRes.json();
    let { lat, lng, placeName } = geoData[0];
    // get weather
    const weatherRes = await fetch(`${url}/getWeather/${lat}/${lng}`);
    try {
      const weatherData = await weatherRes.json();
      console.log('weather', weatherData);
      const forecast = weatherData.data;
      const state = weatherData.state_code;
      //get images
      const imgRes = await fetch(`${url}/getImage/${placeName}`);
      try {
        const imageURL = await imgRes.json();
        const { imgURL } = imageURL;
        console.log(imgURL);
        data = {
          city: placeName,
          state,
          lat,
          lng,
          imgURL,
          forecast,
        };
        return data;
      } catch (error) {
        console.log('error', error);
      }
    } catch (error) {
      console.log('error', error);
    }
  } catch (error) {
    console.log('error:', error);
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
    console.log('data sent', data);
    return data;
  } catch (err) {
    console.log('data not sent:', err);
    return false;
  }
};

document
  .getElementById('generate')
  .addEventListener('click', () =>
    getData().then((data) => postData(`${url}/travel`, data).then(updateUI()))
  );

export { getData };
