const station = document.querySelector("#station");
const tv = document.querySelector("#tv");
const terminal = document.querySelector("#terminal");
const icon = document.createElement("img");
const temp = document.createElement("span");

icon.className = "wIcon";
temp.className = "tIcon";

station.appendChild(icon);
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

//? command routing
terminal.addEventListener("keydown", (event) => {
    let userInput = terminal.value.toLowerCase();
    if (commands.includes(userInput) && event.key === "Enter") {
        switch (userInput) {
            case commands[0]:
                tvOn();
                break;
            case commands[1]:
                tvOff();
                break;
            case commands[2]:
                tvStatus
                    ? tvChannels()
                    : (terminal.placeholder = `Turn on the TV...`);
                break;
            case commands[3]:
                tvStatus
                    ? screenSize()
                    : (terminal.placeholder = `Turn on the TV...`);
                break;
            case commands[4]:
                currentWeather();
                weather = true;
                break;
            case commands[5]:
                weatherWidget();
                break;
            case commands[6]:
                jokes();
                break;
            case commands[7]:
                terminal.placeholder = `commands: ${commands.join(" | ")}`;
                break;
            case commands[8]:
                terminal.placeholder = "";
                break;
        }
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

//? API CALLS
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

function jokes() {
    fetch(`https://v2.jokeapi.dev/joke/Programming?type=twopart`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            terminal.placeholder = `${data.setup} ${data.delivery}`;
        });
}
