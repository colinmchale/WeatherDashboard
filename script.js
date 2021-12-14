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
let userSearch = "";
let recentSearchList = [];


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

let getUserCity = function (event) {
  event.preventDefault();
                              // Cannot pull value from the input element!!!
  let city = searchInput.value;

  console.log(city);

  // if (city) {
  //   recentSearchList.unshift(city);
  //   let fixedCity = city.toLowerCase();
  //   fixedCity = fixedCity.replace(" ", "+");
  //   getWeather(fixedCity)
  //   searchInput.value = '';
  // }


  // localStorage.setItem("cities", JSON.stringify(recentSearchList));
}

let getWeather = function (city) {
  let weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=bd9cbe396241dde8b22cf3304aff6d9e';
  console.log(weatherUrl)
  
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


let displayWeather = function (weather, city) {



  // let currentDate = document.createElement("span");
  // currentDate.textContent=" (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
  

  console.log(city);




  let lat = weather.city.coord.lat
  let lon = weather.city.coord.lon
  getUVIndex(lat, lon)
}


let getUVIndex = function (lat, lon) {
  let uvUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly,daily,alerts&appid=bd9cbe396241dde8b22cf3304aff6d9e';

  fetch(uvUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (uvData) {
        console.log(uvData);
        // displayUV(uvData);
      })
    }
  })
}; 


// let displayUV = function (uvData) {


// }
  
  // userSearch = ;
  // city = userSearch.toLowerCase();
  // city = city.replace(" ", "+");
  

// if (city) {
//   let weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=bd9cbe396241dde8b22cf3304aff6d9e';
// console.log(weatherUrl)

//   fetch(weatherUrl)
//     .then(function (response) {
//       if (response.ok) {
//         response.json().then(function (weatherData) {
//           console.log(weatherData);  
//           console.log(weatherData.city.coord.lat); 
//           console.log(weatherData.city.coord.lon);

//           searchCity.textContent = weatherData.city.name
//           currentlat = weatherData.city.coord.lat
//           currentlon = weatherData.city.coord.lon
//           getOneCall(currentlat, currentlon)
          
//           for (let i = 0; i < 6; i++) {
//             let card = document.createElement("div");
//             card.setAttribute("class", "card bg-dark text-white");
//             fiveDay.appendChild(card);

//             let picture = document.createElement("img");
//             picture.setAttribute("class", "card-img");
//             // picture.setAttribute("src", "card-img");
//             // picture.setAttribute("alt", "card-img");
//             card.append(picture)

//             let imgOverlay = document.createElement("div");
//             imgOverlay.setAttribute("class", "card-img-overlay");
//             card.append(imgOverlay);

//             let cardTitle = document.createElement("h5");
//             cardTitle.setAttribute("class", "card-title");
//             cardTitle.textContent = "Day" + i;
//             imgOverlay.appendChild(cardTitle);

//             let nextTemp = document.createElement("p");
//             nextTemp.textContent = "Temp: " + weatherData.list[i].main.temp + "°F";
//             imgOverlay.append(nextTemp);

//             let nextWind = document.createElement("p");
//             nextWind.textContent = "Wind: " + weatherData.list[i].main.temp + "MPH";
//             imgOverlay.append(nextWind);

//             let nextHum = document.createElement("p");
//             nextHum.textContent = "Humidity: " + weatherData.list[i].main.humidity + "%";
//             imgOverlay.append(nextHum);
//           }
//         });
//       } else {
//         alert('Error: ' + response.statusText);
//       }
//     })
//     .catch(function (error) {
//       alert('Unable to connect to GitHub');
//     });
//   };
// };

// var getOneCall = function (lat, lon) {
//   var oneCallUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly,daily,alerts&appid=bd9cbe396241dde8b22cf3304aff6d9e';

//   fetch(oneCallUrl).then(function (response) {
//     if (response.ok) {
//       response.json().then(function (oneCallData) {
//         console.log(oneCallData);
        
//         searchTemp.textContent = "Temp: " + oneCallData.current.temp + "°F";
//         searchWind.textContent = "Wind: " + oneCallData.current.wind_speed + "MPH";
//         searchHum.textContent = "Humidity: " + oneCallData.current.humidity + "%";
//         searchUV.textContent = "UV Index: " + oneCallData.current.uvi;

//         if (oneCallData.current.uvi >= 6.5) {
//           searchUV.setAttribute("background-color", "red")
//         } else if (oneCallData.current.uvi <= 2.5) {
//           searchUV.setAttribute("background-color", "green")
//         } else {
//           searchUV.setAttribute("background-color", "yellow")
//         };

//       });
//     } else {
//       alert('Error: ' + response.statusText);
//     }
//   });
// };


// renderRecentSearch()

searchBtn.addEventListener('click', getUserCity);
// pastSearchBtn.addEventListener('click', getPastUserCity);
