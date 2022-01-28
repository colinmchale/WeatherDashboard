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
let userSearch = "";
let recentSearchList = [];

function temperature(kelvin) {
  let temp = Math.round(((kelvin * 9 ) / 5 ) - 459.67)
  return temp;
};

// const date = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) 
// function formatDate(date, format) {
// }




// formatDate(today, 'mm/dd/yy');

// function renderRecentSearch() {

//   let recentSearch = localStorage.getItem("search");
//   recentSearch = JSON.parse(recentSearch);
//   console.log(recentSearch);
    

//   for (let i = 0; i < 10; i++) {
//     if (recentSearch[i]) {
//      let nextSearch = document.createElement("button");
//       nextSearch.setAttribute("type", "button");
//       nextSearch.setAttribute("class", "recentBtn");
//       nextSearch.textContent = recentSearch[i];
//       recentList.appendChild(nextSearch);
//     } else {
//       return;
//     }
//   };

//   if(recentSearch){
//     let recentBtn = document.querySelector(".recentBtn");
//     recentBtn.addEventListener('click', getUserCity(recentBtn.text));
//   }
// };



// let buttonClick = function (event) {
//     event.preventDefault();
//     userSearch = searchInput.value;
//     fixedSearch = userSearch.toLowerCase();
//     fixedSearch = fixedSearch.replace(" ", "+");
//     if (fixedSearch) {
//         getUserCity(fixedSearch);
//     };
//     console.log(fixedSearch);
//     renderRecentSearch(userSearch);
//     recentSearchList.unshift(userSearch);
//     localStorage.setItem("search", JSON.stringify(recentSearchList));
//     console.log(recentSearchList);
// };

let getCity = function (search) {
  let city = search.toLowerCase();
  city = city.replace(" ", "+");
  // console.log(city);
  getWeather(city)

  // localStorage.setItem("cities", JSON.stringify(recentSearchList));
};

let saveCity = function (city) {
  recentSearchList.unshift(city);
  localStorage.setItem("cities", JSON.stringify(recentSearchList));
  renderRecentCities();
};

let renderRecentCities = function() {
  let recentCities = JSON.parse(localStorage.getItem("cities"));
  console.log(recentCities);
  if(recentCities){
    for (let i = 0; i < recentCities.length; i++) {
      let cityList = document.createElement("li");
      // cityList.classList.add("");
      recentList.appendChild(cityList);

      let cityTag = document.createElement("a");
      cityTag.setAttribute("href", "")
      cityTag.textContent = recentCities[i]
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
            console.log(weatherData)
            displayWeather(weatherData, city)
          })
        }
      })
    };  


let displayWeather = function (weatherData, city) {
  // console.log(city);

  fiveDay.textContent = '';
  searchCity.textContent = weatherData.city.name;
  // currentDate.textContent = getDate();
  
  

  for (let i = 0; i < 5; i++) {
    let j = i * 7
    let card = document.createElement("div");
    card.classList.add("card", "m-1", "bg-primary", "text-light");
    card.setAttribute("style", "max-width: 18rem;");
    fiveDay.appendChild(card);

    let cardHeader = document.createElement("div");
    card.classList.add("card-header");
    card.appendChild(cardHeader);

    let cardBody = document.createElement("div");
    card.classList.add("card-body");
    card.appendChild(cardBody);
  
    // let picture = document.createElement("img");
    // picture.setAttribute("class", "card-img");
    // // picture.setAttribute("src", "card-img");
    // // picture.setAttribute("alt", "card-img");
    // card.append(picture)
  
    // let imgOverlay = document.createElement("div");
    // imgOverlay.setAttribute("class", "card-img-overlay");
    // card.append(imgOverlay);
  
    let cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    let date = weatherData.list[j].dt_txt
    // console.log(date);
    const d = new Date(date);
    let dayOfWeek = d.getDay();
    // let dayOfWeek = date.getDay()
    let weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    cardTitle.textContent = weekday[dayOfWeek]
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
        console.log(uvData);
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
  // console.log(searchInputVal);
  getCity(searchInputVal);
  saveCity(searchInputVal);
  searchInputVal = '';
};

renderRecentCities();
searchForm.addEventListener('submit', handleFormSubmit);
// pastSearchBtn.addEventListener('click', getPastUserCity);
