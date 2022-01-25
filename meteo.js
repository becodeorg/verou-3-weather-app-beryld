import { data } from "./config.js";
const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ]
const cityInput = document.getElementById("city");
const cityButton = document.getElementById("cityButt");
const titleCityResult = document.getElementById("titleCity");
const today = document.getElementById("current");
const fiveOnes = document.getElementById("fiveDays");
const dating = document.getElementById('today-date')
const cityName = document.getElementById('name-city')
const dayOneName = document.getElementById('day-one')
const dayOneTemp = document.getElementById('temp-one')
const dayTwoName = document.getElementById('day-two')
const dayTwoTemp = document.getElementById('temp-two')
const dayThreeName = document.getElementById('day-three')
const dayThreeTemp = document.getElementById('temp-three')
const dayFourName = document.getElementById('day-four')
const dayFourTemp = document.getElementById('temp-four')
const dayOneIcon = document.getElementById('icon-one')
const dayTwoIcon  = document.getElementById('icon-two')
const dayThreeIcon = document.getElementById('icon-three')
const dayFourIcon = document.getElementById('icon-four')
const dayOneHum = document.getElementById('humidity-one')
const dayTwoHum = document.getElementById('humidity-two')
const dayThreeHum = document.getElementById('humidity-three')
const dayFourHum = document.getElementById('humidity-four')
//Hot to have the date dd/mm/yyyy :
var todayla = new Date;
var days = todayla.getDay()+1;
console.log(days);
var currentDate = String(todayla.getDate())+'/0'+ String(todayla.getMonth()+1) +"/" + String(todayla.getFullYear());
let lat;
let lon;
let nameCity;



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
      nameCity = responseLat[0].name
      console.log(nameCity);
      console.log(lon);
      console.log(lat);
      fetchmeteo();
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
          dating.textContent= currentDate
        cityName.textContent=nameCity
        today.textContent =
         parseInt(response.current.temp) + "°"  ;
        console.log(cityInput.value);
        
        
        dayOneName.textContent= daysOfWeek[days-1] ;
        dayOneTemp.textContent=  parseInt(response.daily[1].temp.day) + "°";
        dayTwoName.textContent = daysOfWeek[days];
        dayTwoTemp.textContent=  parseInt(response.daily[2].temp.day);
        dayThreeName.textContent = daysOfWeek[days+1];
        dayThreeTemp.textContent=  parseInt(response.daily[3].temp.day);
        dayFourName.textContent = daysOfWeek[days+2];
        dayFourTemp.textContent=  parseInt(response.daily[4].temp.day);
        
        dayOneIcon.src="https://openweathermap.org/img/wn/"+ response.daily[1].weather[0].icon +"@2x.png";
        dayTwoIcon.src="https://openweathermap.org/img/wn/"+ response.daily[2].weather[0].icon +"@2x.png";
        dayThreeIcon.src="https://openweathermap.org/img/wn/"+ response.daily[3].weather[0].icon +"@2x.png";
        dayFourIcon.src="https://openweathermap.org/img/wn/"+ response.daily[4].weather[0].icon +"@2x.png";
        


    });
  }

};



// function toDate() {
//     let unix_today = response.current.dt; // fetch date in seconds
//     var date_in_mlsec = new Date(unix_today * 1000) //convert to milliseconds
//     var date = date_in_mlsec.getDate()
//     var hours = date_in_mlsec.getHours() //use gethours method to fetch the hour element 
//     var minutes = "0" + date_in_mlsec.getMinutes();
//     var seconds = "0" + date_in_mlsec.getSeconds();
//     console.log(date);
// }
// toDate()