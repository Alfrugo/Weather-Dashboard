
var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#cityname");

var citySearchTerm = document.querySelector("#city-search-term");

// main today section variables
var todayDate = document.querySelector("#today-date");
var todayTemp = document.querySelector("#today-temp");
var todayWind = document.querySelector("#today-wind");
var todayHumidity = document.querySelector("#today-humidity");
var todayUvindex = document.querySelector("#today-uvindex");


var oneTemp = document.querySelector("#oneTemp");
var oneWind = document.querySelector("#oneWind");
var oneHumidity = document.querySelector("#oneHumidity");

var twoTemp = document.querySelector("#twoTemp");
var twoWind = document.querySelector("#twoWind");
var twoHumidity = document.querySelector("#twoHumidity");

var threeTemp = document.querySelector("#threeTemp");
var threeWind = document.querySelector("#threeWind");
var threeHumidity = document.querySelector("#threeHumidity");

var fourTemp = document.querySelector("#fourTemp");
var fourWind = document.querySelector("#fourWind");
var fourHumidity = document.querySelector("#fourHumidity");

var fiveTemp = document.querySelector("#fiveTemp");
var fiveWind = document.querySelector("#fiveWind");
var fiveHumidity = document.querySelector("#fiveHumidity");

var currentPicEl = document.getElementById("current-pic");  // image for the clouds / sun / etc.

var imgOne = document.getElementById("img-one");  // image for the clouds / sun / etc.
var imgTwo = document.getElementById("img-two");  // image for the clouds / sun / etc.
var imgThree = document.getElementById("img-three");  // image for the clouds / sun / etc.
var imgFour = document.getElementById("img-four");  // image for the clouds / sun / etc.
var imgFive = document.getElementById("img-five");  // image for the clouds / sun / etc.

let uvIndex = document.querySelector("uv-index");


// local storage history section 
var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
var historyEl = document.getElementById("history");

