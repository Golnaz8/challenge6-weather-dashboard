var cityNameEl = document.querySelector(".city-name");
var tempEl = document.querySelector("#temp");
var windEl = document.querySelector("#wind");
var humidityEl = document.querySelector("#humidity");
var searchBtnEl = document.querySelector(".search-btn");
var cityInputEl = document.querySelector("#city_name");
var futureBoxEl = document.querySelector("#future-box");
var futureDateEl = document.getElementsByClassName("future-date");
var futureTempEl = document.getElementsByClassName("future-temp");
var futureWindEl = document.getElementsByClassName("future-wind");
var futureHumidityEl = document.getElementsByClassName("future-humidity");
var bodyEl = document.querySelector("#custom-body");
// var customBtnEl = document.querySelector(".custom-btn");
var newBtnEl = document.querySelector("#new-btn");

var today = dayjs();
var date = today.format("DD-MMM-YYYY");

var allCities = [];


function firstLoadRender() {
    var cityInput = localStorage.getItem("cityName");
    allCities = cityInput.split(',');
    console.log(allCities);


    for (var i = 0; i < allCities.length; i++){
        var tag = document.createElement("button");
        tag.setAttribute("class", "waves-effect waves-light btn container-width search-btn top card-panel #bdbdbd grey lighten-1 custom-btn");
        tag.setAttribute("data-input" ,allCities[i]);
        tag.textContent = allCities[i];
        newBtnEl.appendChild(tag);
    }
}


function renderSaveCities() {
    cityInputEl.value= "";
    var cityInput = localStorage.getItem("cityName");
    var arrayCityInput = cityInput.split(',');


    var difference = arrayCityInput.slice(-1);
    var differ = difference[0];
    var check = allCities.includes(differ);
    
    console.log(difference);
    console.log(differ);
    console.log(check);                 
    if (!check) {

        allCities.push(differ);
        console.log(allCities);
    var tag = document.createElement("a");
    tag.setAttribute("class", "waves-effect waves-light btn container-width search-btn top card-panel #bdbdbd grey lighten-1");
    tag.setAttribute("data-input", difference);
    tag.textContent = difference;
    newBtnEl.appendChild(tag);
    }

    var stringAllCities = allCities.join(',');
    localStorage.setItem("cityName", stringAllCities);
}


function activateSearchBtn(){
    var cityName = cityInputEl.value;
    cityName = cityName.toUpperCase();
    if (cityName) {
      localStorage.setItem("cityName", cityName);
    }else {
      return;
    }
    todayWeather(cityName);
    forecastWeather(cityName);
}


function todayWeather(cityName) {
    const todayBaseUrl = 'http://api.openweathermap.org/data/2.5/weather';
    const todayUpdatedUrl = `${todayBaseUrl}?q=${encodeURIComponent(cityName)}&cnt=1&units=metric&appid=670f2a326654e8e4ee66af45094f3c93`;
  
    fetch(todayUpdatedUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      cityNameEl.textContent = `${cityName}  ${data.weather[0].main}   ${date}`;
      console.log(data);
      tempEl.textContent = `Temp: ${data.main.temp} C`;
      windEl.textContent = `Wind speed: ${data.wind.speed} MPH`;
      humidityEl.textContent = `Humidity: ${data.main.humidity} %`;
      renderSaveCities();
    });
}


function forecastWeather(cityName){
    const baseUrl = 'http://api.openweathermap.org/data/2.5/forecast';
    const updatedUrl = `${baseUrl}?q=${encodeURIComponent(cityName)}&cnt=54&units=metric&appid=670f2a326654e8e4ee66af45094f3c93`;
  
    fetch(updatedUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
     console.log(data);
     console.log(data.list.length);
      j=0;
     for (var i = 7; i < data.list.length; i+=8) {
      console.log(data.list[i].dt_txt);
      futureDateEl[j].textContent = data.list[i].dt_txt;
      futureTempEl[j].textContent = `temp: ${data.list[i].main.temp} C`;
      futureWindEl[j].textContent = `wind: ${data.list[i].wind.speed} MPH`;
      futureHumidityEl[j].textContent = `humidity:${data.list[i].main.humidity} %`;
      j++;
     }
     renderSaveCities();
    });
}


// Add an event listener to the search button
searchBtnEl.addEventListener('click', activateSearchBtn);


newBtnEl.addEventListener("click", function(event) {
    var element = event.target;
    if (element.matches("button") === true) {
        var cityName = element.getAttribute("data-input");
        console.log(cityName);
        todayWeather(cityName);
        forecastWeather(cityName);
    }
});


firstLoadRender();
