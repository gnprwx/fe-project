const station = document.querySelector("#station");
const tv = document.querySelector("#tv");
const terminal = document.querySelector("#terminal");
const icon = document.createElement("img");
const temp = document.createElement("span");

icon.className = "wIcon";
temp.className = "tIcon";

station.appendChild(icon);
station.appendChild(temp);

terminal.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        commandRouting();
    }
    return;
});

let tvStatus = false;
let weather = false;
let full = false;

function commandRouting() {
    const commands = [
        "on",
        "off",
        "change",
        "screen",
        "weather",
        "widget",
        "tldr",
        "clear"
    ];
    let userInput = terminal.value.toLowerCase();
    if (userInput === commands[0]) {
        if (tvStatus) {
            terminal.value = "";
            setTimeout(() => {
                terminal.placeholder = "";
            }, 2000);
            terminal.placeholder = "TV is already on, dude.";
            return;
        } else {
            terminal.placeholder = "'change' the channels";
            tvStatus = true;
            tvChannels();
        }
    } 
    if (userInput === commands[1]) {
        tvStatus = false;
        station.style.backgroundImage = `none`;
        terminal.placeholder = "TV is turned off.";
    } 
    if (tvStatus) {
        if (userInput === commands[2]) {
            tvChannels();
        } else if (userInput === commands[3]) {
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
    } 
    if (userInput === commands[4]) {
        currentWeather();
        weather = true;
    } 
    if (userInput === commands[5]) {
        if (weather) {
            temp.classList.toggle("temp");
            temp.classList.toggle("tIcon");
            icon.classList.toggle("widget");
            icon.classList.toggle("wIcon");
        } else {
            terminal.value = "";
            setTimeout(() => {
                terminal.placeholder = "";
            }, 2000);
            terminal.placeholder = "Must run 'weather' at least once first.";
        }
    }
    if (userInput === commands[6]) {
        terminal.placeholder = `commands: ${commands.join(" | ")}`;
    }
    if (userInput === commands[7]) {
        terminal.placeholder = "";
    }
    terminal.value = "";
    return;
}

function tvChannels() {
    const GKEY = "msOvtkTOZjU8s7HA4BfHaOxZ2cTejHYm";
    fetch(
        `https://api.giphy.com/v1/gifs/random?api_key=${GKEY}&tag=vaporwave&rating=g`
    )
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            station.style.backgroundImage = `url(${data.data.images.downsized.url})`;
        });
}

function currentWeather() {
    const WKEY = "eafc929406722a97ee0c5f953c3bdf13";
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
