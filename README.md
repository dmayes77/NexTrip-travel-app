## NexTrip - Travel App

Plan your next trip.  
See local restaurant reviews, events, and weather.  
Will give you forecast for 5 days.  
This app is set up to display information for US cities only!!

## How to get the app

#### Clone or download the project on your computer

#### Open the terminal, cd in the project folder and run the following commands:

```markdown
- npm i (to install all the packages)
- You need a personal API keys. .env.example is provided, see API section below for details
- npm run dev (to start the server and client)
- localhost:8081 will open in new tab
- Enter a city and a date!
- NOTE: if your search fails please refresh the website (CTRL + SHIFT + R)
```

## API

The provided .env.example includes api key examples needed to run this file.

1. Create an account with [Geonames](http://www.geonames.org/export/web-services.html).
   Replace the value to `GN_USERNAME` with your personal username in `.env.example`.

2. Create an account with [Weatherbit](https://www.weatherbit.io/account/create).
   Replace the value to `WEATHERBIT_KEY` with your personal API key in `.env.example`.
3. Create an account with [Pixabay](https://pixabay.com/api/docs/).
   Replace the value to `PIXABAY_KEY` with your personal API key in `.env.example`.
4. Create an account with [Yelp](https://www.yelp.com/fusion).
   Replace the value to `YELP_API_KEY` and `YELP_CLIENT_ID` with your personal API key and ID in `.env.example`.
5. Rename file `.env.example` to `.env`.

## How to run the tests

```markdown
- npm run test (this will run 2 tests)
- Make sure the server is NOT running to pass the server test!
```

## Extras

- Display countdown in forecast
- Pull an image for cities without images
- App Yelp API to give restaurant and locacl event information
- Add parallax and card flip for a more dynamic site
- Material Design for modern look and feel
