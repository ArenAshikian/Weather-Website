// Initial states for temperature unit (Celsius) and dark mode
let isCelsius = true;
let isDarkMode = false;

// Event listener for the search button
document.getElementById('searchButton').addEventListener('click', async () => {
  const location = document.getElementById('location').value.trim();
  const errorElement = document.getElementById('error');
  const weatherDetails = document.getElementById('weatherDetails');
  const forecastDetails = document.getElementById('forecastDetails');

  // Check if location input is empty
  if (!location) {
    errorElement.textContent = 'Please enter a location (e.g., city, zip code, coordinates, or landmark).';
    return;
  }

  // Clear previous error and show loading message
  errorElement.textContent = '';
  weatherDetails.innerHTML = 'Loading...';
  forecastDetails.innerHTML = '';

  try {
    let query = location;

    // Check if input looks like GPS coordinates (latitude,longitude)
    if (/^-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?$/.test(location)) {
      const [latitude, longitude] = location.split(',').map(coord => coord.trim());
      query = `${latitude},${longitude}`;
    }

    // Fetch weather data from the API
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=YOURKEYHERE&q=${encodeURIComponent(query)}&days=5&aqi=no`
    );

    // If the API response is not OK, throw an error
    if (!response.ok) {
      throw new Error('Could not fetch weather for the specified location.');
    }

    const data = await response.json();

    // Function to convert Celsius to Fahrenheit
    const toFahrenheit = (tempC) => (tempC * 9/5) + 32;

    // Determine temperature based on user's unit preference (Celsius/Fahrenheit)
    const temperature = (isCelsius) ? `${data.current.temp_c}°C` : `${toFahrenheit(data.current.temp_c).toFixed(1)}°F`;
    const feelsLike = (isCelsius) ? `${data.current.feelslike_c}°C` : `${toFahrenheit(data.current.feelslike_c).toFixed(1)}°F`;

    // Display current weather information
    weatherDetails.innerHTML = `
      <p><strong>${data.location.name}, ${data.location.country}</strong></p>
      <p><img src="https:${data.current.condition.icon}" alt="${data.current.condition.text}" /></p>
      <p>${data.current.condition.text}</p>
      <p><strong>${temperature}</strong></p>
      <p>Feels like: ${feelsLike}</p>
      <p>Humidity: ${data.current.humidity}%</p>
      <p>Wind Speed: ${data.current.wind_kph} kph</p>
    `;

    // Display 5-day weather forecast
    forecastDetails.innerHTML = '<h2>5-Day Forecast</h2>';
    data.forecast.forecastday.forEach(day => {
      const maxTemp = (isCelsius) ? `${day.day.maxtemp_c}°C` : `${toFahrenheit(day.day.maxtemp_c).toFixed(1)}°F`;
      const minTemp = (isCelsius) ? `${day.day.mintemp_c}°C` : `${toFahrenheit(day.day.mintemp_c).toFixed(1)}°F`;

      forecastDetails.innerHTML += `
        <div>
          <h3>${day.date}</h3>
          <p><img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}" /></p>
          <p><strong>Max Temp:</strong> ${maxTemp}</p>
          <p><strong>Min Temp:</strong> ${minTemp}</p>
          <p><strong>Condition:</strong> ${day.day.condition.text}</p>
        </div>
      `;
    });
  } catch (err) {
    // Display error message if something goes wrong
    errorElement.textContent = err.message;
    weatherDetails.innerHTML = '';
    forecastDetails.innerHTML = '';
  }
});

// Toggle between Celsius and Fahrenheit
document.getElementById('toggleTemperatureUnit').addEventListener('click', () => {
  isCelsius = !isCelsius;
  // Change the text of the button based on the current unit
  document.getElementById('toggleTemperatureUnit').textContent = isCelsius ? '°C' : '°F';
  // You can trigger the search again or update the displayed data here if needed.
});

// Toggle Dark Mode
document.getElementById('toggleDarkMode').addEventListener('click', () => {
  isDarkMode = !isDarkMode;
  // Toggle the dark mode class on body and weather app container
  document.body.classList.toggle('dark-mode', isDarkMode);
  document.querySelector('.weather-app').classList.toggle('dark-mode', isDarkMode);
});
