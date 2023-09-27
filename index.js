const gif = document.querySelector("#station");
const terminal = document.querySelector("#terminal");

let tvStatus = false;

terminal.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        let userInput = terminal.value.toLowerCase();
        if (userInput === "on" && tvStatus) {
            setTimeout(() => {
                terminal.placeholder = "";
            }, 2000);
            terminal.placeholder = "TV is already on, dude.";
        } else {
            terminal.placeholder = "'change' the channels";
            tvStatus = true;
            tvChannels();
        }
        if (userInput === "change") {
            terminal.placeholder = "";
            tvChannels();
        }
        if (userInput === "off") {
            tvStatus = false;
            gif.style.backgroundImage = `none`;
            terminal.placeholder = "TV is turned off.";
        }
        terminal.value = '';
    }
});

function tvChannels() {
    fetch(
        "https://api.giphy.com/v1/gifs/random?api_key=msOvtkTOZjU8s7HA4BfHaOxZ2cTejHYm&tag=vaporwave&rating=g"
    )
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            gif.style.backgroundImage = `url(${data.data.images.downsized.url})`;
        });
}
