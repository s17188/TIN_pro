document.addEventListener('DOMContentLoaded', () => { 
    setTimeout(() => {
        document.getElementById("weather").innerHTML += addInfoWeather()
    }, 5000);
});

const addInfoWeather = () => {
    let arrWeather = ['słonecznie','przejaśnienia','pochmurno']
    let randTemp = Math.floor(Math.random() * 81) -40
    return `${arrWeather[Math.floor(arrWeather.length * Math.random())]}, temperatura ${randTemp} stopni`
}
