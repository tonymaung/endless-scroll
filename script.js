// Unsplash API
let count = 5;
const apiKey = '6MKyRkMPTyX3mdUth09GdGD4jz37qy6ZSNcIa_I6LCo';
const apiURL = `https://api.unsplash.com/photos/random?query=architecture&client_id=${apiKey}&count=${count}`;
let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let initialLoad = true;
// Get photos from API
const imageLoaded = () => {
    imagesLoaded++;
    loader.hidden = true;
    initialLoad = false;
    count = 3;
    if (imagesLoaded === totalImages) {
        ready = true;
    }
}
async function getPhotos() {
    try {
        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayPhotos(photosArray)
    } catch (error) {
        console.log(error);
        return error
    }
}
getPhotos()
const imageContainer = document.querySelector("#image-container");
const loader = document.querySelector(".loader")
    //display photos from request and add to dom 
const displayPhotos = (photosArray) => {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log("total images " + totalImages)
    photosArray.forEach(photo => {
        const item = document.createElement("a");
        setAttributes(item, {
            href: photo.links.html,
            target: "_blank"
        })
        const img = document.createElement("img")
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        img.addEventListener("load", imageLoaded)
        item.appendChild(img)
        imageContainer.appendChild(item)
    });
}

//helper function
function setAttributes(element, attributes) {
    for (let key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}
//scroll implementation to load more
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        /*console.log("Offset Height: " + document.body.offsetHeight)
        console.log("Windows Inner Height: " + window.innerHeight)
        console.log("Windows Scroll Y: " + window.scrollY)*/
        ready = false
        getPhotos()
    }
})