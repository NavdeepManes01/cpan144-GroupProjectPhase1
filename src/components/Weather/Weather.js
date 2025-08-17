import { useState } from 'react';
import styles from './Weather.module.css';

export default function WeatherPage() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (e) => {
    e.preventDefault();
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch weather data');
      }

      const data = await response.json();
      setWeather(data.data);

    } catch (err) {
      setError(err.message || 'An error occurred');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className={styles.container}>
        <h1>Weather Forecast</h1>
        
        <form onSubmit={fetchWeather} className={styles.form}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className={styles.input}
            disabled={loading}
          />
          <button 
            type="submit" 
            className={styles.button}
            disabled={loading || !city.trim()}
          >
            {loading ? 'Loading...' : 'Get Weather'}
          </button>
        </form>

        {error && (
          <div className={styles.error}>
            <p>⚠️ {error}</p>
            <p>Try searching for cities like "London", "Tokyo", or "New York"</p>
          </div>
        )}

        {weather && (
          <div className={styles.weatherCard}>
            <h2>
              {weather.location.name}, {weather.location.country}
            </h2>
            <div className={styles.weatherGrid}>
              <div className={styles.weatherPrimary}>
                <img 
                  src={`https:${weather.current.icon}`} 
                  alt={weather.current.condition}
                  className={styles.weatherIcon}
                />
                <p className={styles.temp}>{weather.current.temp_c}°C</p>
                <p className={styles.condition}>{weather.current.condition}</p>
              </div>
              <div className={styles.weatherDetails}>
                <p><strong>Humidity:</strong> {weather.current.humidity}%</p>
                <p><strong>Wind:</strong> {weather.current.wind_kph} km/h</p>
                <p><strong>Feels Like:</strong> {weather.current.feelslike_c}°C</p>
              </div>
            </div>
          </div>
        )}
      </div>
  );
}