//Create empty array for history in local storage - push this array into history buttons on right hand side of page.
//On page load, render localstorage array as buttons on right-hand side, if local storage is empty load nothing.
//Create on click listener for search button that takes user input - validates it and sends it to weather api and pushes results to page.
//Possibly use same query url to load in 5 day forecast.
//ensure forecasts load relevant data - pushed to html as well as an icon.

//Grabbing search value input and search button as variables
    let searchVal = $("#search-input");
    let searchBtn = $("#search-button");

//Creating variables for todays date and the next 5 days to appear on screen.
    let todayDate = moment().format('L'); 
    let tomorrowDateOne = moment().add(1, 'days').format('LL');
    let tomorrowDateTwo = moment().add(2, 'days').format('LL');
    let tomorrowDateThree = moment().add(3, 'days').format('LL');
    let tomorrowDateFour = moment().add(4, 'days').format('LL');
    let tomorrowDateFive = moment().add(5, 'days').format('LL');
