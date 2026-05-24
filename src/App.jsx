import { useState } from 'react';
import './App.css';
import { motion } from 'framer-motion';

function App() {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  // New state to hold the actual weather data object from the API
  const [weather, setWeather] = useState(null);

  // Replace YOUR_API_KEY_HERE with your actual OpenWeatherMap API key string
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; 

  const handleSearch = async (e) => {
    e.preventDefault();

    // Requirement #4: Front-end error checking (empty input)
    if (!city.trim()) {
      setError('Please enter a city name!');
      setWeather(null);
      return;
    }

    try {
      // Fetching the data using imperial units (Fahrenheit). Use 'metric' for Celsius.
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_KEY}`
      );

      // Requirement #4: API error checking (City not found / 404)
      if (response.status === 404) {
        setError('City not found. Please check your spelling and try again.');
        setWeather(null);
        return;
      }

      if (!response.ok) {
        throw new Error('Something went wrong with the network request.');
      }

      const data = await response.json();
      
      // If everything passes, clear errors and save the data
      setError('');
      setWeather(data);
    } catch (err) {
      setError('Network error. Please check your internet connection.');
      setWeather(null);
    }
  };

  const getWeatherClass = () => {
  if (!weather) return 'default-bg';
  
  // OpenWeatherMap returns conditions like "Clear", "Clouds", "Rain", "Snow", etc.
  const condition = weather.weather[0].main.toLowerCase();
  
  if (condition.includes('clear')) return 'clear-bg';
  if (condition.includes('cloud')) return 'clouds-bg';
  if (condition.includes('rain') || condition.includes('drizzle')) return 'rain-bg';
  
  return 'default-bg'; // Fallback for other weather types
};

return (
  // Update your main wrapper div to use this dynamic class name:
  <div className={`app-container ${getWeatherClass()}`}>
    <h1>Real-Time Weather Dashboard</h1>
    
    <form onSubmit={handleSearch}>
      <input 
        type="text" 
        placeholder="Enter city name (e.g., Rexburg)..." 
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>

    {error && <p className="error-message">{error}</p>}

    {weather && !error && (
      /* We changed 'div' to 'motion.div' and added the animation rules */
      <motion.div 
        key={weather.name}
        className="weather-card"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}  // Starts invisible, slightly lower, and shrunk
        animate={{ opacity: 1, y: 0, scale: 1 }}     // Animates to fully visible, normal position
        transition={{ duration: 0.5, ease: "easeOut" }} // Takes 0.5 seconds with a smooth slowdown
      >
        <h2>Weather in {weather.name}, {weather.sys.country}</h2>
        <img 
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
          alt={weather.weather[0].description} 
        />
        <h3>{Math.round(weather.main.temp)}°F</h3>
        <p className="condition">Condition: {weather.weather[0].description}</p>
        <div className="details">
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} mph</p>
        </div>
      </motion.div>
    )}
  </div>
);
}

export default App;