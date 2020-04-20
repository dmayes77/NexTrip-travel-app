const updateUI = (data, date) => {
  let displayData = `          
    <div id="card">
      <div id="card-header" style="background-image: url(${data.imgURL})">
        
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
            </div>
            <div id="rating-review">
              <small>Rating ${restaurant.rating}</small>
              <span>Price ${restaurant.price}</span>
              <span><a href="${restaurant.url}">See more ⇨</a></span>
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
            <p>${event.display_phone}</p>
            </div>
            <div id="rating-review">
              <span><a href="${event.url}">See more ⇨</a></span>
            </div>

          </div>
        </div>
      </div>`;
  });

  const { forecast } = data;
  let m = date.split('/')[0];
  let d = date.split('/')[1];
  let y = date.split('/')[2];
  const newDate = `${y}-${m}-${Number(d) + 7}`;

  console.log(newDate);
  let forcastDisplay = forecast
    .filter((daily) => {
      if (newDate) {
        return true;
      }
      return false;
    })
    .map((daily) => {
      return `
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
            ${daily.datetime}
              <img
                src="https://pixabay.com/get/57e7d44a4d55ae14f1dc8460962932771039dee6504c704c7d287bdc924acd5b_640.jpg"
                alt="Avatar"
              />
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
