//Create empty array for history in local storage - push this array into history buttons on right hand side of page.
//On page load, render localstorage array as buttons on right-hand side, if local storage is empty load nothing.
//Create on click listener for search button that takes user input - validates it and sends it to weather api and pushes results to page.
//Possibly use same query url to load in 5 day forecast.
//ensure forecasts load relevant data - pushed to html as well as an icon.

//Grabbing variables from html
    let searchVal = $("#search-input");
    let searchBtn = $("#search-button");
    let weatherToday = $("#today");
    let forecastDiv = $("#forecast");
//Variable for empty search history array
    let searchHistory = [];

//Creating variables for todays date and the next 5 days to appear on screen.
    let todayDate = $("<h4>").text(moment().format('LL'));    

$(document).ready(function () {

    renderButtons();

//onclick event for search button
    searchBtn.on("click", function(event){
        event.preventDefault();
        var userInput = searchVal.val().trim();
    //clear content on main page when new search is input
        weatherToday.empty();
        forecastDiv.empty();
    //Running function for user input to screen
        userSearch(userInput);
    })

//Render prev search buttons to screen
    function renderButtons(){
        //let prevSearch = localStorage.getItem("History");
        //let prevSearchArr = JSON.parse(prevSearch);

        let prevSearchArr = ["Swindon", "London", "Bristol", "Chippenham"];

        for (let i = 0; i < prevSearchArr.length; i++){
            let newBtn = $("<button>");
            newBtn.text(prevSearchArr[i]);
            $("#history").append(newBtn);
          }
        

    }



//function for query to API and pushing to screen.
    function userSearch (userInput){
    //if else statement to validate user input - no empty searches allowed
        if(userInput === ""){
            alert("Enter a place name, then click search to continue.");
        } else { 

    //Push user input to search history in local storage
        searchHistory.push(userInput);
        JSON.stringify(searchHistory);
        localStorage.setItem("History", searchHistory);

    //QueryUrl and API key for OpenWeather API
            var APIKey = "accbe8c22666b428c502d933a37222a8";
            var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&appid=" + APIKey + "&cnt=6&units=metric";

        //ajax get method and following reponse html formatting
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response){
                let listArr = response.list;
                for ( var i = 0; i < listArr.length; i++){
                    if(listArr[i] === listArr[0]){
                        weatherToday.attr("id", "todayForecast");
                        var cityName = $("<h1>").text(response.city.name);
                        var iconcode = response.list[0].weather[0].icon;
                        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                        var weatherIcon = $("<img>").attr("src", iconurl);
                        var cityTemp = $("<h4>").text("Temp: "+ response.list[0].main.temp + "°C");
                        var cityWind = $("<h4>").text("Wind: " + response.list[0].wind.speed + " kph");
                        var cityHumidity = $("<h4>").text("Humidity: " + response.list[0].main.humidity + "%");
                        weatherToday.append(cityName, todayDate, weatherIcon, cityTemp, cityWind, cityHumidity);
                    } else {
                        let weatherDiv = $("<div>").attr("id", "futureForecast");
                        weatherDiv.attr("data-number", [i]);
                        var cityNameSml = $("<h4>").text(response.city.name);
                        let tomorrowDate = $("<h6>").text(moment().add([i], 'days').format('LL'));
                        var iconcodeSml = response.list[i].weather[0].icon;
                        var iconurlSml = "http://openweathermap.org/img/w/" + iconcodeSml + ".png";
                        var weatherIconSml = $("<img>").attr("src", iconurlSml);
                        var cityTempSml = $("<h4>").text("Temp: "+ response.list[i].main.temp + "°C");
                        var cityWindSml = $("<h4>").text("Wind: " + response.list[i].wind.speed + " kph");
                        var cityHumiditySml = $("<h4>").text("Humidity: " + response.list[i].main.humidity + "%");
                        weatherDiv.append(cityNameSml, tomorrowDate, weatherIconSml, cityTempSml, cityWindSml, cityHumiditySml);
                        forecastDiv.append(weatherDiv);
                    }} 



            })
        }
    }

    

})