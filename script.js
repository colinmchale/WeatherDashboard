// Script Sheet


let searchBtn = document.querySelector("#searchBtn");
let searchInput = document.querySelector("#searchInput");
let searchCity = document.querySelector("#dash-city");
let searchTemp = document.querySelector("#dash-temp");
let searchWind = document.querySelector("#dash-wind");
let searchHum = document.querySelector("#dash-hum");
let searchUV = document.querySelector("#dash-uv");
let recentList = document.querySelector("#recentList")
let fiveDay = document.querySelector("#five-day");
let currentlat;
let currentlon;
let userSearch = "";
let recentSearchList = [];


// function renderRecentSearch() {
//   recentSearchList = localStorage.getItem("search");
//   recentSearchList = JSON.parse(recentSearchList);

//   if (recentSearchList <= 10) {
//     for (let i = 0; i < recentSearchList.length; i++) {
//       let nextSearch = document.createElement("a")

//       nextSearch.textContent = recentSearchList[i].value 
//       nextSearch.appendChild(recentList)
//     }
//   } else if (recentSearchList > 10) {
//     for (let i = 0; i < 10; i++) {
//       let nextSearch = document.createElement("a")
//       nextSearch.textContent = recentSearchList[i].value 
//       nextSearch.appendChild(recentList)
//     }
//   } else {
//     return;
//   };

// }


let buttonClick = function (event) {
    event.preventDefault();
    userSearch = searchInput.value
    fixedSearch = userSearch.toLowerCase();
    fixedSearch = fixedSearch.replace(" ", "+");
    if (fixedSearch) {
        getUserCity(fixedSearch);
    }
    console.log(fixedSearch)
    recentSearchList.unshift(userSearch)
    localStorage.setItem("search", JSON.stringify(recentSearchList));
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
          
          for (let i = 0; i < 6; i++) {
            let card = document.createElement("div");
            card.setAttribute("class", "card bg-dark text-white");
            fiveDay.appendChild(card);

            let picture = document.createElement("img");
            picture.setAttribute("class", "card-img");
            // picture.setAttribute("src", "card-img");
            // picture.setAttribute("alt", "card-img");
            card.append(picture)

            let imgOverlay = document.createElement("div");
            imgOverlay.setAttribute("class", "card-img-overlay");
            card.append(imgOverlay);

            let cardTitle = document.createElement("h5");
            cardTitle.setAttribute("class", "card-title");
            cardTitle.textContent = "Day" + i;
            imgOverlay.appendChild(cardTitle);

            let nextTemp = document.createElement("p");
            nextTemp.textContent = "Temp: " + weatherData.list[i].main.temp + "°F";
            imgOverlay.append(nextTemp);

            let nextWind = document.createElement("p");
            nextWind.textContent = "Wind: " + weatherData.list[i].main.temp + "MPH";
            imgOverlay.append(nextWind);

            let nextHum = document.createElement("p");
            nextHum.textContent = "Humidity: " + weatherData.list[i].main.humidity + "%";
            imgOverlay.append(nextHum);
          }
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
        
        searchTemp.textContent = "Temp: " + oneCallData.current.temp + "°F";
        searchWind.textContent = "Wind: " + oneCallData.current.wind_speed + "MPH";
        searchHum.textContent = "Humidity: " + oneCallData.current.humidity + "%";
        searchUV.textContent = "UV Index: " + oneCallData.current.uvi;

        

      });
    } else {
      alert('Error: ' + response.statusText);
    }
  });
};



function displayTime() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();
  
  today = '(' + mm + '/' + dd + '/' + yyyy + ')';
  searchCity.append(today);
};

// renderRecentSearch()

searchBtn.addEventListener('click', buttonClick);
