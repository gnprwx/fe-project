const gif = document.querySelector("#station");
const terminal = document.querySelector("#terminal");
const icon = document.createElement("img");
const temp = document.createElement("span");

icon.className = "wIcon";
temp.className = "tIcon";

gif.appendChild(icon);
gif.appendChild(temp);

const GKEY = "msOvtkTOZjU8s7HA4BfHaOxZ2cTejHYm";
const WKEY = "eafc929406722a97ee0c5f953c3bdf13";

let tvStatus = false;
let weather = false;

terminal.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        commandRouting();
    }
});

function commandRouting() {
    let userInput = terminal.value.toLowerCase();
    if (userInput === "on") {
        if (tvStatus) {
            setTimeout(() => {
                terminal.placeholder = "";
            }, 2000);
            terminal.placeholder = "TV is already on, dude.";
        } else {
            terminal.placeholder = "'change' the channels";
            tvStatus = true;
            tvChannels();
        }
    }
    if (userInput === "change" && tvStatus) {
        terminal.placeholder = "";
        tvChannels();
    }
    if (userInput === "off") {
        tvStatus = false;
        gif.style.backgroundImage = `none`;
        terminal.placeholder = "TV is turned off.";
    }
    if (userInput === "weather") {
        currentWeather();
        weather = true;
    }
    if (userInput === "widget" && weather) {
        terminal.placeholder = "";
        temp.classList.toggle('temp');
        temp.classList.toggle('tIcon');
        icon.classList.toggle("widget");
        icon.classList.toggle("wIcon");
    }
    terminal.value = "";
}

function tvChannels() {
    fetch(
        `https://api.giphy.com/v1/gifs/random?api_key=${GKEY}&tag=vaporwave&rating=g`
    )
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            gif.style.backgroundImage = `url(${data.data.images.downsized.url})`;
        });
}

function currentWeather() {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=21.30&lon=-157.85&appid=${WKEY}&units=imperial`
    )
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            icon.src =
                "http://openweathermap.org/img/w/" +
                data.weather[0].icon +
                ".png";
            temp.textContent = `${Math.round(data.main.temp)}°F`;
            terminal.placeholder = `Weather in paradise is currently ${Math.round(
                data.main.temp
            )}°F with ${data.weather[0].description}.`;
        });
}
