import { useState } from 'react';
import './App.css';
import { motion } from 'framer-motion';

function App() {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [weather, setWeather] = useState(null);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; 

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!city.trim()) {
      setError('Please enter a city name!');
      setWeather(null);
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_KEY}`
      );

      if (response.status === 404) {
        setError('City not found. Please check your spelling and try again.');
        setWeather(null);
        return;
      }

      if (!response.ok) {
        throw new Error('Something went wrong with the network request.');
      }

      const data = await response.json();
      
      setError('');
      setWeather(data);
    } catch (err) {
      setError('Network error. Please check your internet connection.');
      setWeather(null);
    }
  };

  const getWeatherClass = () => {
  if (!weather) return 'default-bg';
  
  const condition = weather.weather[0].main.toLowerCase();
  
  if (condition.includes('clear')) return 'clear-bg';
  if (condition.includes('cloud')) return 'clouds-bg';
  if (condition.includes('rain') || condition.includes('drizzle')) return 'rain-bg';
  
  return 'default-bg';
};

return (
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
      <motion.div 
        key={weather.name}
        className="weather-card"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
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