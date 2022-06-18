// my API key --- allows for 60 calls/minute
const key = "c4e5177d9b4e3609676c3fdf074d8f03";

// id for SLC
let cityID = "5780993";

// api call
let response = fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityID + '&appid=' + key)
.then(function(resp){return resp.json()})
.then(function(resp){displayWeather(resp)});

document.body.style.backgroundColor = "#a2a8e0";

// display attributes from json response
function displayWeather(resp){
    console.log(resp);
    document.getElementById("location").innerHTML = "Weather for " + resp.name;
    document.getElementById("temperature").innerHTML = "Temperature: " + (9.0*(parseFloat(resp.main.temp) - 273.15)/5.0 + 32).toFixed(0) + "&degF";
    document.getElementById("condition").innerHTML = "Conditions: " + resp.weather[0].description;
    document.getElementById("humidity").innerHTML = "Humidity: " + resp.main.humidity + "%";
}