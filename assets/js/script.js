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



// Add an event listener to the search button
searchBtnEl.addEventListener('click', () => {
  const cityName = cityInputEl.value;

 
  const todayBaseUrl = 'http://api.openweathermap.org/data/2.5/weather';
  const todayUpdatedUrl = `${todayBaseUrl}?q=${encodeURIComponent(cityName)}&cnt=1&units=metric&appid=670f2a326654e8e4ee66af45094f3c93`;

  fetch(todayUpdatedUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    cityNameEl.textContent = cityName;
    console.log(data);
    tempEl.textContent = `Temp: ${data.main.temp} C`;
    windEl.textContent = `Wind speed: ${data.wind.speed} MPH`;
    humidityEl.textContent = `Humidity: ${data.main.humidity} %`;
  });

  const baseUrl = 'http://api.openweathermap.org/data/2.5/forecast';
  const updatedUrl = `${baseUrl}?q=${encodeURIComponent(cityName)}&cnt=54&units=metric&appid=670f2a326654e8e4ee66af45094f3c93`;

  fetch(updatedUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
   console.log(data);
   cityNameEl.text
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
  });
});
