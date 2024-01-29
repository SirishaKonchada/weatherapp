import { Oval } from "react-loader-spinner";
import React, { useState } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown } from "@fortawesome/free-solid-svg-icons";
import './App.css';

function GfGWeatherApp() {
  const [input, setInput] = useState('');
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false
  });
  const convertToDate = () => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const WeekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currDate = new Date();
    const date = `${WeekNames[currDate.getDay()]} ${currDate.getDate()} ${monthNames[currDate.getMonth()]}`;
    return date;
  }
  const search = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setInput('');
      setWeather({ ...weather, loading: true });
      const url = 'https://api.openweathermap.org/data/2.5/weather';
      const api_key = 'f00c38e0279b7bc85480c3fe775d518c';
      await axios.get(url, {
        params: {
          q: input,
          units: 'metric',
          appid: api_key
        },
      }).then(res => {
        console.log('Axios Response : ', res);
        setWeather({ data: res.data, loading: false, error: false })
      }).catch(err => {
        setWeather({ ...weather, error: true, data: {} });
        setInput('');
        console.log('Axios Err : ', err);
      })
    }
  }

  return (
    <div className="App">
      <h1 className="app-name">
        Weather App - ReactJS Project
      </h1>
      <div className="search-bar">
        <input
          type="text"
          className="city-search"
          placeholder="Enter city name..."
          value={input}
          onChange={e => setInput(e.target.value)}
          name='query'
          onKeyPress={search}
        />
      </div>
      {weather.loading &&
        <>
          <br />
          <br />
          <Oval type='Oval' color='black' height={100} width={100} />

        </>
      }
      {weather.error &&
        <>
          <br />
          <br />
          <span className="error-message">
            <FontAwesomeIcon icon={faFrown} />
            <span style={{ fontSize: '20px' }}>City Not Found</span>
          </span>
        </>
      }
      {weather && weather.data && weather.data.main &&
        <div>
          <div className="city-name">
            <h2>
              {weather.data.name}, <span>{weather.data.sys.country}</span>
            </h2>
          </div>
          <div className="date">
            <span>{convertToDate()}</span>
          </div>
          <div className="icon-temp">
            <img
              className=""
              src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
              alt={weather.data.weather[0].description}
            />
            {Math.round(weather.data.main.temp)}
            <span>&#8451;</span>
            <div className='des-wind'>
              <p>{weather.data.weather[0].description.toUpperCase()}</p>
              <p>Wind Speed: {weather.data.wind.speed}m/s</p>
              </div>
          </div>
        </div>
      }
    </div>
  )
}

export default GfGWeatherApp;