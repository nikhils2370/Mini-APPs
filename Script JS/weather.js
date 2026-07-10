const API_KEY = "94d6a8f6aa9596a180780afd9ea5fe23";
const weatherBtn = document.querySelector("#weather-btn");
const cityInput = document.querySelector("#city-input");
const weatherDisplay = document.querySelector("#display");
const loader = document.querySelector("#loader");
const errorDiv = document.querySelector("#error");


const cityName = document.querySelector("#city-name");
const temperature = document.querySelector("#temperature")
const condition = document.querySelector("#condition")
const humidity = document.querySelector("#humidity")
const weatherIcon = document.querySelector("#weather-icon")


cityInput.addEventListener("keyup", (e) => {
  // console.log(e.key);
  if (e.key == "Enter") {
    fetchWeather()
  } else {
    ""
  }
})


weatherBtn.addEventListener("click", fetchWeather);
async function fetchWeather() {
  const city = cityInput.value.trim();
  if (!city) return;

  errorDiv.classList.add("hidden");
  weatherDisplay.classList.add("hidden");
  loader.classList.remove("hidden");

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`,
    );
    const data = await response.json();

    loader.classList.add("hidden");

    if (response.ok) {

      cityName.innerText = `${data.name}, ${data.sys.country}`;
      temperature.innerText = `${Math.round(data.main.temp)}°C`;
      condition.innerText = data.weather[0].description;
      humidity.innerText = `${data.main.humidity}%`;
      weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      


      weatherDisplay.classList.remove("hidden");
    } else {
      showError(data.message);
    }
  } catch {
    loader.classList.add("hidden");
    showError("Failed to pull weather data.");
  }
}

function showError(msg) {
  errorDiv.innerText = msg.charAt(0).toUpperCase() + msg.slice(1);
  errorDiv.classList.remove("hidden");
}
