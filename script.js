let searchForm = document.querySelector("#searchForm");
let searchInput = document.querySelector("#searchInput");
let searchCity = document.querySelector("#dash-city");
let searchTemp = document.querySelector("#dash-temp");
let searchWind = document.querySelector("#dash-wind");
let searchHum = document.querySelector("#dash-hum");
let searchUV = document.querySelector("#dash-uv");
let recentList = document.querySelector("#recent-list")
let fiveDay = document.querySelector("#five-day");
let currentDate = document.querySelector("#current-date");
let pastSearchCity = document.querySelector(".past-search");
let userSearch = "";
let recentSearchList = [];

function temperature(kelvin) {
  let temp = Math.round(((kelvin * 9 ) / 5 ) - 459.67)
  return temp;
};

function getDate() {
  let today = new Date();
  let dayIndex = String(today.getDay()).padStart(1, '0');
  // console.log(dayIndex)
  let weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  let d = weekday[dayIndex]
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();

  today = d + ' (' + mm + '/' + dd + '/' + yyyy + ')';
  return today;
};

function getWeatherEmoji(weather) {
  if (weather == 'Clouds') {
    return '⛅';
  } else if (weather == 'Clear') {
    return '☀️';
  } else if (weather == 'Snow') {
    return '🌨️';
  } else if (weather == 'Rain') {
    return '🌧️';
  }else {
    return '🌩️';
  }
};

let getCity = function (search) {
  let city = search.toLowerCase();
  city = city.replace(" ", "+");
  // console.log(city);
  getWeather(city)
};

let saveCity = function (city) {
  recentSearchList.unshift(city);
  localStorage.setItem("cities", JSON.stringify(recentSearchList));
  // console.log(recentSearchList)
  renderRecentCities();
};

let renderRecentCities = function() {
  recentList.textContent = '';
  let recentCities = JSON.parse(localStorage.getItem("cities"));
  // console.log(recentCities);
  if(recentCities){
    for (let i = 0; i < recentCities.length; i++) {
      let cityList = document.createElement("li");
      // cityList.classList.add("");
      recentList.appendChild(cityList);
      let thisCity = recentCities[i]
      let cityTag = document.createElement("button");
      cityTag.classList.add("past-search", "btn", "text-primary");
      cityTag.textContent = thisCity
      cityList.appendChild(cityTag);
    };
  };
};

let getWeather = function (city) {
  let weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=bd9cbe396241dde8b22cf3304aff6d9e';
  // console.log(weatherUrl)
    fetch(weatherUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (weatherData) {
            // console.log(weatherData)
            displayWeather(weatherData, city)
          })
        }
      })
    };  

let displayWeather = function (weatherData, city) {
  // console.log(city);
  fiveDay.textContent = '';
  let getConditions = weatherData.list[0].weather[0].main;
  // console.log(getConditions);
  let weatherEmoji = getWeatherEmoji(getConditions)
  searchCity.textContent = weatherData.city.name + '  ' + weatherEmoji;
  let displayDate = getDate();
  currentDate.textContent = displayDate;

  
  for (let i = 1; i < 6; i++) {
    let j = (i * 8) - 1
    let card = document.createElement("div");
    card.classList.add("card", "m-1", "bg-primary", "text-light", "shadow");
    card.setAttribute("style", "max-width: 18rem;");
    fiveDay.appendChild(card);

    let cardHeader = document.createElement("div");
    card.classList.add("card-header");
    card.appendChild(cardHeader);

    let cardBody = document.createElement("div");
    card.classList.add("card-body");
    card.appendChild(cardBody);
  
    let cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    let date = weatherData.list[j].dt_txt
    // console.log(date);
    const d = new Date(date);
    let dayOfWeek = d.getDay();
    let weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    let nextConditions = weatherData.list[j].weather[0].main;
    let nextWeatherEmoji = getWeatherEmoji(nextConditions)
    cardTitle.textContent = weekday[dayOfWeek] + ' ' + nextWeatherEmoji;
    cardBody.appendChild(cardTitle);
  
    let nextTemp = document.createElement("p");
    let nextDayTemp = weatherData.list[j].main.temp
    nextTemp.textContent = "Temp: " + temperature(nextDayTemp) + "°F";
    cardBody.append(nextTemp);
  
    let nextWind = document.createElement("p");
    nextWind.textContent = "Wind: " + weatherData.list[j].wind.speed + "MPH";
    cardBody.append(nextWind);
  
    let nextHum = document.createElement("p");
    nextHum.textContent = "Humidity: " + weatherData.list[j].main.humidity + "%";
    cardBody.append(nextHum);
  };
  
  let lat = weatherData.city.coord.lat
  let lon = weatherData.city.coord.lon
  getUVIndex(lat, lon)
};

let getUVIndex = function (lat, lon) {
  let uvUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly,daily,alerts&appid=bd9cbe396241dde8b22cf3304aff6d9e';

  fetch(uvUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (uvData) {
        // console.log(uvData);
        displayUV(uvData);
      })
    }
  })
}; 

let displayUV = function (uvData) {

  let currentTemp = uvData.current.temp
  searchTemp.textContent = "Temp: " + temperature(currentTemp) + "°F";
  searchWind.textContent = "Wind: " + uvData.current.wind_speed + "MPH";
  searchHum.textContent = "Humidity: " + uvData.current.humidity + "%";
  searchUV.textContent = "UV Index: " + uvData.current.uvi;

  if (uvData.current.uvi >= 6.5) {
    searchUV.classList.add("bg-danger")
  } else if (uvData.current.uvi <= 2.5) {
    searchUV.classList.add("bg-success")
  } else {
    searchUV.classList.add("bg-warning")
  };
};
  
function handleFormSubmit(event) {
  event.preventDefault();
  let searchInputVal = searchInput.value;

  if (!searchInputVal) {
    console.error('You need to enter a city!');
    return;
  }
  // console.log(searchInput.value);
  getCity(searchInputVal);
  saveCity(searchInputVal);
  searchInput.value = '';
};

function handleClick(event) {
  getCity(event.target.textContent);
};

renderRecentCities();
searchForm.addEventListener('submit', handleFormSubmit);
recentList.addEventListener('click', handleClick);