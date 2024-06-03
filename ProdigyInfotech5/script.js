// script.js

const apiKey = 'Apikey'; // Replace with your OpenWeatherMap API key
const locationInput = document.getElementById('locationInput');
const searchBtn = document.getElementById('searchBtn');
const locationName = document.getElementById('locationName');
const temperature = document.getElementById('temperature');
const conditions = document.getElementById('conditions');

searchBtn.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        getWeather(location);
    }
});

function getWeather(location) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => {
            alert('Error fetching weather data');
            console.error('Error fetching weather data:', error);
        });
}

function displayWeather(data) {
    if (data.cod === '404') {
        alert('Location not found');
        return;
    }

    locationName.textContent = data.name;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    conditions.textContent = `Conditions: ${data.weather[0].description}`;
}

// Optionally, get weather for user's current location
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => displayWeather(data))
            .catch(error => {
                alert('Error fetching weather data');
                console.error('Error fetching weather data:', error);
            });
    });
}
