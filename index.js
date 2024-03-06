const apikey = "d40173811ae6b60e03636ba92ef2d912";

const weatherDataEl = document.getElementById("weather-data");

const cityInputEl = document.getElementById("city-input");

const formEL = document.querySelector("form");

formEL.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityValue = cityInputEl.value;
  getWeatherData(cityValue);
});
function process(value) {
  return encodeURIComponent(value.trim());
}
async function getWeatherData(cityValue) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=imperial&q=${process(
        cityValue
      )}&APPID=${apikey}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log(data);

    const temperature = Math.round(data.main.temp);

    const description = data.weather[0].description;

    const icon = data.weather[0].icon;
    const details = [
      `Feels like: ${Math.round(data.main.feels_like)} °F`,
      `Humidity: ${data.main.humidity} %`,
      `Wind speed: ${data.wind.speed} m/s`,
    ];

    weatherDataEl.querySelector(
      ".icon"
    ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" 
    alt="Weather Icon">`;

    weatherDataEl.querySelector(
      ".temperature"
    ).textContent = `${temperature}°F`;

    weatherDataEl.querySelector(".description").textContent = `${description}`;

    weatherDataEl.querySelector(".details").innerHTML = details
      .map((details) => `<div>${details}</div>`)
      .join("");
  } catch (error) {
    weatherDataEl.querySelector(".icon").innerHTML = "";

    weatherDataEl.querySelector(".temperature").textContent = "";

    weatherDataEl.querySelector(".description").textContent =
      " An error happened, please try again later";

    weatherDataEl.querySelector(".details").innerHTML = "";
  }
}
