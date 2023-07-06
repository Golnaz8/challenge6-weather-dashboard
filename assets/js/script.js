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
var iconEl = document.querySelector("#weather-icon");
var weatherIconEl = document.getElementsByClassName("weather-icon-box");
var firstIconEl = document.querySelector("#first-icon");
var secondIconEl = document.querySelector("#second-icon");
var thirdIconEl = document.querySelector("#third-icon");
var forthIconEl =document.querySelector("#forth-icon");
var fifthIconEl = document.querySelector("#fifth-icon"); 

// var customBtnEl = document.querySelector(".custom-btn");
var newBtnEl = document.querySelector("#new-btn");

//information about curretn date
var today = dayjs();
var date = today.format("DD-MMM-YYYY");

var allCities = [];

//function in the first load to read data from local storage and show on screen
function firstLoadRender() {

  //first remove all elements that created during code run time
  var childNodes = newBtnEl.childNodes;
  // Remove each child node
  for (var i = childNodes.length - 1; i >= 0; i--) {
    var childNode = childNodes[i];
    newBtnEl.removeChild(childNode);
  }

  var cityInput = localStorage.getItem("cityName");
  if (cityInput) {
    allCities = cityInput.split(',');
    console.log(allCities);
  } else {
    return;
  }

  for (var i = 0; i < allCities.length; i++) {
    var tag = document.createElement("button");
    tag.setAttribute("class", "waves-effect waves-light btn container-width search-btn top card-panel #bdbdbd grey lighten-1 custom-btn");
    tag.setAttribute("data-input", allCities[i]);
    tag.textContent = allCities[i];
    newBtnEl.appendChild(tag);
  }
}

//function to read new data from local storage and display it on screen and update local storage
function renderSaveCities() {
  
  cityInputEl.value = "";
  var cityInput = localStorage.getItem("cityName");
  var arrayCityInput = cityInput.split(',');

  //check if it is a reapeted city name, it doesn't add it again
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
  stringAllCities = "";
}

//function to read the data that user inputs and save it in local storage. it calls function to fetch data from api
function activateSearchBtn() {
  firstLoadRender();

  var cityName = cityInputEl.value;
  cityName = cityName.toUpperCase();
  if (cityName) {
    localStorage.setItem("cityName", cityName);
  } else {
    return;
  }
  renderSaveCities();
  todayWeather(cityName);
  forecastWeather(cityName);

}

//function to fetch current day weather from weather API.
function todayWeather(cityName) {
  const todayBaseUrl = 'https://api.openweathermap.org/data/2.5/weather';
  const todayUpdatedUrl = `${todayBaseUrl}?q=${encodeURIComponent(cityName)}&cnt=1&units=metric&appid=670f2a326654e8e4ee66af45094f3c93`;

  fetch(todayUpdatedUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      cityNameEl.textContent = `${cityName}     (${date})     ${data.weather[0].main}`;
      
      //check the id number to add class for those weather icon
      var weatherId = data.weather[0].id;

      if (200 <= weatherId && weatherId <= 232) {
        iconEl.setAttribute("class", "fa fa-solid fa-cloud-bolt");
      } else if (300 <= weatherId && weatherId <= 321) {
        iconEl.setAttribute("class", "fa fa-solid fa-cloud-drizzle");
      } else if (500 <= weatherId && weatherId <= 531) {
        iconEl.setAttribute("class", "fa fa-solid fa-cloud-rain");
      } else if (600 <= weatherId && weatherId <= 622) {
        iconEl.setAttribute("class", "fa fa-sharp fa-solid fa-snowflake");
      } else if (801 <= weatherId && weatherId <= 804) {
        iconEl.setAttribute("class", "fa fa-solid fa-cloud");
      } else if (weatherId = 800) {
        iconEl.setAttribute("class", "fa fa-solid fa-sun fa-lg");
      }

      tempEl.textContent = `Temp: ${data.main.temp} C`;
      windEl.textContent = `Wind speed: ${data.wind.speed} MPH`;
      humidityEl.textContent = `Humidity: ${data.main.humidity} %`;

    });
}

