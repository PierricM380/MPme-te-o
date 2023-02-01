const apiKey = '955c77183754066bcfc64d9e176b7e5e';
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
        console.log(data);
    })
} 