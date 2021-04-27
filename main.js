let API_KEY = `6d32360eaec9d31cd0508c26102909dc`;
let url = (city) => `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

const fetchWeather = async (city) => {
    let response = await fetch(url(city));
    if (response.ok) {
        return await response.json();
    }
}

const infoBlock = document.querySelector('#info');
const searchInput = document.querySelector('#searchInput');
const searchButton = document.querySelector('#searchButton');

searchButton.addEventListener('click', () => {
    let city = searchInput.value;
    fetchWeather(city).then(data => {
        console.log(data)
        infoBlock.innerHTML = `
            <h1>${data.name}</h1>
            <div class="general">
                <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather">
                <p>${Math.round(data.main.temp - 273.15)}°</p>
            </div>
            <p class="center">Feels like ${Math.round(data.main.feels_like - 273.15)}°</p>
            <p class="otherinfo">
                Speed of wind: ${data.wind.speed} m/s <br>
                Pressure: ${data.main.pressure}
            </p>
        `;
    })
})