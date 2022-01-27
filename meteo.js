import { data } from "./config.js";
const {
  cityButton,
  cityInput,
  dating,
  cityName,
  today,
  dayOneName,
  daysOfWeek,
  dayOneTemp,
  dayTwoName,
  dayTwoTemp,
  dayThreeName,
  dayThreeTemp,
  dayFourName,
  dayFourTemp,
  dayOneIcon,
  dayTwoIcon,
  dayThreeIcon,
  dayFourIcon,
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
      console.log(nameCity);
      console.log(lon);
      console.log(lat);
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
        console.log(cityInput.value);

        //TODO: FOR LOOP
        
        dayOneName.textContent = daysOfWeek[days - 1];
        dayOneTemp.textContent = parseInt(response.daily[1].temp.day) + "°";
        dayTwoName.textContent = daysOfWeek[days];
        dayTwoTemp.textContent = parseInt(response.daily[2].temp.day) + "°";
        dayThreeName.textContent = daysOfWeek[days + 1];
        dayThreeTemp.textContent = parseInt(response.daily[3].temp.day) + "°";
        dayFourName.textContent = daysOfWeek[days + 2];
        dayFourTemp.textContent = parseInt(response.daily[4].temp.day) + "°";

        //TODO: FOR LOOP
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
          "@2x.png";
          /*dayOnepop.textContent = parseInt(response.daily[1].pop * 100) + " %";
          dayTwopop.textContent = parseInt(response.daily[2].pop * 100 )+ " %";
          dayThreepop.textContent = parseInt(response.daily[3].pop * 100 )+ " %";
          dayFourpop.textContent = parseInt( response.daily[4].pop * 100) + " %"; */
          for (let index = 0; index < 4; index++) {
            daypops[index].textContent= parseInt(response.daily[index+1].pop *100) + " %"
            }
          hideIt.style.visibility="visible";
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
  const dayOneName = document.getElementById("day-one");
  const dayOneTemp = document.getElementById("temp-one");
  const dayTwoName = document.getElementById("day-two");
  const dayTwoTemp = document.getElementById("temp-two");
  const dayThreeName = document.getElementById("day-three");
  const dayThreeTemp = document.getElementById("temp-three");
  const dayFourName = document.getElementById("day-four");
  const dayFourTemp = document.getElementById("temp-four");
  const dayOneIcon = document.getElementById("icon-one");
  const dayTwoIcon = document.getElementById("icon-two");
  const dayThreeIcon = document.getElementById("icon-three");
  const dayFourIcon = document.getElementById("icon-four");
  const daypops = document.querySelectorAll('.popic');
  const bodyback = document.getElementById('bodybackA');
  const hideIt = document.getElementById('container-results');
  return {
    cityButton,
    cityInput,
    dating,
    cityName,
    today,
    dayOneName,
    daysOfWeek,
    dayOneTemp,
    dayTwoName,
    dayTwoTemp,
    dayThreeName,
    dayThreeTemp,
    dayFourName,
    dayFourTemp,
    dayOneIcon,
    dayTwoIcon,
    dayThreeIcon,
    dayFourIcon,
    bodyback,
    hideIt,
    daypops,
  };
}
