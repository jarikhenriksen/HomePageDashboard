function getDate() {        //gets todays date, adds it to html page.
    const date = new Date;
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const todaysDate = date.toLocaleDateString('en-US', options);

    document.getElementById('date').innerText = todaysDate;
}

function getNews() {
    const apiKey = config.newsApi

    for(var i = 0; i < 4; i++) {
    fetch(`https://newsapi.org/v2/top-headlines?country=ca&apiKey=${apiKey}`)
        .then(response => {
            return response.json();
        })
        .then(data =>
            (document.getElementById(`news${i}`).innerText = data.articles[i].title) && 
            (document.getElementById(`urlToImage${i}`).src = data.articles[i].urlToImage) &&
            (document.getElementById(`newsdesc${i}`).innerText = data.articles[i].description) &&
            (document.getElementById(`url${i}`).setAttribute('href', data.articles[i].url))
        );      
    };
};

function getNasaPic() {
    
    const apiKey = config.nasaApi
    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`

    fetch(url) 
        .then(response => {
            return response.json();
        })
        .then(data => {
            (document.getElementById('nasaPic').src = data.hdurl) &&
            (document.getElementById('nasaPicDescription').innerText = data.explanation)
        })   
}



function getWeather() {
    
    document.getElementById('weatherDiv').classList.remove('d-none') //makes local weather visible
    document.getElementById('weatherButton').classList.add('d-none')    //hides weather button
    const apiKey = config.weatherApi

    navigator.geolocation.getCurrentPosition(position => {
        
        const lat = position.coords.latitude; 
        const lon = position.coords.longitude;
        
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`

        fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data =>
            (document.getElementById('weather').innerText = data.current.temp_c) && 
            (document.getElementById('weatherImg').src = data.current.condition.icon) &&
            (document.getElementById('weatherCity').innerText = data.location.name) && 
            (document.getElementById('weatherRegion').innerText = data.location.region) &&
            (console.log(data)));
      
    });
}
        


        

document.addEventListener('DOMContentLoaded', getDate(), getNews(), getNasaPic());

document.getElementById('weatherButton').addEventListener('click', getWeather)
