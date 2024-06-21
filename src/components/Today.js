import React, { useState, useEffect } from "react";
import "./today.css";
import "./mediaqueries.css";
import searchImage from "./search.png";
import tempImage from "./tempImage.png";
import windImage from "./windImage.png";
import pressureImage from "./pressure.png";
import humidityImage from "./humidity.png";
import sunriseImage from "./sunrise.png";
import sunsetImage from "./sunset.png";

// Import weather condition images
import hazeImage from "./haze.png";
import thunderstormImage from "./thunderstorm.png";
import clearImage from "./clear.png";
import cloudsImage from "./clouds.png";
import rainConditionImage from "./rainCondition.png";
import snowImage from "./snow.png";
import mistImage from "./mist.png";

// Component to display the current date
const DisplayCurrentDate = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const weekday = weekdays[today.getDay()];
    const date = today.getDate();
    const month = months[today.getMonth()];

    const formattedDate = `${weekday}, ${month} ${date}`;
    setCurrentDate(formattedDate);
  }, []);

  return <div>{currentDate}</div>;
};

// Component to handle input text extraction and submission
const InputTextExtractor = ({ onSubmit }) => {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (e) => {
    setInputText(e.target.value.trim());
  };

  const handleSubmit = () => {
    try {
      if (inputText.trim() === "") {
        throw new Error("Input cannot be empty");
      }
      onSubmit(inputText);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="searchBar">
      <input
        className="search"
        type="text"
        value={inputText}
        onChange={handleInputChange}
      />
      <div className="icon">
        <button onClick={handleSubmit}>
          <img className="searchImage" src={searchImage} alt="" />
        </button>
      </div>
    </div>
  );
};

// Main component to display weather information and manage state
const Today = () => {
  const [city, setCity] = useState("Kolkata");
  const [weather, setWeather] = useState({
    name: "",
    temp: "",
    summary: "",
    feelsLike: "",
    wind: "",
    humidity: "",
    pressure: "",
    sunrise: "",
    sunset: "",
  });

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=72fdc2d1e36103ccf84d0edec344ff1e&units=metric`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const data = await response.json();
        setWeather({
          name: data.name,
          temp: data.main.temp,
          summary: data.weather[0].main,
          feelsLike: data.main.feels_like,
          wind: data.wind.speed,
          humidity: data.main.humidity,
          pressure: data.main.pressure,
          sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
          sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
        });
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, [city]);

  const handleCitySubmit = (inputText) => {
    setCity(inputText);
  };

  const getWeatherImage = (weatherCondition) => {
    switch (weatherCondition.toLowerCase()) {
      case "haze":
        return hazeImage;
      case "thunderstorm":
        return thunderstormImage;
      case "clear":
        return clearImage;
      case "clouds":
        return cloudsImage;
      case "pressure":
        return rainConditionImage;
      case "snow":
        return snowImage;
      case "mist":
        return mistImage;
      default:
        return clearImage;
    }
  };

  return (
    <>
      <div className="main1">
        <div className="todayWeather">
          <div className="date">
            <DisplayCurrentDate />
          </div>
          <div className="weatherIcon">
            <img
              className="currWeatherIcon"
              src={getWeatherImage(weather.summary)}
              alt={weather.summary}
            />
          </div>
          <div className="temperature">{weather.temp} °C</div>
          <div className="city">{weather.name}</div>
          <div className="summary">{weather.summary}</div>
        </div>
        <div className="todayOthers">
          <InputTextExtractor onSubmit={handleCitySubmit} />
          <div className="first">
            <span>
              <div className="left">
                <div className="heading">Feels like</div>
                <div className="content">{weather.feelsLike} °C</div>
              </div>
              <div className="right">
                <img className="tempImage" src={tempImage} alt="" />
              </div>
            </span>
            <span>
              <div className="left">
                <div className="heading">Wind Speed</div>
                <div className="content">{weather.wind} m/s</div>
              </div>
              <div className="right">
                <img className="windImage" src={windImage} alt="" />
              </div>
            </span>
          </div>
          <div className="second">
            <span>
              <div className="left">
                <div className="heading">Humidity</div>
                <div className="content">{weather.humidity} %</div>
              </div>
              <div className="right">
                <img className="humidityImage" src={humidityImage} alt="" />
              </div>
            </span>
            <span>
              <div className="left">
                <div className="heading">Pressure</div>
                <div className="content">{weather.pressure}</div>
              </div>
              <div className="right">
                <img className="pressureImage" src={pressureImage} alt="" />
              </div>
            </span>
          </div>
          <div className="third">
            <span>
              <div className="left">
                <div className="heading">Sunrise</div>
                <div className="content">{weather.sunrise}</div>
              </div>
              <div className="right">
                <img className="sunriseImage" src={sunriseImage} alt="" />
              </div>
            </span>
            <span>
              <div className="left">
                <div className="heading">Sunset</div>
                <div className="content">{weather.sunset}</div>
              </div>
              <div className="right">
                <img className="sunsetImage" src={sunsetImage} alt="" />
              </div>
            </span>
          </div>
        </div>
      </div>

      <div className="main2">
        <div className="todayWeatherCover">
          <div className="todayWeather">
            <div className="date">
              <DisplayCurrentDate />
            </div>
            <div className="weatherIcon">
              <img
                className="currWeatherIcon"
                src={getWeatherImage(weather.summary)}
                alt={weather.summary}
              />
            </div>
            <div className="temperature">{weather.temp} °C</div>
            <div className="city">{weather.name}</div>
            <div className="summary">{weather.summary}</div>
          </div>
        </div>
        <div className="todayOthers2">
          <div className="search2">
          <InputTextExtractor onSubmit={handleCitySubmit} />
          </div>
          <div className="first">
            <span>
              <div className="left">
                <div className="heading">Feels like</div>
                <div className="content">{weather.feelsLike} °C</div>
              </div>
              <div className="right">
                <img className="tempImage" src={tempImage} alt="" />
              </div>
            </span>
            <span>
              <div className="left">
                <div className="heading">Wind Speed</div>
                <div className="content">{weather.wind} m/s</div>
              </div>
              <div className="right">
                <img className="windImage" src={windImage} alt="" />
              </div>
            </span>
          </div>
          <div className="second">
            <span>
              <div className="left">
                <div className="heading">Humidity</div>
                <div className="content">{weather.humidity} %</div>
              </div>
              <div className="right">
                <img className="humidityImage" src={humidityImage} alt="" />
              </div>
            </span>
            <span>
              <div className="left">
                <div className="heading">Pressure</div>
                <div className="content">{weather.pressure}</div>
              </div>
              <div className="right">
                <img className="pressureImage" src={pressureImage} alt="" />
              </div>
            </span>
          </div>
          <div className="third">
            <span>
              <div className="left">
                <div className="heading">Sunrise</div>
                <div className="content">{weather.sunrise}</div>
              </div>
              <div className="right">
                <img className="sunriseImage" src={sunriseImage} alt="" />
              </div>
            </span>
            <span>
              <div className="left">
                <div className="heading">Sunset</div>
                <div className="content">{weather.sunset}</div>
              </div>
              <div className="right">
                <img className="sunsetImage" src={sunsetImage} alt="" />
              </div>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Today;
