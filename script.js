
var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#cityname");

var citySearchTerm = document.querySelector("#city-search-term");

// main today section variables
var todayDate = document.querySelector("#today-date");
var todayTemp = document.querySelector("#today-temp");
var todayWind = document.querySelector("#today-wind");
var todayHumidity = document.querySelector("#today-humidity");
var todayUvindex = document.querySelector("#today-uvindex");

//date collection with moment.js

$("#currentDay").text(moment().format("L"));   // moment.js initial value for the weather dashboard
$("#dayOne").text(moment().add(1, "days").format("L"));
$("#dayTwo").text(moment().add(2, "days").format("L"));
$("#dayThree").text(moment().add(3, "days").format("L"));
$("#dayFour").text(moment().add(4, "days").format("L"));
$("#dayFive").text(moment().add(5, "days").format("L"));




var dayToday = moment().format("L");
var dayOne = moment().add(1, "days").format("L")
console.log("tomorrow: " + dayOne);



//input section

var formSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();
      // get value from input element
    var cityname = cityInputEl.value.trim(); 
    if (cityname) {
      getWeather(cityname);
      // clear old content
      //repoContainerEl.textContent = '';
      cityInputEl.value = '';
    } else {
      alert('Please enter a city name');
    }
  };


var getWeather = function(city) {
    // format the weather api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=195bb7ba3428636ab3689f9eda27fa31";
    console.log ('city variable = ' + city)

    // make a get request to url
    fetch(apiUrl)
      .then(function(response) {
        // request was successful
        if (response.ok) {
          console.log(response);
          response.json().then(function(data) {
            console.log(data);
            // console.log("the data is: " + data); // understanding the data structure
            // console.log("City Name: " + data.city.name);  // here is the call for the city
            // console.log(data.list[0]); 
            // console.log("Temp: "  + data.list[0].main.temp); // here is the call fo the temp
            // console.log("Humidity: "  + data.list[0].main.humidity); // here is the call fo the temp
            // console.log("Wind: "  + data.list[0].wind.speed); // here is the call fo the wind
            // console.log("Date: " + data.list[0].dt_txt);  // here is the call for the date 
            // console.log("Clouds: " + data.list[0].clouds.all);  // here is the call for the cloudyness 
          displayTodayCity(data, city);    
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function(error) {
        alert('Unable to connect to Open Weather');
      });
  };

  var displayTodayCity = function(dataCity, searchTerm){
    
    citySearchTerm.textContent = searchTerm + " ("+dayToday+")";


    todayTemp.textContent = "Temp: " + dataCity.list[0].main.temp + "°F";
    todayWind.textContent = "Wind: " + dataCity.list[0].wind.speed + "MPH";
    todayHumidity.textContent = "Humidity: " + dataCity.list[0].main.humidity + "%";
    todayUvindex.textContent = "UV Index: " + dataCity.list[0].main.uvindex + "%";
  };

  cityFormEl.addEventListener("submit", formSubmitHandler);
