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

console.log(futureDateEl);


// var requestUrl = 'api.openweathermap.org/data/2.5/forecast?q={city name}&&cnt=1&appid=670f2a326654e8e4ee66af45094f3c93';

// fetch(requestUrl)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
    // console.log(data);
    // cityNameEl.textContent = `${data.city.name} ${data.list[0].dt_txt}`;
    // tempEl.textContent = `temp: ${data.list[0].main.temp}`;
    // humidityEl.textContent = `humidity: ${data.list[0].main.humidity} %`;

  //});



// Add an event listener to the search button
searchBtnEl.addEventListener('click', () => {
  const cityName = cityInputEl.value;

  const baseUrl = 'http://api.openweathermap.org/data/2.5/forecast';
  const updatedUrl = `${baseUrl}?q=${encodeURIComponent(cityName)}&cnt=40&units=metric&appid=670f2a326654e8e4ee66af45094f3c93`;
 
  console.log(updatedUrl);

  fetch(updatedUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
   console.log(data);
   
   console.log(data.list.length);
    j=0;
   for (var i = 0; i < data.list.length; i+=8) {
    console.log(data.list[i].dt_txt);
    
    futureDateEl[j].textContent = data.list[i].dt_txt;
    j++;

  }

  });
});
