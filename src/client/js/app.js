import 'regenerator-runtime/runtime.js';
import * as env from './env';

const geoURL = (place) => {
  return `http://api.geonames.org/postalCodeSearchJSON?placename=${place}&country=US&maxRows=1&username=${env.GN_USERNAME}`;
};

const pixURL = (place) => {
  return `https://pixabay.com/api/?key=${env.PIXABAY_KEY}&q=${place}+city&image_type=photo`;
};

const weatherURL = (lat, lng) => {
  return `https://api.weatherbit.io/v2.0/forecast/daily?&days=7&lat=${lat}&lon=${lng}&units=I&key=${env.WEATHERBIT_KEY}`;
};

const url = `http://localhost:8080/travel`;

const getData = async () => {
  const place = await document.getElementById('zip').value;
  const geoRes = await fetch(geoURL(place));
  try {
    const geoData = await geoRes.json();
    let { lat, lng, placeName } = geoData.postalCodes[0];
    const weatherRes = await fetch(weatherURL(lat, lng));
    try {
      const weatherData = await weatherRes.json();
      const forecast = weatherData.data;
      const imgRes = await fetch(pixURL(placeName));
      try {
        const imgData = await imgRes.json();
        let imgURL = imgData.hits[0].webformatURL;
        return { data: { placeName, lat, lng, imgURL, forecast } };
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
    console.log(data);
    return data;
  } catch (err) {
    console.log('error:', err);
    return false;
  }
};

document
  .getElementById('generate')
  .addEventListener('click', () =>
    getData().then((data) => postData(url, data))
  );

export { getData };
