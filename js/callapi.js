const api = 'https://api.openweathermap.org/data/2.5/weather?q=';

const searchbox = document.querySelector('.search-box');

const cur = 'thai nguyen';

fetch(`${api}thai%20nguyen&units=metric&appid=44c372c662bff58dfc4fed80080e89f2`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);

searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
        console.log(searchbox.value)
    }
}

function getResults(query) {
    fetch(`${api}${query}&units=metric&appid=44c372c662bff58dfc4fed80080e89f2`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

function displayResults(weather) {
    let city = document.querySelector('.location .city');
    city.innerHTML = `${weather.name} , ${weather.sys.country}`;
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerHTML = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

    let weatherEl = document.querySelector('.current .weather');
    weatherEl.innerHTML = `${weather.weather[0].main}`;

    let hilow = document.querySelector('.current .hi-low');
    hilow.innerHTML = `${weather.main.temp_min}<span>°C</span> /${weather.main.temp_min}<span>°C</span>`;
}

function dateBuilder(d) {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
}