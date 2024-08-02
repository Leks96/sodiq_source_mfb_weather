import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { TiWeatherWindy } from "react-icons/ti";
import { BsDroplet } from "react-icons/bs";

const WeatherData = () => {
    const [location, setLocation] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_KEY = 'b3ad38c565232f6bbc345724d6416f9c'

    const fetchWeatherData = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`);
            if (!response.ok) {
                throw new Error('Weather data not found');
            }
            const data = await response.json();
            console.log(data);
            setWeatherData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

  return (
    <>
        <header>
            <div className="searchCon">
                <form className="weather_search" onSubmit={fetchWeatherData}>
                    <input 
                    type="text"
                    value={location}
                    onChange={(e) => {setLocation(e.target.value)}}
                    placeholder='enter city or zip code'
                    />
                    <button type='submit'>
                        <CiSearch />
                    </button>
                </form>
            </div>
        </header>
        <section className='weather_data_section'>
            <div className='weather_data_con'>
                <div className='loading'>
                    {loading && <div className='loader'></div>}
                </div>
                <div>
                    {error && <p>{error}</p>}
                </div>
                {!loading && !error && weatherData && (
                    <>
                        <div>
                            <div className='country'>
                                <p>{weatherData.name}, {weatherData.sys.country}</p>
                            </div>
                            <div className='other_data'>
                                <div className='real_data'>
                                    <h2>{Math.round(weatherData.main.temp - 273.15)}°C</h2>
                                    <div className='real_data_other'>
                                        <p>
                                            <BsDroplet />
                                            <span>
                                                {weatherData.main.humidity} %
                                            </span>
                                        </p>
                                        <p>
                                            <TiWeatherWindy /> 
                                            <span>
                                                {weatherData.wind.speed} m/s
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <h5>{weatherData.weather[0].description}</h5>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    </>
  )
}

export default WeatherData