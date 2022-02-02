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
let emojis = {Icon:"01d", Clear:"fa-sun", Clouds:"fa-cloud", cloudSun:"fa-cloud-sun", Thunderstorm:"fa-poo-storm", Rain:"fa-cloud-rain", Snow:"fa-snowflake",windy:"fa-wind"};
let cardItems = ["date","em","temp","wind","humid"];
let weatherItems = {temp:125.01, wind:45.25, humid:56};
let todayDate = moment().format('L');

refreshData();

currentDateEl.textContent = todayDate;//set today's date for current city area
currentCityEl.textContent = cityInput;//default city
// currentEmojiEl.classList.add(emojis.cloudSun);//TESTING
// currentTempEl.textContent = "125.01";//TESTING
// currentWindEl.textContent = "45.25";//TESTING
// currentHumidEl.textContent = "56";//TESTING
// currentUVIEl.textContent = "0.45";//TESTING


function refreshData(){
    if (userInput.value !== ""){cityInput = userInput.value;};
    let queryGeoCode = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&appid=${APIKey}`;
    fetch(queryGeoCode)
    .then(response => response.json())
        .then(data => {
            let cityData = data;
            console.log(cityData);
            cityInput = cityData[0].name;
            currentCityEl.textContent = cityInput;
            let queryWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityData[0].lat}&lon=${cityData[0].lon}&units=imperial&appid=${APIKey}`;
            fetch(queryWeather)
            .then(response => response.json())
                .then(data => {
                    let weatherData = data;
                    console.log(weatherData);
                    // weatherItems.temp = weatherData.current.temp;
                    // weatherItems.wind = weatherData.current.wind_speed;
                    // weatherItems.humid = weatherData.current.humidity;
                    currentTempEl.textContent = weatherData.current.temp;
                    currentWindEl.textContent = weatherData.current.wind_speed;
                    currentHumidEl.textContent = weatherData.current.humidity;
                    currentUVIEl.textContent = weatherData.current.uvi;
                    console.log(weatherData.current.weather[0].icon);
                    emojis.Icon = weatherData.current.weather[0].icon;
                    currentEmojiEl.innerHTML = `<img src="http://openweathermap.org/img/wn/${emojis.Icon}@2x.png" alt="test"  width="70" height="70">`
                    refreshCards();
                });    
        });
}

function refreshCards(){
//set info for 5-day forecast cards:
    for (let i = 1; i < (cardsEl.length + 1); i++) {
        let newDate = moment().add(i, 'd').format('L');
        document.getElementById(`card-${cardItems[0]}${i}`).textContent = newDate;
        // document.getElementById(`card-${cardItems[1]}${i}`).classList.add(emojis.Snow);
        document.getElementById(`card-${cardItems[1]}${i}`).innerHTML = `<img src="http://openweathermap.org/img/wn/${emojis.Icon}@2x.png" alt="test" width="80" height="80">`
        document.getElementById(`card-${cardItems[2]}${i}`).textContent = `Temp: ${weatherItems.temp}℉`;
        document.getElementById(`card-${cardItems[3]}${i}`).textContent = `Wind: ${weatherItems.wind} MPH`;
        document.getElementById(`card-${cardItems[4]}${i}`).textContent = `Humidity: ${weatherItems.humid} %`;
    };
};

searchBtn.addEventListener ("click", refreshData);