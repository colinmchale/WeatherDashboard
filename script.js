// Script Sheet


let searchBtn = document.querySelector("#searchBtn");
let searchInput = document.querySelector("#searchInput");
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
    searchInput.textContent = '';
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
          
          currentlat = weatherData.city.coord.lat
          currentlon = weatherData.city.coord.lon
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
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  });
};

searchBtn.addEventListener('click', buttonClick);
