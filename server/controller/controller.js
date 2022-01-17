/* jshint esversion:6 */
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

exports.create = (req, res) => {
  const query = req.body.cityName;
  const appKey = "bf937033edc7df59e27536bb39ba262c";
  const unit = "metric";
  const apiCall =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    appKey +
    "&units=" +
    unit;

  fetch(apiCall)
    .then((res) => res.json())
    .then((weatherData) => {
      if (weatherData.name == null) {
        res.render('weather', {
          name: "Ups something went wrong",
          temp: null,
          description: null,
          feelsLike: null,
          wind: null,
          imgURL: null,
          windIcon: null,
        });
      } else {
        const city = weatherData.name;
        const temp = Math.round(weatherData.main.temp * 10) / 10;
        const description = weatherData.weather[0].description;
        const feelsLike = Math.round(weatherData.main.feels_like * 10) / 10;
        const wind = weatherData.wind.speed;
        const iconId = weatherData.weather[0].icon;
        const imgURL = "http://openweathermap.org/img/wn/" + iconId + "@2x.png";
        const windIcon = "/images/wind.png";

        res.render("weather", {
          name: city,
          temp: temp + "°",
          description: description,
          feelsLike: "feels like " + feelsLike + "°",
          wind: wind + " km/h",
          imgURL: imgURL,
          windIcon: windIcon,
        });
        
      }
    });
};
