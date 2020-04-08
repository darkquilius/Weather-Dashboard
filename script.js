// Sets date at top
const today = moment().format("MMM " + "D " + "YYYY");
const currentDay = document.getElementById("currentDay");
currentDay.innerHTML = today


var latitude = 33.75
var longitude = -84.39
var searchText = document.getElementById("searchInput")
var cityName;

var todayWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=27d78d8d4af0ca517d71ce5153b2ed8a"

var forecastURL = "https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=" + latitude + "&lon=" + longitude + "&appid=27d78d8d4af0ca517d71ce5153b2ed8a"

$("#searchBtn").click(function(e) {
    e.preventDefault();

    cityName = searchText.value

    // var todayWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=27d78d8d4af0ca517d71ce5153b2ed8a"

    $.ajax({
        type: "GET",
        url: todayWeather,
        success: function(response) {
            latitude = response.coord.lat;
            longitude = response.coord.lon;
            console.log(response)
        }
    });

});





$.ajax({
    type: "GET",
    url: forecastURL,
}).then(function(response) {

    // console.log(response)

    // current card head's entry will be the value of the search bar

    var temp = Math.round(response.current.temp)
    var todayWeather = $(`   
        <div class="card" style="width: 100%; background: lightblue">
        <h5>Today's Weather:</h5>
        <div class="card-body row">
            <div class="col-md-5">
                <h3 class="card-text">Atlanta</h3>
                <img src=" http://openweathermap.org/img/wn/${response.current.weather[0].icon}@2x.png">
            </div>
            <div class="col-md-7">
                <p class="card-text" id="temp">Temperature: ${temp}&#176;F</p>
                <p class="card-text">Humidity: ${response.current.humidity}%</p>
                <p class="card-text">Windspeed: ${response.current.wind_speed} mph</p>
                <p class="card-text">UV Index: ${response.current.uvi}</p>
            </div>
        </div>
    </div>`);
    $("#today-weather").prepend(todayWeather);

    for (let i = 0; i < 5; i++) {
        const element = response.daily[i];

        var forecastTemp = Math.round(element.temp.day)
        var forecastWeather = $(`
        <div class="card col" style="margin-left: 18px; background: deepskyblue">
        <h5>day slot</h5>
        <img src=" http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png" class="card-img-top" alt="...">
        <div card-body >
            <p class="card-text">Temp: ${forecastTemp}&#176;F</p>
            <p class="card-text">Humid: ${element.humidity}%</p>
        </div>
    </div>`)

        $("#forecast-weather").append(forecastWeather)
    }
});

//