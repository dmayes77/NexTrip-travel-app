import moment from 'moment';

//style="background-image: url(${data.imgURL})"

const updateUI = (data, date) => {
  let displayData = `          
    <div id="card">
      <div id="card-header" >
      <img src="${data.imgURL}"/>
        
        <h3 class="bottom-left">${data.city}, ${data.state}</h3>
      </div>

      <div id="card-container">
        <!--Restaurants Container-->
        <div id="restaurants-container">
          <h3>
            Best<br />Restaurants<br /><i class="fas fa-utensils"></i>
          </h3>
          <div id="restaurants"></div>
        </div>
        <!--Events Container-->
        <div id="events-container">
          <div id="events"></div>
          <h3 class="left">
            Local<br />Events<br /><i class="far fa-calendar-alt"></i>
          </h3>
        </div>
        <!--Weather-->
        <h3 class="center">Local Weather<i class="far fa-sun"></i></h3>
        <div id="weather-container">
          <div id="forecast"></div>
        </div>
      </div>`;

  const { restaurants } = data;
  let restaurantsDisplay = restaurants.map((restaurant) => {
    return `
      <div class='flip-card'>
        <div class='flip-card-inner'>
          <div class='flip-card-front'>
            <img src=${restaurant.image_url} alt=${restaurant.alias} />
          </div>
          <div class='flip-card-back'>
            <div class='flip-card-body'>
              <p class="flip-card-title">${restaurant.name}</p>
              <p>${restaurant.location.address1}</p>
              <p>${restaurant.location.city}, ${restaurant.location.state} ${restaurant.location.zip_code}</p>
              <p>${restaurant.display_phone}</p>
              <p>Rating ${restaurant.rating}</p>
            </div>
            <div id="rating-review">
              <span class="end"><a href="${restaurant.url}" target="_blank">See more ⇨</a></span>
            </div>
          </div>
        </div>
      </div>`;
  });

  const { events } = data;
  let eventsDisplay = events.map((event) => {
    return `<div class='flip-card'>
        <div class='flip-card-inner'>
          <div class='flip-card-front'>
            <img src=${event.image_url} alt=${event.alias} />
          </div>
          <div class='flip-card-back'>
          <div class='flip-card-body'>
          <p class="flip-card-title">${event.name}</p>
            <p>${event.location.address1}</p>
            <p>${event.location.city}, ${event.location.state} ${event.location.zip_code}</p>
            </div>
            <div id="rating-review">
              <span><a href="${event.event_site_url}" target="_blank">See more ⇨</a></span>
            </div>

          </div>
        </div>
      </div>`;
  });

  let userDate = moment(date).format('YYYY-MM-DD');
  let y = Number(userDate.split('-')[0]);
  let m = Number(userDate.split('-')[1]) - 1;
  let d = Number(userDate.split('-')[2]);

  let datesArr = [];
  let dates = Client.getDates(new Date(y, m, d), new Date(y, m, d + 4));
  dates.forEach((date) => datesArr.push(moment(date).format('YYYY-MM-DD')));

  const { forecast } = data;
  let forcastDisplay = forecast
    .filter((daily) => {
      if (datesArr.includes(daily.datetime)) {
        return true;
      }
      return false;
    })
    .map((daily) => {
      return `
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front inner_box">
            <p class="title">${moment(daily.datetime).format(
              'MMM Do'
            )} ${moment(daily.datetime).fromNow()}</p>
            <p>${Math.round(daily.temp)}°F</p>
            <p>Hi ${Math.round(daily.max_temp)}° / Lo ${Math.round(
        daily.min_temp
      )}°</p>
              <img src="https://www.weatherbit.io/static/img/icons/${
                daily.weather.icon
              }.png"/>
              <p id="description">${daily.weather.description}</p>
            </div>
            <div class="flip-card-back">
              <p>John Doe</p>
              <p>Architect & Engineer</p>
              <p>We love that guy</p>
            </div>
          </div>
        </div>`;
    });

  document.querySelector('#results').innerHTML = displayData;

  document.querySelector('#restaurants').innerHTML = restaurantsDisplay;

  document.querySelector('#events').innerHTML = eventsDisplay;

  document.querySelector('#forecast').innerHTML = forcastDisplay;
};

export { updateUI };
