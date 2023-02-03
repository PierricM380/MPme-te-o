import arrayDaysInOrder from "./manageTime.js";

// console.log(arrayDaysInOrder);

const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temperature');
const lacalisation = document.querySelector('.lacalisation');
const hourForecastName = document.querySelectorAll('.hour-forecast-name');
const hourForecastValue = document.querySelectorAll('.hour-forecast-value');

const apiKey = ''; // Here your api key
let resultsApi;

// if browser localistion is activated
if (navigator.geolocation) {
    // Get position
    navigator.geolocation.getCurrentPosition(position => {
        let long = position.coords.longitude;
        let lat = position.coords.latitude;

        // Method to display coordinates
        callApi(long, lat)
    },
        // callback if location is not activated 
        () => {
            alert(`Vous avez refusé d'activer la location dans votre navigateur, l'application de pourra pas fonctionner.`)
        })
}

// Method to display coordinates
function callApi(long, lat) {
    // Method to fetch API
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${apiKey}`)
        // promise return an json object with data
        .then((response) => {
            return response.json();
        })

        // Display data
        .then((data) => {
            resultsApi = data;

            console.log(data);

            // Add in DOM the informations texts fetched by api
            weather.innerText = resultsApi.current.weather[0].description;
            temperature.innerText = `${Math.trunc(resultsApi.current.temp)}°C`;
            lacalisation.innerText = resultsApi.timezone;

            // Initialize a new hour
            let actualHour = new Date().getHours();

            // Display hours every 3 hours
            for (let i = 0; i < hourForecastName.length; i++) {
                let iterateHour = actualHour + i * 3;

                if (iterateHour > 24) {
                    hourForecastName[i].innerText = `${iterateHour - 24} h`;
                } else if (iterateHour === 24) {
                    hourForecastName[i].innerText = "00 h";
                } else {
                    hourForecastName[i].innerText = `${iterateHour} h`;
                }
            }

            // Display Temp every 3 hours
            for (let j = 0; j < hourForecastValue.length; j++) {
                hourForecastValue[j].innerText = `${Math.trunc(resultsApi.hourly[j * 3].temp)}°C`;
            }

            // Display third first letter of days

        })
}