var histList = document.querySelector("#hist-list")
    // console.log("the search history Initial: " + searchHistory);

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
      searchHistory.push(cityname);
      localStorage.setItem("search",JSON.stringify(searchHistory));
      //console.log("the search history: " + searchHistory);
      displaySearchHistory(); 

      cityInputEl.value = '';
    } else {
      alert('Please enter a city name');
    }
  };

  // get weather function for main and 5 lower squares

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
          displaydayOne(data, city);
          displaydayTwo(data,city);
          displaydayThree(data,city);
          displaydayFour(data,city);
          displaydayFive(data,city);
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
    // pulling the correct icon for sun/louds, etc.
    var weatherPic = dataCity.list[0].weather[0].icon;
    console.log ("weather Icon: " + weatherPic);
    currentPicEl.setAttribute("src","https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
    //currentPicEl.setAttribute("alt",dataCity.weather[0].description);

    todayTemp.textContent = "Temp: " + kel2far(dataCity.list[0].main.temp) + "??F";
    todayWind.textContent = "Wind: " + dataCity.list[0].wind.speed + "MPH";
    todayHumidity.textContent = "Humidity: " + dataCity.list[0].main.humidity + "%";

    var lat = dataCity.city.coord.lat;
    var lon = dataCity.city.coord.lon;

    console.log('lat / long' + lat + "  +  " + lon);

    // let UVurl = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=195bb7ba3428636ab3689f9eda27fa31&cnt=1";
    // let UVurl = "https://api.openweathermap.org/data/2.5/onecall?"+lat+"&"+lon+"&exclude=hourly,daily&appid=195bb7ba3428636ab3689f9eda27fa31"

    let UVurl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,daily&appid=195bb7ba3428636ab3689f9eda27fa31"

    fetch(UVurl)
    .then(function(response){
    console.log(UVurl);
    console.log(response);
          response.json().then(function(data) {
          console.log('fetch the lon lat data: ')
          console.log(data.current.uvi);
          var UV = data.current.uvi;
          todayUvindex.textContent = "UV Index: " + UV;
        })

  })

}

  var displaydayOne = function(dataCity, searchTerm){
    // / pulling the correct icon for sun/louds, etc.
    var weatherPicOne = dataCity.list[1].weather[0].icon;
    console.log ("weather Icon: " + weatherPicOne);
    imgOne.setAttribute("src","https://openweathermap.org/img/wn/" + weatherPicOne + "@2x.png");

    oneTemp.textContent = "Temp: " + kel2far(dataCity.list[1].main.temp) + "??F";
    oneWind.textContent = "Wind: " + dataCity.list[1].wind.speed + "MPH";
    oneHumidity.textContent = "Humidity: " + dataCity.list[1].main.humidity + "%";
  };

  var displaydayTwo = function(dataCity, searchTerm){
    // / pulling the correct icon for sun/louds, etc.
    var weatherPicTwo = dataCity.list[2].weather[0].icon;
    console.log ("weather Icon: " + weatherPicTwo);
    imgTwo.setAttribute("src","https://openweathermap.org/img/wn/" + weatherPicTwo + "@2x.png");
    twoTemp.textContent = "Temp: " + kel2far(dataCity.list[2].main.temp) + "??F";
    twoWind.textContent = "Wind: " + dataCity.list[2].wind.speed + "MPH";
    twoHumidity.textContent = "Humidity: " + dataCity.list[2].main.humidity + "%";
  };

  var displaydayThree = function(dataCity, searchTerm){
    var weatherPicThree = dataCity.list[3].weather[0].icon;
    console.log ("weather Icon: " + weatherPicThree);
    imgThree.setAttribute("src","https://openweathermap.org/img/wn/" + weatherPicThree + "@2x.png");

    threeTemp.textContent = "Temp: " + kel2far(dataCity.list[3].main.temp) + "??F";
    threeWind.textContent = "Wind: " + dataCity.list[3].wind.speed + "MPH";
    threeHumidity.textContent = "Humidity: " + dataCity.list[3].main.humidity + "%";
  };

  var displaydayFour = function(dataCity, searchTerm){
    var weatherPicFour = dataCity.list[4].weather[0].icon;
    console.log ("weather Icon: " + weatherPicFour);
    imgFour.setAttribute("src","https://openweathermap.org/img/wn/" + weatherPicFour + "@2x.png");

    fourTemp.textContent = "Temp: " + kel2far(dataCity.list[4].main.temp) + "??F";
    fourWind.textContent = "Wind: " + dataCity.list[4].wind.speed + "MPH";
    fourHumidity.textContent = "Humidity: " + dataCity.list[4].main.humidity + "%";
  };

  var displaydayFive = function(dataCity, searchTerm){
    var weatherPicFive = dataCity.list[5].weather[0].icon;
    console.log ("weather Icon: " + weatherPicFive);
    imgFive.setAttribute("src","https://openweathermap.org/img/wn/" + weatherPicFive + "@2x.png");


    fiveTemp.textContent = "Temp: " + kel2far(dataCity.list[5].main.temp) + "??F";
    fiveWind.textContent = "Wind: " + dataCity.list[5].wind.speed + "MPH";
    fiveHumidity.textContent = "Humidity: " + dataCity.list[5].main.humidity + "%";
  };

  // display the search history.. this needs help. The button doesn't call the function right

  function displaySearchHistory() {
    for (let i=0; i<searchHistory.length; i++) {
          if (i == 6) {
            return;
          }
     
          var histItem = document.createElement("p");
          histItem.classList = "histitem";
          histItem.setAttribute("type","text");
          histItem.value = searchHistory[i];
          histItem.setAttribute("value", searchHistory[i]);
          histItem.textContent = searchHistory[i];
          histItem.setAttribute("readonly", true);
          histItem.addEventListener("click", function(){
            getWeather(histItem.value);
            console.log("histItem: " + histItem.value);
          })
        histList.appendChild(histItem); 
    }
}

//kelvin to farenheight converter

function kel2far(kDegree){
  var farenheight = Math.round((kDegree - 273.15)*1.8+32);
  return farenheight;
}

  cityFormEl.addEventListener("submit", formSubmitHandler);
  displaySearchHistory();
