import { data } from "./config.js";
const {
  cityButton,
  cityInput,
  dayNames,
  cityName,
  today,
  daysOfWeek,
  temperat,
  icons,
  daypops,
  bodyback,
  hideIt,
  feet,
} = consts();
var { lat, lon, nameCity, currentDate, days } = vars();

//TODO: Format onclick inside a function that is call - able

cityInput.value = "Taiwan";




const KeyPressed = (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    cityButton.click();
  }
};

const fetchTheData = () => {
  fetch(
    "https://api.openweathermap.org/geo/1.0/direct?q=" + cityInput.value + "&limit=1&appid=" + data.key
    )
    .then(function (responseLat) {
      if (!responseLat.ok) {
        throw new Error(" Biiiiiiiiip " + response.status);
      }
      return responseLat.json();
    })
    .then(function (responseLat) {
      lat = responseLat[0].lat;
      lon = responseLat[0].lon;
      nameCity = responseLat[0].name;
      fetchmeteo();
      imgFishing();
    });
};

const fetchmeteo = () => {
  fetch( "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=metric&exclude=minutely,alerts&mode=json&appid=" + data.key )
    .then(function (response) {
      if (!response.ok) {
        throw new Error(`HTTP error! Biiiiiiiip status: ${response.status}`);
      }
      return response.json();
    })
    .then(function (response) {
      cityName.textContent = nameCity;
      today.textContent = parseInt(response.current.temp) + "";
      fetchNameAndTemperature(response);
      fetchIcons(response);
      fetchPop(response);
      hideIt.style.visibility = "visible";
          });
};

const fetchPop = (response) => {
  for (let index = 0; index < 4; index++) {
    daypops[index].textContent = parseInt(response.daily[index + 1].pop * 100) + " %";
  }
};

const fetchIcons = (response) => {
  for (let i = 0; i < 4; i++) {
  icons[i].src = "https://openweathermap.org/img/wn/" + response.daily[i + 1].weather[0].icon + "@2x.png";
  if (response.daily[i + 1].weather[0].icon == "13d") {
    icons[i].style.filter = " invert(100%)";
   }
  }
};

const imgFishing = () => {
  fetch("https://api.unsplash.com/search/photos?query=" + cityInput.value + "&per_page=20&client_id=" + data.unsplkey )
    .then(function (unsplResponse) {
      if (!unsplResponse.ok) {
        throw new Error( `HTTP error! Biiiiiiiiiiiip status: ${unsplResponse.status}`
        );
      }
      return unsplResponse.json();
    })
    //If style not backgroundimage but just background the cover property wont work !!!!
    .then(function (unsplResponse) {
      const imgArraySize = unsplResponse.results.length;
      const choise = Math.floor(Math.random() * imgArraySize);
      bodyback.style.backgroundImage = "linear-gradient(rgba(255, 255, 255, .7), rgba(255,255,255,0.5)), " + "url('" + unsplResponse.results[choise - 1].urls.small + ")";
      feet.textContent = "Unsplash  license : " + unsplResponse.results[choise - 1].user.name + "\n" + unsplResponse.results[choise - 1].user.links.html; });
};

const fetchNameAndTemperature = (response) => {for (let i = 0; i < 4; i++) {
  let dayMax = days - 1 + i;
  if (dayMax >= 7) {
      dayMax = dayMax - 7;
  }
  dayNames[i].textContent = daysOfWeek[dayMax];
  temperat[i].textContent = parseInt(response.daily[i + 1].temp.day) + "°";
}

};
// window.onload = function () {
//   cityButton.click();
// };
window.onload = fetchTheData()
cityInput.addEventListener("keyup", KeyPressed);
cityButton.addEventListener("click", fetchTheData);

//TODO: fetch unix time stamp from API to display current time of city researched
function vars() {
  var todayla = new Date();
  var days = todayla.getDay() + 1;
  var currentDate =
    String(todayla.getDate()) +
    "/0" +
    String(todayla.getMonth() + 1) +
    "/" +
    String(todayla.getFullYear());
  let lat;
  let lon;
  let nameCity;
  return { lat, lon, nameCity, currentDate, days };
}

function consts() {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const cityInput = document.getElementById("city");
  const cityButton = document.getElementById("cityButt");
  const today = document.getElementById("current");
  const cityName = document.getElementById("name-city");
  const daypops = document.querySelectorAll(".popic");
  const bodyback = document.getElementById("bodybackA");
  const hideIt = document.getElementById("container-results");
  const dayNames = document.querySelectorAll(".day-name");
  const temperat = document.querySelectorAll(".temperature");
  const icons = document.querySelectorAll(".ic");
  const feet = document.getElementById("foot");
  return {
    cityButton,
    cityInput,
    cityName,
    today,
    dayNames,
    daysOfWeek,
    temperat,
    bodyback,
    hideIt,
    daypops,
    icons,
    feet,
  };
}


