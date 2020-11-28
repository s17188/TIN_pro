import {validForm} from './3d.js'

document.addEventListener('DOMContentLoaded', () => { 
    let resultDiv = document.getElementById("resultConvert")
    let resultTab = document.getElementById("resultTable")
    document.getElementById("formConvert").addEventListener('submit',(e)=>{
        e.preventDefault()
        if(validForm()){
            let date = document.getElementById("date")
            let celcCheck = document.getElementById("celsjuszCheck")
            let celc = document.getElementById('celsjusz').value
            let fahren = document.getElementById('fahrenheit').value
            resultTab.innerHTML += `
            <tr>
                <td>${new Date(date.value).toDateString()}</td>
                <td>${celcCheck.checked ? fahren + ' °F' : celc + ' °C'}</td>
                <td>${resultDiv.innerHTML.replace("Wynik:","")}</td>
            </tr>`
        }
    })
});