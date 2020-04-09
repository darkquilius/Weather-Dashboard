$(document).ready(function() {

    // Sets date at top
    const today = moment().format("MMM " + "D " + "YYYY");
    const currentDay = document.getElementById("currentDay");
    currentDay.innerHTML = today

    // Used for ajax calls later
    var latitude;
    var longitude;
    var cityName;

    //when clicked, search button initiates ajax calls to populate the current weather and future 5 day forecast
    $("#searchBtn").click(function(e) {
        e.preventDefault();

        cityName = $("#searchInput").val();

        // First ajax call, populates today's weather and allows object properties to be accessed which are crucial for forecast list population
        $.ajax({
            type: "GET",
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=27d78d8d4af0ca517d71ce5153b2ed8a",
        }).then(function(response) {

            // empties previous searches and collects latitude and longitude properties which allow second ajax call and population of forecast list
            $("#today-weather").empty();
            $("#forecast-weather").empty();
            latitude = response.coord.lat;
            longitude = response.coord.lon;
            //today card name value set
            cityName = response.name

            //allows for API for forecast objects
            $.ajax({
                type: "GET",
                url: "https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=" + latitude + "&lon=" + longitude + "&appid=27d78d8d4af0ca517d71ce5153b2ed8a",
            }).then(function(response) {

                //rounds temp to an integer
                var temp = Math.round(response.current.temp)

                //dynamically creates and appends today's weather API results
                var todayWeather = $(`   
                        <div id="todayWeather" class="card" style="width: 100%; margin-top:10px; margin-bottom: 15px; background: lightblue">
                        <h5>Today's Weather: ${today}</h5>
                        <div class="card-body row" >
                            <div class="col-md-5">
                                <h3 class="card-text">${cityName}</h3>
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

                //dynamically creates and appends five day forecast API results
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
            })

        })








        // $.ajax({
        //     type: "GET",
        //     url: "https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=" + latitude + "&lon=" + longitude + "&appid=27d78d8d4af0ca517d71ce5153b2ed8a",
        // }).then(function(response) {
        //     console.log(response)
        //         // current card head's entry will be the value of the search bar

        //     var temp = Math.round(response.current.temp)
        //     var todayWeather = $(`   
        //         <div class="card" style="width: 100%; background: lightblue">
        //         <h5>Today's Weather:</h5>
        //         <div class="card-body row">
        //             <div class="col-md-5">
        //                 <h3 class="card-text">Atlanta</h3>
        //                 <img src=" http://openweathermap.org/img/wn/${response.current.weather[0].icon}@2x.png">
        //             </div>
        //             <div class="col-md-7">
        //                 <p class="card-text" id="temp">Temperature: ${temp}&#176;F</p>
        //                 <p class="card-text">Humidity: ${response.current.humidity}%</p>
        //                 <p class="card-text">Windspeed: ${response.current.wind_speed} mph</p>
        //                 <p class="card-text">UV Index: ${response.current.uvi}</p>
        //             </div>
        //         </div>
        //     </div>`);
        //     $("#today-weather").prepend(todayWeather);

        //     for (let i = 0; i < 5; i++) {
        //         const element = response.daily[i];

        //         var forecastTemp = Math.round(element.temp.day)
        //         var forecastWeather = $(`
        //         <div class="card col" style="margin-left: 18px; background: deepskyblue">
        //         <h5>day slot</h5>
        //         <img src=" http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png" class="card-img-top" alt="...">
        //         <div card-body >
        //             <p class="card-text">Temp: ${forecastTemp}&#176;F</p>
        //             <p class="card-text">Humid: ${element.humidity}%</p>
        //         </div>
        //     </div>`)

        //         $("#forecast-weather").append(forecastWeather)
        //     }
    });

});