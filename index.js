const gif = document.querySelector('#station');

fetch(
    "https://api.giphy.com/v1/gifs/random?api_key=msOvtkTOZjU8s7HA4BfHaOxZ2cTejHYm&tag=vaporwave&rating=g"
)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data.data.images.downsized.url);
        gif.style.backgroundImage = `url(${data.data.images.downsized.url})`;
    });