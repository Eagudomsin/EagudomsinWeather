let weather = {
    apiKey: "f110c7548f4fbd41091162c8006d2951",
    fetchWeather: function (city) {
        fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`
        ).then((response) => {
            if (!response.ok) {
              document.querySelector(".weather").classList.remove("loading");
              alert("No weather found.");
              throw new Error("No weather found.");
            }
            return response.json();
          })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const {name} = data;
        const {icon, description} = data.weather[0];
        const {temp, humidity, feels_like} = data.main;
        const {speed} = data.wind;
        const {sunrise, sunset} = data.sys;

        console.log(name, icon, description, temp, humidity, speed, feels_like, sunrise, sunset);
        document.querySelector(".location").innerText = `Location: ${name}`;
        document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}.png`;
        document.querySelector(".description").innerText = description;
        document.querySelector(".humidity").innerText =`Humidity: ${humidity} %`;
        document.querySelector(".feels-like").innerText = `Feels-like: ${feels_like.toFixed(1)}°C`;
        document.querySelector(".temp").innerText = `${temp.toFixed(1)}°C`;
        document.querySelector(".speed").innerText = `Wind Speed: ${speed.toFixed(2)} km/h`;

        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage ="url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
        this.fetchWeather(document.querySelector("#search-box").value);
    },
};

document.querySelector("#button").addEventListener("click", function () {
    document.querySelector(".weather").classList.add("loading");
    weather.search();
});

document.querySelector("#search-box").addEventListener("keyup", function (event) {  
    if(event.key=="Enter") {
        document.querySelector(".weather").classList.add("loading");
        weather.search();
    }
});

weather.fetchWeather("bangkok");