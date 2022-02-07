const APIKey = "96e58deee85325bc236f6554186f15dc";
let cityInput = "Atlanta";
let searchBtn = document.getElementById("search");
let userInput = document.getElementById("city-search");
let currentCityEl = document.getElementById("current-city");
let currentDateEl = document.getElementById("current-date");
let currentEmojiEl = document.getElementById("current-emoji");
let currentTempEl = document.getElementById("current-temp");
let currentWindEl = document.getElementById("current-wind");
let currentHumidEl = document.getElementById("current-humid");
let currentUVIEl = document.getElementById("current-uvi"); 
let cardsEl = document.getElementsByClassName("card-header");
let histBtnsEl = document.getElementsByClassName("history-item");
let emojis = {Icon:"01d", Clear:"fa-sun", Clouds:"fa-cloud", cloudSun:"fa-cloud-sun", Thunderstorm:"fa-poo-storm", Rain:"fa-cloud-rain", Snow:"fa-snowflake",windy:"fa-wind"};
let cardItems = ["date","em","temp","wind","humid"];
let weatherData = [];
let weatherItems = {temp:125.01, wind:45.25, humid:56};
let todayDate = moment().format('L');
let historyCounter = localStorage.length;

refreshData();//initial data pull with default city

//show and populate history buttons if history items are stored
refreshHistButtons();

for (let i = 0; i < localStorage.length; i++) {
    document.getElementById(`histItem${i}`).style.display = "block"; 
    document.getElementById(`histItem${i}`).textContent = localStorage[i];
};

currentDateEl.textContent = todayDate;//set today's date for current city area
currentCityEl.textContent = cityInput;//default city

function history(){
    let historyItems = [];
    historyCounter = localStorage.length;
    //create array of local storage items
    for (let index = 0; index < localStorage.length; index++) {
        historyItems.push(localStorage[index]);
    }
        
    if (historyItems.includes(cityInput)){
        return;
    }
    else{
        if (localStorage.length < 8){
            localStorage.setItem (historyCounter, cityInput);
            for (let i = -1; i < historyCounter; i++) {
                document.getElementById(`histItem${historyCounter}`).style.display = "block"; 
                document.getElementById(`histItem${historyCounter}`).textContent = localStorage[historyCounter];
            };
            historyCounter += 1;
            return;
        }
        else{
            if (historyCounter > 7){
                historyCounter = 0;
            }
            else{
                historyCounter += 1;
            };
            localStorage.setItem (historyCounter, cityInput);
            for (let i = 0; i < historyItems.length; i++) {
                document.getElementById(`histItem${historyCounter}`).style.display = "block"; 
                document.getElementById(`histItem${historyCounter}`).textContent = localStorage[historyCounter];
            };
            return;
        };
    };
}

function refreshData(){
    //check for blank input
    if (userInput.value !== ""){
        cityInput = userInput.value;
        history();
    };
    let queryGeoCode = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&appid=${APIKey}`;
    fetch(queryGeoCode)
        .then(response => response.json())
        .then(data => {
            let cityData = data;
            cityInput = cityData[0].name;
            currentCityEl.textContent = cityInput;
            let queryWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityData[0].lat}&lon=${cityData[0].lon}&units=imperial&appid=${APIKey}`;
            fetch(queryWeather)
            .then(response => response.json())
                .then(data => {
                    weatherData = data;
                    //set current selected city data
                    currentTempEl.textContent = weatherData.current.temp;
                    currentWindEl.textContent = weatherData.current.wind_speed;
                    currentHumidEl.textContent = weatherData.current.humidity;
                    currentUVIEl.textContent = weatherData.current.uvi;
                    if(currentUVIEl.textContent <= 2){
                        currentUVIEl.className = ("bg-green");
                    }
                    else if(currentUVIEl.textContent <= 5){
                        currentUVIEl.className = ("bg-yellow");
                    }
                    else{
                        currentUVIEl.className = ("bg-red");
                    };
                    emojis.Icon = weatherData.current.weather[0].icon;
                    currentEmojiEl.innerHTML = `<img src="http://openweathermap.org/img/wn/${emojis.Icon}@2x.png" alt="weather cloud sun or rain emoji"  width="70" height="70">`
                    refreshCards();
                });    
        });
    userInput.value = "";//clear text area
    return;
}

//set info for 5-day forecast cards:
function refreshCards(){
    for (let i = 1; i < (cardsEl.length + 1); i++) {
        let newDate = moment().add(i, 'd').format('L');
        document.getElementById(`card-${cardItems[0]}${i}`).textContent = newDate;
        emojis.Icon = weatherData.daily[i].weather[0].icon;
        document.getElementById(`card-${cardItems[1]}${i}`).innerHTML = `<img src="http://openweathermap.org/img/wn/${emojis.Icon}@2x.png" alt="test" width="80" height="80">`
        weatherItems.temp = weatherData.daily[i].temp.max;
        weatherItems.wind = weatherData.daily[i].wind_speed;
        weatherItems.humid = weatherData.daily[i].humidity;
        document.getElementById(`card-${cardItems[2]}${i}`).textContent = `Temp: ${weatherItems.temp}℉`;
        document.getElementById(`card-${cardItems[3]}${i}`).textContent = `Wind: ${weatherItems.wind} MPH`;
        document.getElementById(`card-${cardItems[4]}${i}`).textContent = `Humidity: ${weatherItems.humid} %`;
    };
};

//event listener function for history buttons
function refreshHistButtons(){
    for (let idx = 0; idx < histBtnsEl.length; idx++) {
        document.getElementById(`histItem${idx}`).addEventListener ("click", function (){
            userInput.value = "";
            cityInput = this.textContent; //set location input variable to button value
            refreshData();
        });
    }
};

searchBtn.addEventListener ("click", refreshData);