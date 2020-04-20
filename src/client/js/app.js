import 'regenerator-runtime/runtime.js';
import fetch from 'node-fetch';

let data = [];

const getData = async (url, location) => {
  const geoRes = await fetch(`${url}/getGeoNames/${location}`);
  try {
    const geoData = await geoRes.json();
    let { lat, lng, placeName } = geoData[0];
    // get weather
    const weatherRes = await fetch(`${url}/getWeather/${lat}/${lng}`);
    try {
      const weatherData = await weatherRes.json();
      const forecast = weatherData.data;
      const state = weatherData.state_code;
      //get images
      const imgRes = await fetch(`${url}/getImage/${placeName}`);
      try {
        const imageURL = await imgRes.json();
        const { imgURL } = imageURL;
        //get local restaurant data
        const restaurantRes = await fetch(
          `${url}/yelp/restaurants/${placeName}/${state}`
        );
        try {
          const restaurants = await restaurantRes.json();
          // get local events data
          const eventRes = await fetch(
            `${url}/yelp/events/${placeName}/${state}`
          );
          try {
            const events = await eventRes.json();
            data = {
              city: placeName,
              state,
              lat,
              lng,
              imgURL,
              forecast,
              restaurants,
              events,
            };
            return data;
          } catch (error) {
            console.log('yelp eevents error', error);
          }
        } catch (error) {
          console.log('yelp restaurants error', error);
        }
      } catch (error) {
        console.log('getImage error', error);
      }
    } catch (error) {
      console.log('getWeather error', error);
    }
  } catch (error) {
    console.log('getGeoNames error:', error);
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

export { getData, postData };
