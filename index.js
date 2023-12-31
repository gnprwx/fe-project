const station = document.querySelector("#station");
const tv = document.querySelector("#tv");
const terminal = document.querySelector("#terminal");
const weatherIcon = document.createElement("img");
const temp = document.createElement("span");

weatherIcon.className = "weather-hidden";
temp.className = "temp-hidden";

station.appendChild(weatherIcon);
station.appendChild(temp);

const commands = [
    "on",
    "off",
    "change",
    "screen",
    "weather",
    "widget",
    "joke",
    "tldr",
    "clear",
];

let tvStatus = false;
let weather = false;
let full = false;

//? terminal-like input functionality
terminal.addEventListener("keydown", (event) => {
    const userInput = terminal.value.toLowerCase();
    if (commands.includes(userInput) && event.key === "Enter") {
        commandRouting();
        terminal.value = "";
    }
    return;
});

//? command functions
function tvOn() {
    if (tvStatus) {
        terminal.value = "";
        setTimeout(() => {
            terminal.placeholder = "";
        }, 2000);
        terminal.placeholder = "TV is already on, yo.";
        return;
    } else {
        terminal.placeholder = "'change' the channels";
        tvStatus = true;
        tvChannels();
    }
}

function tvOff() {
    tvStatus = false;
    station.style.backgroundImage = `none`;
    terminal.placeholder = "TV is turned off.";
}

function screenSize() {
    if (!full) {
        tv.style.backgroundImage = "none";
        station.style.backgroundSize = "cover";
        full = true;
    } else {
        tv.style.backgroundImage = "url('./img/tv.png')";
        station.style.backgroundSize = "contain";
        full = false;
    }
}

function weatherWidget() {
    if (weather) {
        temp.classList.toggle("temp");
        temp.classList.toggle("temp-hidden");
        weatherIcon.classList.toggle("weather");
        weatherIcon.classList.toggle("weather-hidden");
    } else {
        terminal.value = "";
        setTimeout(() => {
            terminal.placeholder = "";
        }, 2000);
        terminal.placeholder = "Must run 'weather' at least once first.";
    }
}

//? terminal command routing
function commandRouting() {
    const userInput = terminal.value.toLowerCase();
    switch (commands.indexOf(userInput)) {
        case 0:
            tvOn();
            break;
        case 1:
            tvOff();
            break;
        case 2:
            tvStatus
                ? tvChannels()
                : (terminal.placeholder = `Turn on the TV...`);
            break;
        case 3:
            tvStatus
                ? screenSize()
                : (terminal.placeholder = `Turn on the TV...`);
            break;
        case 4:
            currentWeather();
            weather = true;
            break;
        case 5:
            weatherWidget();
            break;
        case 6:
            jokes();
            break;
        case 7:
            terminal.placeholder = `commands: ${commands.join(" | ")}`;
            break;
        case 8:
            terminal.placeholder = "";
            break;
    }
}

//? API calls
function tvChannels() {
    const GKEY = "msOvtkTOZjU8s7HA4BfHaOxZ2cTejHYm"; //! don't do this with real production code.
    fetch(
        `https://api.giphy.com/v1/gifs/random?api_key=${GKEY}&tag=vaporwave&rating=pg-13`
    )
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            station.style.backgroundImage = `url(${data.data.images.downsized.url})`;
        });
}

function currentWeather() {
    const WKEY = "eafc929406722a97ee0c5f953c3bdf13"; //! don't do this with real production code.
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=21.30&lon=-157.85&appid=${WKEY}&units=imperial`
    )
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            weatherIcon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
            temp.textContent = `${Math.round(data.main.temp)}°F`;
            terminal.placeholder = `Weather in paradise is currently ${Math.round(
                data.main.temp
            )}°F with ${data.weather[0].description}.`;
        });
}

function jokes() {
    fetch(`https://v2.jokeapi.dev/joke/Programming?type=twopart`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            terminal.placeholder = `${data.setup} ${data.delivery}`;
        });
}
