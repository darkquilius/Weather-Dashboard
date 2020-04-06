// Sets date at top
const today = moment().format("MMM " + "D " + "YYYY");
const currentDay = document.getElementById("currentDay");
currentDay.innerHTML = today

const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Atlanta&appid=27d78d8d4af0ca517d71ce5153b2ed8a"

F =

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response)
        var todayWeather = $(
            `<div class="card" style="width: 100%;">
    <h5>Today's Weather:</h5>
    <div class="card-body">
        <p class="card-text" id="temp">Temperature:${response.main.temp}</p>
        <p class="card-text">Humidity:${response.main.humidity}</p>
        <p class="card-text">Windspeed:${response.wind.speed}</p>
        <p class="card-text">UV Index:</p>
    </div>
</div>`);

        $("#today-weather").prepend(todayWeather)
    })