import React, {useState, useEffect}  from 'react';
import axios from 'axios';

//background images

import sunnyBackground from './images/sunny.jpg'; // Import your background images
import rainyBackground from './images/rainy.jpg';
import cloudyBackground from './images/cloudy.jpg';
import thunderBackground from './images/thunder.jpg';
import hazeBackground from './images/haze.jpg';
import mistBackground from './images/mist.jpg';


function App() {

  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
 const [check, setCheck]= useState(true);
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [backgroundImage, setBackgroundImage] = useState(null); // State for background image


  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`

  const backgroundMappings = {
    Clear: sunnyBackground,
    Rain: rainyBackground,
    Clouds: cloudyBackground,
    Thunderstorm: thunderBackground,
    Haze: hazeBackground,
    Mist: mistBackground
    // Add more mappings as needed for other weather conditions
  };
 
  
  
  useEffect(() => {
    // Simulate loading 
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [])
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      setCheck(false);
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data);
        
        const weatherCondition = response.data.weather[0].main;
        setBackgroundImage(backgroundMappings[weatherCondition]);
        

      })
      setLocation('')
    }
  };

  return (
    <div>
    
    <div className="app" style={{ background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),url(${backgroundImage}) no-repeat center center/cover`}}>
    {check ? null : <div className="opacity fade"></div>}
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°C</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }



      </div>
    </div>
    </div>
  );
}

export default App;