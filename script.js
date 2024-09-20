const apikey = "6b106d16c79eb871a5e1d7b45d66e560";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const srchbox = document.querySelector(".search input");
const srchbtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weatherIcon");
const weatherSection = document.querySelector(".weather"); 

async function checkweather(city) {
  const response = await fetch(apiurl + city + `&appid=${apikey}`);
  const data = await response.json();

  if (data.cod === "404") {
    alert("City not found");
    return;
  }

  // Update weather details
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

  const weatherCondition = data.weather[0].main.toLowerCase();
  const weatherDescription = data.weather[0].description.toLowerCase();

  if (weatherCondition.includes("cloud")) {
    weatherIcon.src = "./images/clouds.png";
  } else if (weatherCondition.includes("clear")) {
    weatherIcon.src = "./images/clear.png";
  } else if (weatherDescription.includes("drizzle")) {
    weatherIcon.src = "./images/drizzle.png";
  } else if (weatherDescription.includes("mist")) {
    weatherIcon.src = "./images/mist.png";
  } else if (weatherCondition.includes("rain")) {
    weatherIcon.src = "./images/rain.png";
  } else if (weatherCondition.includes("snow")) {
    weatherIcon.src = "./images/snow.png";
  } else {
    weatherIcon.src = "./images/default.png";
  }


  weatherSection.style.display = "flex";
}

//  for button click
srchbtn.addEventListener("click", () => {
  checkweather(srchbox.value);
});

// for "Enter" key press
srchbox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkweather(srchbox.value);
  }
});

