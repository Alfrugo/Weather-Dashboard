var cityName = "austin";

/* create input 
var formSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();
  
    // get value from input element
    var username = nameInputEl.value.trim();
  
    if (username) {
      getUserRepos(username);
  
      // clear old content
      repoContainerEl.textContent = '';
      nameInputEl.value = '';
    } else {
      alert('Please enter a GitHub username');
    }
  };
*/

var getWeather = function(user) {
    // format the weather api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=195bb7ba3428636ab3689f9eda27fa31";

    // make a get request to url
    fetch(apiUrl)
      .then(function(response) {
        // request was successful
        if (response.ok) {
          console.log(response);
          response.json().then(function(data) {
            console.log(data);
      
            console.log("the data is: " + data); // understanding the data structure

            console.log("City Name: " + data.city.name);  // here is the call for the city

            console.log(data.list[0]); 

            console.log("Temp: "  + data.list[0].main.temp); // here is the call fo the temp
            console.log("Humidity: "  + data.list[0].main.humidity); // here is the call fo the temp
            console.log("Wind: "  + data.list[0].wind.speed); // here is the call fo the wind
            console.log("Date: " + data.list[0].dt_txt);  // here is the call for the date 
            console.log("Clouds: " + data.list[0].clouds.all);  // here is the call for the cloudyness 


  
  
            //          displayRepos(data, user);    use this to call the function that displays the data.
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function(error) {
        alert('Unable to connect to Open Weather');
      });
  };

  getWeather();