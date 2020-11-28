import {validForm} from './3d.js'

document.addEventListener('DOMContentLoaded', () => { 
    resultsShow()
});

const resultsShow = () => {
    let celcCheck = document.getElementById("celsjuszCheck")
    let resultDiv = document.getElementById("resultConvert")
    document.getElementById("formConvert").addEventListener('submit',(e)=>{
        e.preventDefault()
        if(validForm()){
            celcCheck.checked ? resultDiv.innerHTML = 'Wynik: ' + convertFahrenToCelc() + ' °C' : resultDiv.innerHTML = 'Wynik: ' + convertCelcToFahren() + ' °F'
        }
    })
}

const convertCelcToFahren = () => {
    let celc = document.getElementById('celsjusz').value
    return ((celc * 9/5) + 32)
}

const convertFahrenToCelc = () => {
    let fahren = document.getElementById('fahrenheit').value
    return (fahren-32)*5/9
}