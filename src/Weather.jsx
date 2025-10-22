import React, { useState, useEffect } from "react";
import {
  Cloud,
  Sun,
  CloudRain,
  Wind,
  Droplets,
  Eye,
  Gauge,
  MapPin,
  Search,
  Loader,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function WeatherApp() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [unit, setUnit] = useState("metric");

  useEffect(() => {
    getCurrentLocationWeather();
  }, []);

  const getCurrentLocationWeather = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoords(
            position.coords.latitude,
            position.coords.longitude
          );
        },
        () => {
          setError("Unable to get your location. Please search for a city.");
          setLoading(false);
        }
      );
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      setLoading(true);
      setError("");

      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=2c1cc1b2f96b43e5a5e1e7f3f3f3f3f3`
      );

      if (!weatherRes.ok) throw new Error("Weather data not found");

      const weatherData = await weatherRes.json();
      setWeather(weatherData);

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=2c1cc1b2f96b43e5a5e1e7f3f3f3f3f3`
      );

      if (forecastRes.ok) {
        const forecastData = await forecastRes.json();
        const dailyForecast = forecastData.list
          .filter((item, i) => i % 8 === 0)
          .slice(0, 5);
        setForecast(dailyForecast);
      }
    } catch (err) {
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  const searchWeather = async (e) => {
    e.preventDefault();
    if (!location.trim()) return;

    try {
      setLoading(true);
      setError("");

      const geoRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=2c1cc1b2f96b43e5a5e1e7f3f3f3f3f3`
      );

      const geoData = await geoRes.json();

      if (geoData.length === 0) {
        throw new Error("Location not found");
      }

      fetchWeatherByCoords(geoData[0].lat, geoData[0].lon);
    } catch (err) {
      setError("Location not found. Please try again.");
      setLoading(false);
    }
  };

  const getWeatherIcon = (main) => {
    const icons = {
      Clear: Sun,
      Clouds: Cloud,
      Rain: CloudRain,
      Drizzle: CloudRain,
      Thunderstorm: CloudRain,
      Snow: Cloud,
      Mist: Cloud,
      Smoke: Cloud,
      Haze: Cloud,
      Dust: Cloud,
      Fog: Cloud,
      Sand: Cloud,
      Ash: Cloud,
      Squall: Wind,
      Tornado: Wind,
    };
    return icons[main] || Cloud;
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const WeatherIcon = weather ? getWeatherIcon(weather.weather[0].main) : Cloud;

  return (
    <div className="weather-container">
      <div className="weather-inner">
        <div className="weather-header">
          <h1>Weather Forecast</h1>
          <p>Your personal weather companion</p>
        </div>

        <form onSubmit={searchWeather} className="search-form">
          <div className="search-bar">
            <div className="input-group">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Search for a city..."
              />
            </div>
            <button type="submit" className="btn search-btn">
              Search
            </button>
            <button
              type="button"
              onClick={getCurrentLocationWeather}
              className="btn map-btn"
            >
              <MapPin size={20} />
            </button>
          </div>
        </form>

        {error && <div className="error-box">{error}</div>}

        {loading && (
          <div className="loading">
            <Loader className="spin" size={48} />
          </div>
        )}

        {!loading && weather && (
          <div className="weather-content">
            <div className="weather-card">
              <div className="weather-top">
                <div>
                  <h2>{weather.name}</h2>
                  <p>{weather.sys.country}</p>
                </div>
                <div className="unit-toggle">
                  <button
                    onClick={() => setUnit("metric")}
                    className={unit === "metric" ? "active" : ""}
                  >
                    °C
                  </button>
                  <button
                    onClick={() => setUnit("imperial")}
                    className={unit === "imperial" ? "active" : ""}
                  >
                    °F
                  </button>
                </div>
              </div>

              <div className="weather-main">
                <div className="temp-section">
                  <WeatherIcon size={64} className="weather-icon" />
                  <div>
                    <div className="temperature">
                      {Math.round(weather.main.temp)}°
                    </div>
                    <div className="description">
                      {weather.weather[0].description}
                    </div>
                  </div>
                </div>
                <div className="feels-like">
                  Feels like {Math.round(weather.main.feels_like)}°
                </div>
              </div>

              <div className="weather-stats">
                <div className="stat">
                  <Wind size={20} />
                  <span>Wind</span>
                  <strong>
                    {Math.round(weather.wind.speed)}{" "}
                    {unit === "metric" ? "m/s" : "mph"}
                  </strong>
                </div>
                <div className="stat">
                  <Droplets size={20} />
                  <span>Humidity</span>
                  <strong>{weather.main.humidity}%</strong>
                </div>
                <div className="stat">
                  <Eye size={20} />
                  <span>Visibility</span>
                  <strong>{(weather.visibility / 1000).toFixed(1)} km</strong>
                </div>
                <div className="stat">
                  <Gauge size={20} />
                  <span>Pressure</span>
                  <strong>{weather.main.pressure} hPa</strong>
                </div>
              </div>
            </div>

            {forecast.length > 0 && (
              <div className="forecast-section">
                <h3>5-Day Forecast</h3>
                <div className="forecast-grid">
                  {forecast.map((day, i) => {
                    const DayIcon = getWeatherIcon(day.weather[0].main);
                    return (
                      <div key={i} className="forecast-card">
                        <div className="forecast-date">{formatDate(day.dt)}</div>
                        <DayIcon size={32} />
                        <div className="forecast-temp">
                          {Math.round(day.main.temp)}°
                        </div>
                        <div className="forecast-desc">
                          {day.weather[0].description}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        .weather-container {
          min-height: 100vh;
          background: linear-gradient(to bottom right, #3b82f6, #2563eb, #1d4ed8);
          padding: 20px;
          color: white;
          font-family: 'Poppins', sans-serif;
        }

        .weather-inner {
          max-width: 900px;
          margin: auto;
        }

        .weather-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .weather-header h1 {
          font-size: 2.5rem;
          margin-bottom: 10px;
        }

        .weather-header p {
          color: #dbeafe;
        }

        .search-form {
          margin-bottom: 20px;
        }

        .search-bar {
          display: flex;
          gap: 10px;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
        }

        .input-group {
          position: relative;
          flex: 1;
          min-width: 250px;
        }

        .input-group input {
          width: 100%;
          padding: 12px 12px 12px 36px;
          border-radius: 8px;
          border: none;
          outline: none;
          font-size: 1rem;
        }

        .search-icon {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          color: gray;
        }

        .btn {
          padding: 12px 18px;
          border: none;
          border-radius: 8px;
          background: white;
          color: #1d4ed8;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s;
        }

        .btn:hover {
          background: #e0e7ff;
        }

        .error-box {
          max-width: 600px;
          margin: 20px auto;
          padding: 12px;
          background: #fee2e2;
          color: #991b1b;
          border-radius: 8px;
          text-align: center;
        }

        .loading {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 50px 0;
        }

        .spin {
          animation: spin 1.5s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .weather-card {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          padding: 20px;
          margin-bottom: 20px;
          backdrop-filter: blur(10px);
        }

        .weather-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .unit-toggle button {
          margin-left: 8px;
          padding: 6px 10px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.3);
          color: white;
        }

        .unit-toggle .active {
          background: white;
          color: #1d4ed8;
          font-weight: bold;
        }

        .weather-main {
          margin-top: 20px;
        }

        .temp-section {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .temperature {
          font-size: 3.5rem;
          font-weight: bold;
        }

        .description {
          text-transform: capitalize;
          color: #bfdbfe;
        }

        .feels-like {
          margin-top: 10px;
          color: #dbeafe;
        }

        .weather-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
          gap: 10px;
          margin-top: 20px;
        }

        .stat {
          background: rgba(255,255,255,0.15);
          border-radius: 12px;
          padding: 10px;
          text-align: center;
        }

        .forecast-section {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          padding: 20px;
        }

        .forecast-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
          gap: 10px;
        }

        .forecast-card {
          background: rgba(255,255,255,0.15);
          border-radius: 12px;
          padding: 10px;
          text-align: center;
        }

        .forecast-date {
          color: #bfdbfe;
          font-weight: 500;
        }

        .forecast-temp {
          font-size: 1.5rem;
          font-weight: bold;
        }

        .forecast-desc {
          text-transform: capitalize;
          color: #dbeafe;
          font-size: 0.9rem;
        }

        /* Mobile Responsive Styles */
        @media (max-width: 600px) {
          .weather-header h1 {
            font-size: 1.8rem;
          }
          .temperature {
            font-size: 2.5rem;
          }
          .weather-card, .forecast-section {
            padding: 15px;
          }
          .search-bar {
            flex-direction: column;
          }
          .btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
