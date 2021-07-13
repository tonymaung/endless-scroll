// Unsplash API
const count = 1;
const apiKey = '6MKyRkMPTyX3mdUth09GdGD4jz37qy6ZSNcIa_I6LCo';
const apiURL = `https://api.unsplash.com/photos/random?query=architecture&client_id=${apiKey}&count=${count}`; 
// Get photos from API

async function getPhotos(){
    try{    
        const response = await fetch(apiURL);
        const data     = await response.json();
        console.log(data)
    }catch(error){
        console.log(error);
    }
}
getPhotos();