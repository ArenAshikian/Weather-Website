# Weather App 🌤️

A simple weather app that allows users to search for weather details based on a city, zip code, coordinates, or landmark. The app provides current weather information, a 5-day forecast, and the option to toggle between Celsius and Fahrenheit. Additionally, it includes a dark mode toggle 🌙 for a better user experience.

## Features ⚡

- 🌍 **Search weather** by city, zip code, coordinates, or landmark.
- ☀️ **Current weather**: View temperature, humidity, wind speed, and more.
- 🌦️ **5-day forecast** with detailed weather conditions.
- 🌡️ **Toggle °C / °F**: Switch between Celsius and Fahrenheit units.
- 🌑 **Dark mode**: Switch between light and dark themes for better viewing at night.
- 📱 **Responsive**: Optimized for mobile devices.

## Technologies Used 🛠️

- **HTML**: Structure and content of the web page.
- **CSS**: Styling and layout.
- **JavaScript**: Fetch weather data from WeatherAPI and handle app functionality.
- **WeatherAPI**: API for fetching weather data.

## How to Use 👇

1. 🌐 Open the app in your web browser.
2. 📍 Enter a location (city, zip code, coordinates, or landmark) in the input field and click **"Search"**.
3. 🌡️ The app will display the **current weather** for the location.
4. ⛅ Below the current weather, you can view the **5-day weather forecast**.
5. 🔄 Use the **"Toggle °C / °F"** button to switch between Celsius and Fahrenheit.
6. 🌙 Use the **"Toggle Dark Mode"** button to switch between light and dark themes.

## Setup Instructions 🔧

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/weather-app.git
    ```

2. Navigate to the project directory:
    ```bash
    cd weather-app
    ```

3. Open the `index.html` file in your preferred browser.

## API Key 🔑

This app uses the [WeatherAPI](https://www.weatherapi.com/) to fetch weather data. To use the app, you'll need to sign up for an API key from WeatherAPI and replace the current API key in `index.js`:

```javascript
const response = await fetch(
  `https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${encodeURIComponent(query)}&aqi=no`
);
