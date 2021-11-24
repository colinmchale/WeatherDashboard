// Script Sheet


let searchBtn = document.querySelector("#searchBtn");
let searchInput = document.querySelector("#searchInput");
let searchCity = document.querySelector("#dash-city");
let searchTemp = document.querySelector("#dash-temp");
let searchWind = document.querySelector("#dash-wind");
let searchHum = document.querySelector("#dash-hum");
let searchUV = document.querySelector("#dash-uv");

let currentlat;
let currentlon;
let userSearch = "";

let buttonClick = function (event) {
    event.preventDefault();
    userSearch = searchInput.value.toLowerCase();
    userSearch = userSearch.replace(" ", "+");
    if (userSearch) {
        getUserCity(userSearch);

    }
    console.log(userSearch)
};


let getUserCity = function (city) {
  let weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=bd9cbe396241dde8b22cf3304aff6d9e';
console.log(weatherUrl)


  fetch(weatherUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (weatherData) {
          console.log(weatherData);  
          console.log(weatherData.city.coord.lat); 
          console.log(weatherData.city.coord.lon);

          searchCity.textContent = weatherData.city.name
          
          currentlat = weatherData.city.coord.lat
          currentlon = weatherData.city.coord.lon
          displayTime()
          getOneCall(currentlat, currentlon)
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to GitHub');
    });
};

var getOneCall = function (lat, lon) {
  var oneCallUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly,daily,alerts&appid=bd9cbe396241dde8b22cf3304aff6d9e';

  fetch(oneCallUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (oneCallData) {
        console.log(oneCallData);
        
        searchTemp.textContent = "Temp: " + oneCallData.current.temp + "°F"
        searchWind.textContent = "Wind: " + oneCallData.current.wind_speed + "MPH"
        searchHum.textContent = "Humidity: " + oneCallData.current.humidity + "%"
        searchUV.textContent = "UV Index: " + oneCallData.current.uvi

      });
    } else {
      alert('Error: ' + response.statusText);
    }
  });
};

function displayTime() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();
  
  today = '(' + mm + '/' + dd + '/' + yyyy + ')';
  searchCity.append(today);
};

searchBtn.addEventListener('click', buttonClick);