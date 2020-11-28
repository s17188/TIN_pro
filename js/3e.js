class Prognoza{
    constructor(miejscowosc,dzien_tygodnia,arr_temp){
        this.miejscowosc = miejscowosc
        this.dzien_tygodnia = dzien_tygodnia
        this.arr_temp = arr_temp
    }


    avgTemp(){
        let result = 0
        for (const temp of this.arr_temp) {
            result += parseInt(temp)
        }
        return result/this.arr_temp.length
    }
}

let p1

document.addEventListener('DOMContentLoaded', () => { 
    document.getElementById("formPrognoza").addEventListener('submit',(e)=>{
        e.preventDefault()
        p1 = new Prognoza()
        p1.miejscowosc = document.getElementById("city").value
        p1.dzien_tygodnia = document.getElementById("day").value
        p1.arr_temp = []
        document.getElementById("resPrognoza").innerHTML = 
        `
        <div><p>Miejscowosc: ${p1.miejscowosc}</p><p>Dzien tygodnia: ${p1.dzien_tygodnia}</p><p id='avgTempInfo'></p></div>
        <div class="table js">
            <table id='tempTable'>
                <tr>
                    <th>Data</th>
                    <th>Temperatura</th>
                </tr>
            </table>
        </div>
        `
    })

    document.getElementById("formTemp").addEventListener('submit',(e)=>{
        e.preventDefault()
        let temp = document.getElementById("temp").value
        p1.arr_temp.push(temp)
        document.getElementById("avgTempInfo").innerHTML = 'Srednia temperatura: ' + p1.avgTemp() + ' °C'
        document.getElementById("tempTable").innerHTML += `
        <tr>
            <td>${new Date(Date.now()).toISOString()}</td>
            <td>${temp + ' °C'}</td>
        </tr>`
    })

});