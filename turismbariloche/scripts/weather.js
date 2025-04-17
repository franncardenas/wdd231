document.addEventListener("DOMContentLoaded", function () {
    const apiKey = '60203ebaa92c1129b975eb61cf7bbdfc';
    const cities = ["Bariloche", "El Bolson", "San Martin", "Puerto Madryn", "Trelew", "Villa Traful", "Villa La Angostura"];
    const weatherContainer = document.getElementById("weather9ja");

    if (!weatherContainer) {
        console.error("Element with ID 'weather9ja' not found!");
        return;
    }

    async function fetchWeather(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            return {
                city: city,
                temp: Math.round(data.main.temp),
                high: Math.round(data.main.temp_max),
                low: Math.round(data.main.temp_min),
                description: data.weather[0].description
            };
        } catch (error) {
            console.error("Error fetching weather data:", error);
            return null;
        }
    }

    async function displayWeather() {
        weatherContainer.innerHTML = "";
        for (const city of cities) {
            const weather = await fetchWeather(city);
            if (weather) {
                weatherContainer.innerHTML += `
                              <strong>${weather.city}</strong>
                              <p>${weather.temp}°F, ${weather.description} | High: ${weather.high}°F | Low: ${weather.low}°F</p>
                              <hr>
                          `;
            }
        }
    }

    displayWeather();
});
