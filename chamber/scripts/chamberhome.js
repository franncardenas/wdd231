const weatherSection = document.querySelector('.weather');
const apiKey = 'f97052b3b8a789b7348b4671b69928e9';
const lat = 47.8563;
const lon = -104.0447;

const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        const forecastList = data.list;
        const current = forecastList[0];
        const temp = current.main.temp;
        const description = current.weather[0].description;

        weatherSection.innerHTML = `
            <h2>Weather in Fairview</h2>
            <p>Temperature: ${temp}°C</p>
            <p>Condition: ${description}</p>
            `;

        const days = {};
        forecastList.forEach(item => {
            const date = new Date(item.dt * 1000).toISOString().split('T')[0]; // Get the date (YYYY-MM-DD)
            if (!days[date]) {
                days[date] = { high: item.main.temp_max, low: item.main.temp_min };
            } else {
                days[date].high = Math.max(days[date].high, item.main.temp_max);
                days[date].low = Math.min(days[date].low, item.main.temp_min);
            }
        });


        let forecastHTML = `<h2>3-day Forecast</h2>`;
        const dates = Object.keys(days);
        for (let i = 1; i <= 3 && i < dates.length; i++) {
            const date = dates[i];
            const { high, low } = days[date];

            forecastHTML += `
            <div>
                <h3>${date}</h3>
                <p>High: ${high}°C - Low: ${low}°C</p>
            </div>
            `;
        }
        weatherSection.innerHTML += forecastHTML;
    })
    .catch(error => {
        console.error('Problem with fetch operation:', error);
        weatherSection.innerHTML = `<p>Weather data cannot be loaded at this time.</p>`;
    });


fetch('./data/members.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response not ok');
        }
        return response.json();
    })
    .then(data => {
        // Filter for silver (2) and gold (3) membership levels
        const filteredMembers = Object.entries(data.companies)
            .filter(([_, companyData]) => companyData.membershipLevel === 2 || companyData.membershipLevel === 3);

        // Shuffle the filtered members array and select 3 random companies
        const randomCompanies = [];
        while (randomCompanies.length < 3 && filteredMembers.length > 0) {
            const randomIndex = Math.floor(Math.random() * filteredMembers.length);
            randomCompanies.push(filteredMembers[randomIndex]);
            filteredMembers.splice(randomIndex, 1); // Remove the selected company to avoid duplicates
        }

        // Display the selected companies
        const spotlightsSection = document.querySelector('.spotlights');
        randomCompanies.forEach(([name, companyData]) => {
            const companyDiv = document.createElement('div');
            companyDiv.classList.add('company');
            companyDiv.innerHTML = `
                <h3>${name}</h3>
                <img src="${companyData.imageFileName}" alt="${name} Logo">
                <p>Address: ${companyData.address}</p>
                <p>Phone: ${companyData.phoneNumber}</p>
                <p><a href="${companyData.website}" target="_blank">Visit Website</a></p>
            `;
            spotlightsSection.appendChild(companyDiv);
        });
    })
    .catch(error => {
        console.error('Problem with fetch operation:', error);
    });