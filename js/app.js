const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const printErr = document.querySelector("#errMsg");

search.addEventListener("click", () => {
    const APIKey = "0da8645d90584c068f3101721230907";
    const city = document.querySelector(".search-box input").value;
    const temp = axios.get(`https://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${city}&aqi=no`);
    temp.then((res) => {
        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        temperature.innerHTML = `${res.data.current.temp_c}<span>°C</span>`;
        description.innerHTML = `${res.data.current.condition.text}`;
        image.src = `${res.data.current.condition.icon}`;
        humidity.innerHTML = `${res.data.current.humidity}%`;
        wind.innerHTML = `${res.data.current.wind_kph}Km/h`;

        weatherBox.style.display = "";
        weatherDetails.style.display = "";
        weatherBox.classList.add("fadeIn");
        weatherDetails.classList.add("fadeIn");
        container.style.height = "590px";
    })
        .catch((err) => {
            container.style.height = "400px";
            weatherBox.style.display = "none";
            weatherDetails.style.display = "none";
            error404.style.display = "block";
            error404.classList.add("fadeIn");
            printErr.innerHTML = `${err.response.data.error['message']}`;
        });

});