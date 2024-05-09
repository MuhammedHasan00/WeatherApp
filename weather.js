const apiKey = "53d6d20f33cdaff6aea32079af4cc46c";
const apiLink =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const searchBox = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherVideo = document.querySelector(".weather-video");
const appBackground = document.querySelector(".container");
const cityErrorMessage = document.querySelector(".city-error");

async function checkWeather(city) {
  try{
    const response = await fetch(apiLink + city + `&appid=${apiKey}`);
    // if (response == 404){
    //   cityErrorMessage.style.display = "flex";
    // }else
    if (!response.ok) {
    throw new Error("Fetch Failed");
    //added error handling so that if the fetch fails we can check in the console
    } 
    let data = await response.json();
    cityErrorMessage.style.display = "none";
    displayWeather(data);
  }catch(error){
    cityErrorMessage.style.display = "block"
    
  }
}

function displayWeather(data){
  console.log(data);
  try {
    document.querySelector(".live-weather").textContent = data.weather[0].main;
    document.querySelector(".temperature").textContent =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".city").textContent = data.name;
    document.querySelector(".humidity").textContent =
      data.main.humidity + "% Humidity";
    document.querySelector(".wind").textContent =
      data.wind.speed + "km/h Wind Speed";
    document.querySelector(".weather-video").style.display = "flex";

    const todaysWeather = data.weather[0].main;
    setBackground(todaysWeather)
  } catch (error) {
    console.error("Code failed", error);
  }
}

function setBackground(todaysWeather){
  try{
    switch (todaysWeather) {
    case "Clouds":
      weatherIcon.src = "cloudy.png";
      weatherVideo.src = "cloudy.mp4";
      appBackground.style.backgroundColor = "transparent"
      break;
    case "Clear":
      weatherIcon.src = "clear.png";
      weatherVideo.src = "sunny-background.mp4";
      appBackground.style.backgroundColor = "transparent"
      break;
    case "Rain":
      weatherIcon.src = "rain.png";
      weatherVideo.src = "rain-background.mp4";
      appBackground.style.backgroundColor = "transparent"
      break;
    case "Drizzle":
      weatherIcon.src = "drizzle.png";
      weatherVideo.src = "rain-background.mp4";
      appBackground.style.backgroundColor = "transparent"
      break;
    case "Snow":
      weatherIcon.src = "snowflake.png";
      weatherVideo.src = "snow-background.mp4";
      appBackground.style.backgroundColor = "transparent"
      break;
    case "Mist":
      weatherIcon.src = "fog.png";
      weatherVideo.src = "fog-background.mp4";
      appBackground.style.backgroundColor = "transparent"
      break;
    default:
      weatherIcon.src = "";
      weatherVideo.src = "";
      appBackground.style.backgroundColor = "rgba(255, 255, 255, 0.3)"
      break;
  }
    //changes the weather icon depending on the weather of today

    document.querySelector(".weather").style.display = "flex";
    //displays the weather as it was hidden before
  } catch (error) {
    console.error("Code failed", error);
  }
  //error handling, by using try{} and catch the rest of the code wont stop if this fails
}

const apiKeyFiveDay = "ea3d6ad7155cd5fddd859e5329b39d98";
const apiLinkFiveDay =
  "https://api.openweathermap.org/data/2.5/forecast?&units=metric&q=";

//using a different API for the weather for the next 5 days

async function weekWeather(city) {
  const weekResponse = await fetch(
    apiLinkFiveDay + city + `&appid=${apiKeyFiveDay}`
  );

  if (!weekResponse.ok) {
    console.error("Failed to fetch weeks weather");
    //more error handling so if there is an eror I can tell exactly what went wrong
  } else {
    console.log("Weeks weather fetch successful");
  }

  let weekData = await weekResponse.json();

  console.log(weekData);

  for (i = 0; i < 5; i++) {
    document.querySelector(".day-" + (i + 1) + " .temp").textContent =
      Math.round(weekData.list[i].main.temp) + "°C";
  }
  //this code iterates through each of my classes and passes the temp of each one

  for (let i = 0; i < 5; i++) {
    let dailyWeatherElement = document.querySelectorAll(".daysWeather")[i];
    let weeklyImg = document.querySelectorAll(".img")[i];

    if (weekData.list[i].weather[0].main == "Clouds") {
      dailyWeatherElement.src = "cloudy.png";
    } else if (weekData.list[i].weather[0].main == "Clear") {
      dailyWeatherElement.src = "clear.png";
    } else if (weekData.list[i].weather[0].main == "Rain") {
      dailyWeatherElement.src = "rain.png";
    } else if (weekData.list[i].weather[0].main == "Drizzle") {
      dailyWeatherElement.src = "drizzle.png";
    } else if (weekData.list[i].weather[0].main == "Snow") {
      dailyWeatherElement.src = "snowflake.png";
    } else if (weekData.list[i].weather[0].main == "Mist") {
      dailyWeatherElement.src = "fog.png";
    }
  }
}

const d = new Date();
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function checkDay(day) {
  let nextDayIndex = day.getDay() + 1; // Gets the index of the next day
  if (nextDayIndex > 6) {
    nextDayIndex -= 7; // Starts the week from the begining
  }
  return nextDayIndex;
}

for (let i = 0; i < 5; i++) {
  const nextDayIndex = checkDay(d);
  document.querySelector(".day-" + (i + 1) + " .date").textContent =
    days[nextDayIndex];
  d.setDate(d.getDate() + 1); // Moves to the next day
}

searchButton.addEventListener("click", () => {
  checkWeather(searchBox.value);
  weekWeather(searchBox.value);
});

document.addEventListener("keydown", (ev) => {
  if (ev.key == "Enter") {
    checkWeather(searchBox.value);
    weekWeather(searchBox.value);
  }
});