//function to fetch 5 days forecast from weather API.
function forecastWeather(cityName) {
  refreshIcons();
  const baseUrl = 'https://api.openweathermap.org/data/2.5/forecast';
  const updatedUrl = `${baseUrl}?q=${encodeURIComponent(cityName)}&cnt=60&units=metric&appid=670f2a326654e8e4ee66af45094f3c93`;

  fetch(updatedUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.list.length);
      j = 0;
      for (var i = 6; i < data.list.length; i += 8) {
        console.log(data.list[i].dt_txt);
        futureDateEl[j].textContent = `${data.list[i].dt_txt}  ${data.list[i].weather[0].main}`;
        
        //check the id number to add class for those weather icon
        var weatherIdBox = data.list[i].weather[0].id;
        console.log(weatherIdBox);
        element = weatherIconEl[j];

        if (weatherIdBox >= 200 && weatherIdBox <= 232) {
          element.classList.add("fa");
          element.classList.add("fa-solid");
          element.classList.add("fa-cloud-bolt");

        }

        if (weatherIdBox >= 300 && weatherIdBox <= 321) {
          element.classList.add("fa");
          element.classList.add("fa-solid");
          element.classList.add("fa-cloud-drizzle");

        }

        if (weatherIdBox >= 500 && weatherIdBox <= 531) {
          element.classList.add("fa");
          element.classList.add("fa-solid");
          element.classList.add("fa-cloud-rain");

        }

        if (weatherIdBox >= 600 && weatherIdBox <= 622) {
          element.classList.add("fa");
          element.classList.add("fa-sharp");
          element.classList.add("fa-solid");
          element.classList.add("fa-snowflake");

        }

        if (weatherIdBox >= 801 && weatherIdBox <= 804) {
          element.classList.add("fa");
          element.classList.add("fa-solid");
          element.classList.add("fa-cloud");

        }

        if (weatherIdBox === 800) {
          element.classList.add("fa");
          element.classList.add("fa-solid");
          element.classList.add("fa-sun");
        }

        futureTempEl[j].textContent = `temp: ${data.list[i].main.temp} C`;
        futureWindEl[j].textContent = `wind: ${data.list[i].wind.speed} MPH`;
        futureHumidityEl[j].textContent = `humidity:${data.list[i].main.humidity} %`;
        console.log(j);
        j++;
      }


    });
}

// Add an event listener to the search button
searchBtnEl.addEventListener('click', activateSearchBtn);

//Add an event listener to the previous city search button which added dynamically.
newBtnEl.addEventListener("click", function (event) {
  var element = event.target;
   firstLoadRender();
   if (element.matches("button") === true) {
    var cityName = element.getAttribute("data-input");
    console.log(cityName);
    
    todayWeather(cityName);
    forecastWeather(cityName);
  }
});

//function to remove all previous classes that we add dinamically to show the weather icon
function refreshIcons() {
  var allClassesFirst = firstIconEl.className.split(" ");
  for (var i = allClassesFirst.length - 1; i >= 0; i--) {
    var classNameOne = allClassesFirst[i];
    if (classNameOne !== 'weather-icon-box') {
      firstIconEl.classList.remove(classNameOne);
    }
  }
  var allClassesSecond = secondIconEl.className.split(" ");
  for (var i = allClassesSecond.length - 1; i >= 0; i--) {
    var classNameTwo = allClassesSecond[i];
    if (classNameTwo !== 'weather-icon-box') {
      secondIconEl.classList.remove(classNameTwo);
    }
  }
  var allClassesThird = thirdIconEl.className.split(" ");
  for (var i = allClassesThird.length - 1; i >= 0; i--) {
    var classNameThree = allClassesThird[i];
    if (classNameThree !== 'weather-icon-box') {
      thirdIconEl.classList.remove(classNameThree);
    }
  }
  var allClassesForth = forthIconEl.className.split(" ");
  for (var i = allClassesForth.length - 1; i >= 0; i--) {
    var classNameFour = allClassesForth[i];
    if (classNameFour !== 'weather-icon-box') {
      forthIconEl.classList.remove(classNameFour);
    }
  }
  var allClassesFifth = fifthIconEl.className.split(" ");
  for (var i = allClassesFifth.length - 1; i >= 0; i--) {
    var classNameFive = allClassesFifth[i];
    if (classNameFive !== 'weather-icon-box') {
      fifthIconEl.classList.remove(classNameFive);
    }
  }
}

//function to load page in the begining
firstLoadRender();




