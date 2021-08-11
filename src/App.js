import { useEffect, useState, useCallback } from "react";
import _ from "lodash";
import WeatherCard from "./components";
import './App.css';

function App() {
const [location, setLocation] = useState("");
const [currentWeather, setCurrentWeather] = useState({})
const [currentWeatherCondition, setCurrentWeatherCondition] = useState("")
const [currentWeatherIcon, setCurrentWeatherIcon] = useState("")
const [upcomingDays, setUpcomingDays] = useState([])
const [lat, setLat] = useState(6.7027591);
const [lng, setLng] = useState(3.4696459);

// debounce call to the location api
const delayCall = useCallback(
  _.debounce((location) => getLatLng(location), 500),
  []
);

  async function getLatLng(location) {
    try {
      const response = await fetch(`https://google-maps-geocoding.p.rapidapi.com/geocode/json?language=en&address=${location}`, {
          method: 'GET',
          headers: {
              "x-rapidapi-host": "google-maps-geocoding.p.rapidapi.com",
              "x-rapidapi-key": "feb5a7b223msh76b7a43e38446bfp1eb31ajsne300800cf916"
          }
      });

      const data = await response.json()
      if (data.length < 1) {
          return console.log('not found')
      }

      setLat(data.results[0].geometry.location.lat)      
      setLng(data.results[0].geometry.location.lng)
  }
  catch (error) {
      console.error(error.message);
  };
  }

  useEffect(() => {
  (async function () {
    await handleGetWeatherForecast (lat, lng)
  })()
  }, [])

  function handleLocationValue (e) {
    delayCall(e.target.value)
  }

  async function handleGetWeatherForecast (lat, lng) {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=45bb604b9ab63b565878da914e9f5edc&exclude=minutely,hourly,alerts`)
      const data = await response.json();
      setCurrentWeather(data?.current)
      setCurrentWeatherCondition(data?.current?.weather[0].main)
      setCurrentWeatherIcon(data?.current?.weather[0].icon)
      setUpcomingDays(data?.daily)
      setLocation(data?.timezone)


    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="App">
       <section className="container">
       <section className="left-column">
       <div className="top">
                    <div className="search-div">
                      <input type="text" placeholder="Location" className="search-input"  onChange={e => handleLocationValue(e)} />
                      <span className="search-btn" onClick={() => handleGetWeatherForecast(lat, lng)}><i className="fas fa-search-location"></i></span>
                    </div>
                    <p className="current-weather">{currentWeatherCondition}</p>
                    <p className="city">{location}</p>
                    <img className="img" src={`https://openweathermap.org/img/wn/${currentWeatherIcon}@2x.png`} alt="weather-icon" width="30%" />
                    <p className="current-temp">{Math.floor(currentWeather.temp)}°</p>
                </div>
                <div className="bottom">
                    <div className="weather">
                        {upcomingDays && upcomingDays.map((day, i) => (
                          <WeatherCard key={i+1} day={day} />
                        ))}
                    </div>
                </div>
       </section>
       </section>
    </div>
  );
}

export default App;
