document.getElementById('search-btn').addEventListener('click', function() {
    const location = document.getElementById('location-input').value;
    if (location) {
        getWeather(location);
    } else {
        alert('Please enter a location.');
    }
});

function getWeather(location) {
    const apiKey = '89b19519f7ad8ff73164072927730383'; // Replace with your actual API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again later.');
        });
}

function displayWeather(data) {
    if (data.cod === '404') {
        alert('Location not found. Please try again.');
        return;
    }

    const cityName = data.name;
    const temperature = data.main.temp;
    const weather = data.weather[0].description;
    const icon = data.weather[0].icon;

    document.getElementById('city-name').textContent = cityName;
    document.getElementById('temperature').textContent = `${temperature}°C`;
    document.getElementById('description').textContent = weather;
    document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

    document.querySelector('.weather-info').classList.remove('hidden');
}
