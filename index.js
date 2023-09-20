const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const bimage = document.querySelector("body");

search.addEventListener("click", () => {
  const APIKEY = "3393799bd9b85289114e72be14279836";
  const city = document.querySelector(".search-box input").value;

  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKEY}`
  )
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      if (json.cod === "404") {
        bimage.style.backgroundImage = "url(./images/default.jpg)";
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      }

      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      switch (json.weather[0].main) {
        case "Smoke":
          image.src = "icons/mist.png";
          bimage.style.backgroundImage = "url(./images/smoke.jpg)";
          break;

        case "Clear":
          image.src = "icons/clear.png";
          bimage.style.backgroundImage = "url(./images/clear.jpg)";
          break;

        case "Rain":
          image.src = "icons/rain.png";
          bimage.style.backgroundImage = "url(./images/rain.jpg)";
          break;

        case "Snow":
          image.src = "icons/snow.png";
          bimage.style.backgroundImage = "url(./images/snow.jpg)";
          break;

        case "Clouds":
          image.src = "icons/cloud.png";
          bimage.style.backgroundImage = "url(./images/cloud.jpg)";
          break;

        case "Mist":
          image.src = "icons/mist.png";
          bimage.style.backgroundImage = "url(./images/mist.jpg)";
          break;

        case "Haze":
          image.src = "icons/mist.png";
          bimage.style.backgroundImage = "url(./images/mist.jpg)";
          break;

        default:
          image.src = "";
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity} %`;
      wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;

      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "540px";
    });
});
