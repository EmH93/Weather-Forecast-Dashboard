//Create empty array for history in local storage - push this array into history buttons on right hand side of page.
//On page load, render localstorage array as buttons on right-hand side, if local storage is empty load nothing.
//Create on click listener for search button that takes user input - validates it and sends it to weather api and pushes results to page.
//Possibly use same query url to load in 5 day forecast.
//ensure forecasts load relevant data - pushed to html as well as an icon.

//Grabbing search value input and search button as variables
    let searchVal = $("#search-input");
    let searchBtn = $("#search-button");
//Variable for empty search history array
    let searchHistory = [];

//Creating variables for todays date and the next 5 days to appear on screen.
    let todayDate = moment().format('L'); 
    let tomorrowDateOne = moment().add(1, 'days').format('LL');
    let tomorrowDateTwo = moment().add(2, 'days').format('LL');
    let tomorrowDateThree = moment().add(3, 'days').format('LL');
    let tomorrowDateFour = moment().add(4, 'days').format('LL');
    let tomorrowDateFive = moment().add(5, 'days').format('LL');

//onclick event for search button
    searchBtn.on("click", function(event){
        event.preventDefault();
        var userInput = searchVal.val().trim();
    //if else statement to validate user input - no empty searches allowed
    if(userInput === ""){
        alert("Enter a place name, then click search to continue.");
    } else { 

        searchHistory.push(userInput);
        JSON.stringify(searchHistory);
        localStorage.setItem("History", searchHistory);

    //QueryUrl and API key for OpenWeather API
            var APIKey = "accbe8c22666b428c502d933a37222a8";
            var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&appid=" + APIKey + "&cnt=6&units=metric";

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response){
                console.log(response);
            })
        }
    })