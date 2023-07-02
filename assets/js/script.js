var cityNameEl = document.querySelector(".city-name");
var tempEl = document.querySelector("#temp");
var windEl = document.querySelector("#wind");
var humidityEl = document.querySelector("#humidity");


var requestUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=Richmond Hill&cnt=1&appid=670f2a326654e8e4ee66af45094f3c93';

fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    cityNameEl.textContent = `${data.city.name} ${data.list[0].dt_txt}`;
    tempEl.textContent = `temp: ${data.list[0].main.temp}`;
    humidityEl.textContent = `humidity: ${data.list[0].main.humidity} %`;

  });