let currentCityEl = document.getElementById("current-city");
let currentDateEl = document.getElementById("current-date");
let currentEmojiEl = document.getElementById("current-emoji");
let currentTempEl = document.getElementById("current-temp");
let currentWindEl = document.getElementById("current-wind");
let currentHumidEl = document.getElementById("current-humid");
let currentUVIEl = document.getElementById("current-uvi"); 
let cardsEl = document.getElementsByClassName("card-header");
let emojis = {sunny:"fa-sun", cloudy:"fa-cloud", cloudSun:"fa-cloud-sun", stormy:"fa-poo-storm", rainy:"fa-cloud-rain", windy:"fa-wind"};
let cardItems = ["date","em","temp","wind","humid"];
let weatherItems = {temp:125.01, wind:45.25, humid:56};
let todayDate = moment().format('L');

currentDateEl.textContent = todayDate;//set today's date for current city area
currentCityEl.textContent = "Austin";//default city Austin
currentEmojiEl.classList.add(emojis.cloudSun);//TESTING
currentTempEl.textContent = "125.01";//TESTING
currentWindEl.textContent = "45.25";//TESTING
currentHumidEl.textContent = "56";//TESTING
currentUVIEl.textContent = "0.45";//TESTING

//set dates for 5-day forecast cards:
for (let i = 1; i < (cardsEl.length + 1); i++) {
    let newDate = moment().add(i, 'd').format('L');
    document.getElementById(`card-${cardItems[0]}${i}`).textContent = newDate;
    document.getElementById(`card-${cardItems[1]}${i}`).classList.add(emojis.cloudSun);
    document.getElementById(`card-${cardItems[2]}${i}`).textContent = `Temp: ${weatherItems.temp}℉`;
    document.getElementById(`card-${cardItems[3]}${i}`).textContent = `Wind: ${weatherItems.wind} MPH`;
    document.getElementById(`card-${cardItems[4]}${i}`).textContent = `Humidity: ${weatherItems.humid} %`;
};