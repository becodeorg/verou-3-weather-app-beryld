//TODO: Need the big screens css 
//      button styling
//      searchbar styling
//      home page example ? 
//      Background transitions  
//      Icons effects arriving from right to left


import { data } from "./config.js";
const {
  cityButton,
  cityInput,
  dating,
  dayNames,
  cityName,
  today,
  daysOfWeek,
  temperat,
  icons,
  daypops,
  bodyback,
  hideIt,
} = consts();
var { lat, lon, nameCity, currentDate, days } = vars();

cityButton.onclick = () => {
  fetch(
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
      cityInput.value +
      "&limit=1&appid=" +
      data.key
  )
    .then(function (responseLat) {
      if (!responseLat.ok) {
        throw new Error("http not working" + response.status);
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

  async function fetchmeteo() {
    fetch(
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        lat +
        "&lon=" +
        lon +
        "&units=metric&exclude=minutely,alerts&mode=json&appid=" +
        data.key
    )
      .then(function (response) {
        if (!response.ok) {
          throw new Error(
            `HTTP error! What did you try to do ? status: ${response.status}`
          );
        }
        return response.json();
      })
      .then(function (response) {
        //TODO: Should I put the date ?
        // dating.textContent = currentDate;
        cityName.textContent = nameCity;
        today.textContent = parseInt(response.current.temp) + "";

        
        
        for (let i = 0; i < 4; i++) {
          let dayMax = days - 1 + i;
            if (dayMax >= 7) {
              dayMax = dayMax - 7;
            }
              dayNames[i].textContent = daysOfWeek[dayMax];
              temperat[i].textContent = parseInt(response.daily[i + 1].temp.day) + "°";
        }

        for (let i = 0; i < 4; i++) {
          
          icons[i].src =
            "https://openweathermap.org/img/wn/" +
            response.daily[i + 1].weather[0].icon +
            "@2x.png";
            if(response.daily[i + 1].weather[0].icon == "13d"){
              icons[i].style.filter=" invert(100%)"
            }
        }
        for (let index = 0; index < 4; index++) {
          daypops[index].textContent =
            parseInt(response.daily[index + 1].pop * 100) + " %";
        }
        hideIt.style.visibility = "visible";
      });
  }
  async function imgFishing() {
    fetch(
      "https://api.unsplash.com/search/photos?query=" +
        cityInput.value +
        "&per_page=20&client_id=" +
        data.unsplkey
    )
      .then(function (unsplResponse) {
        if (!unsplResponse.ok) {
          throw new Error(
            `HTTP error! What did you try to do ? status: ${unsplResponse.status}`
          );
        }
        return unsplResponse.json();
      })
      //If style not backgroundimage but just background the cover property wont work !!!!
      .then(function (unsplResponse) {
        bodyback.style.backgroundImage =
          "url('" + unsplResponse.results[0].urls.small + ")";
      });
  }
};

//TODO: fetch unix time stamp from API to display current time of city researched
function vars() {
  var todayla = new Date();
  console.log(todayla);
  var days = todayla.getDay() + 1;
  console.log(days);
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
  const titleCityResult = document.getElementById("titleCity");
  const today = document.getElementById("current");
  const fiveOnes = document.getElementById("fiveDays");
  const dating = document.getElementById("today-date");
  const cityName = document.getElementById("name-city");
  const daypops = document.querySelectorAll(".popic");
  const bodyback = document.getElementById("bodybackA");
  const hideIt = document.getElementById("container-results");
  const dayNames = document.querySelectorAll(".day-name");
  const temperat = document.querySelectorAll(".temperature");
  const icons = document.querySelectorAll(".ic");
  return {
    cityButton,
    cityInput,
    dating,
    cityName,
    today,
    dayNames,
    daysOfWeek,
    temperat,
    bodyback,
    hideIt,
    daypops,
    icons,
  };
}
/*
          dayOneName.textContent = daysOfWeek[days - 1];
          dayTwoName.textContent = daysOfWeek[days];
          dayThreeName.textContent = daysOfWeek[days + 1];
          dayFourName.textContent = daysOfWeek[days + 2];

          dayOneTemp.textContent = parseInt(response.daily[1].temp.day) + "°";
          dayTwoTemp.textContent = parseInt(response.daily[2].temp.day) + "°";
          dayThreeTemp.textContent = parseInt(response.daily[3].temp.day) + "°";
          dayFourTemp.textContent = parseInt(response.daily[4].temp.day) + "°";
          
          dayOnepop.textContent = parseInt(response.daily[1].pop * 100) + " %";
          dayTwopop.textContent = parseInt(response.daily[2].pop * 100 )+ " %";
          dayThreepop.textContent = parseInt(response.daily[3].pop * 100 )+ " %";
          dayFourpop.textContent = parseInt( response.daily[4].pop * 100) + " %"; 

          
        dayOneIcon.src =
        "https://openweathermap.org/img/wn/" +
        response.daily[1].weather[0].icon +
        "@2x.png";
        
        dayTwoIcon.src =
        "https://openweathermap.org/img/wn/" +
        response.daily[2].weather[0].icon +
        "@2x.png";
        
        dayThreeIcon.src =
        "https://openweathermap.org/img/wn/" +
        response.daily[3].weather[0].icon +
        "@2x.png";
        
        dayFourIcon.src =
        "https://openweathermap.org/img/wn/" +
        response.daily[4].weather[0].icon +
        "@2x.png";*/
