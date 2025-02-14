const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '527c181d13msh17ef39ae264c7bcp19b935jsnfee6a7e9ffb4',
        'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
    }
};

document.getElementById('cityForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('city').value;
    fetchWeather(city);
});

function fahrenheitToCelsius(fahrenheit) {
    return ((fahrenheit - 32) * 5) / 9;
}

async function fetchWeather(city) {
    const url = `https://open-weather13.p.rapidapi.com/city/${city}/EN`;
    const loading = document.getElementById('loading');
    const weatherResult = document.getElementById('weatherResult');
    loading.style.display = 'block';
    weatherResult.innerHTML = '';
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log('Full weather data:', result); // Mostrar toda la información en la consola
        result.main.temp = fahrenheitToCelsius(result.main.temp); // Convert temperature to Celsius
        displayWeather(result);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    } finally {
        loading.style.display = 'none';
    }
}

function displayWeather(data) {
    const weatherResult = document.getElementById('weatherResult');
    weatherResult.innerHTML = `
        <h2>Clima en ${data.name}</h2>
        <p>Temperatura: ${data.main.temp.toFixed(2)}°C</p>
        <p>Humedad: ${data.main.humidity}%</p>
        <p>Descripción: ${data.weather[0].description}</p>
    `;
}