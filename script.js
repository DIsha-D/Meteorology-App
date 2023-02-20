
let weather = {
    apiKey: "4ae30463b0ed1c32c22fcaebca09eb94",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("⚠ Weather not found");
            throw new Error("⚠ Weather not found");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      const date = new Date();
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src ="https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
      document.querySelector(".weather").classList.remove("loading");
      
      const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
      const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
      const d = new Date();
      let month = months[d.getMonth()];
      let day = days[d.getDay()];
      var hours = d.getHours() % 12 || 12;
      var amOrPm = d.getHours() < 12 ? "AM" : "PM";
      document.getElementById("date").innerHTML = "📅   " + day+",  "+ d.getDate() +' '+month+" "+d.getFullYear()+"  <br>  "+"🕒   "+hours + ":" + d.getMinutes() +  " " + amOrPm + " (IST)";
    
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  

  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  
 weather.fetchWeather("Delhi");


