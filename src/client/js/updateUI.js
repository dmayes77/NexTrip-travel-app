const updateUI = () => {
  const displayData = async () => {
    const res = await fetch('http://localhost:8080/travel');
    const data = await res.json();
    return data;
  };

  displayData().then((data) => {
    let newHTML = `          <div id="card">
    <div id="card-header">
      <img
        src="${data.imgURL}"
        alt="Avatar"
      />
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
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
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
        </div>
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
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
        </div>
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
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
        </div>
        <h3 class="left">
          Local<br />Events<br /><i class="far fa-calendar-alt"></i>
        </h3>
      </div>
      <!--Weather-->
      <h3 class="center">Local Weather<i class="far fa-sun"></i></h3>
      <div id="weather-container">
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
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
        </div>
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
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
        </div>
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
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
        </div>
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
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
        </div>
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
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
        </div>
      </div>
    </div>
  </div>`;

    document.querySelector('#results').innerHTML = newHTML;

    const { restaurants } = data;
    // const restaurantsArr = [restaurants];
    let restaurantsDisplay = restaurants.map((restaurant) => {
      return `<div class='flip-card'>
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

    document.querySelector('#restaurants').innerHTML = restaurantsDisplay;
  });
};

export { updateUI };
