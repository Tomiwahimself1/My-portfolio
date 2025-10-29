import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Wind, Droplets, Eye, Gauge, MapPin, Search, Loader } from 'lucide-react';
import { Link } from "react-router-dom";

export default function WeatherApp() {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ My WeatherMap API key
  const API_KEY = '3afe3b1c610e737da0195079a5d9fa16';

  const fetchWeather = async () => {
    if (!location) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`
      );
      const data = await res.json();
      if (data.cod === 200) {
        setWeather(data);
        const forecastRes = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${API_KEY}`
        );
        const forecastData = await forecastRes.json();
        setForecast(forecastData.list.slice(0, 5));
      } else {
        setWeather(null);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const getWeatherIcon = (main) => {
    switch (main) {
      case 'Clear': return <Sun size={64} color="#facc15" />;
      case 'Clouds': return <Cloud size={64} color="#9ca3af" />;
      case 'Rain': return <CloudRain size={64} color="#3b82f6" />;
      default: return <Wind size={64} color="#6b7280" />;
    }
  };

  useEffect(() => {
    const enterKey = (e) => e.key === 'Enter' && fetchWeather();
    window.addEventListener('keydown', enterKey);
    return () => window.removeEventListener('keydown', enterKey);
  });

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Weather App</h1>
        <div style={styles.searchBar}>
          <MapPin style={styles.icon} />
          <input
            type="text"
            placeholder="Enter city..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={styles.input}
          />
          <button onClick={fetchWeather} style={styles .searchBtn}>
            {loading ? <Loader className="animate-spin" /> : <Search />}
          </button>
        </div>

        {weather && (
          <div style={styles.weatherSection}>
            <div style={styles.mainInfo}>
              {getWeatherIcon(weather.weather[0].main)}
              <h2 style={styles.temp}>{Math.round(weather.main.temp)}°C</h2>
              <p style={styles.desc}>{weather.weather[0].description}</p>
            </div>

            <div style={styles.details}>
              <div style={styles.detailItem}><Droplets /> Humidity: {weather.main.humidity}%</div>
              <div style={styles.detailItem}><Wind /> Wind: {weather.wind.speed} m/s</div>
              <div style={styles.detailItem}><Gauge /> Pressure: {weather.main.pressure} hPa</div>
              <div style={styles.detailItem}><Eye /> Visibility: {weather.visibility / 1000} km</div>
            </div>
          </div>
        )}

        {forecast.length > 0 && (
          <div style={styles.forecast}>
            <h3 style={styles.subtitle}>Next Hours</h3>
            <div style={styles.forecastGrid}>
              {forecast.map((f, i) => (
                <div key={i} style={styles.forecastItem}>
                  {getWeatherIcon(f.weather[0].main)}
                  <p style={styles.forecastTime}>
                    {new Date(f.dt * 1000).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                  <p style={styles.forecastTemp}>{Math.round(f.main.temp)}°C</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Optional: Link back to home if part of a multi-page app */}
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
        </p>
      </div>
    </div>
  );
}

// ✅ Inline CSS styles
const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #93c5fd, #d8b4fe)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    color: '#111',
  },
  card: {
    background: '#ffffffcc',
    backdropFilter: 'blur(10px)',
    padding: '30px',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '450px',
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '20px',
    color: '#1e293b',
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px',
    background: '#f9fafb',
    borderRadius: '8px',
    padding: '5px 10px',
  },
  input: {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: '1rem',
    padding: '10px',
    background: 'transparent',
    color: 'black', 
  },
  searchBtn: {
    border: 'none',
    background: '#6366f1',
    color: 'white',
    padding: '10px',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  weatherSection: {
    marginTop: '20px',
  },
  mainInfo: {
    marginBottom: '15px',
  },
  temp: {
    fontSize: '3rem',
    fontWeight: 'bold',
    margin: '10px 0',
  },
  desc: {
    textTransform: 'capitalize',
    color: '#4b5563',
  },
  details: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
    textAlign: 'left',
    marginTop: '15px',
    fontSize: '0.9rem',
    color: '#374151',
  },
  detailItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  forecast: {
    marginTop: '30px',
  },
  subtitle: {
    fontWeight: '600',
    marginBottom: '10px',
    color: '#1e293b',
  },
  forecastGrid: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
    flexWrap: 'wrap',
  },
  forecastItem: {
    background: '#f1f5f9',
    borderRadius: '12px',
    padding: '10px',
    flex: '1',
    textAlign: 'center',
  },
  forecastTime: {
    fontSize: '0.9rem',
    color: '#6b7280',
  },
  forecastTemp: {
    fontWeight: '600',
  },
  
};