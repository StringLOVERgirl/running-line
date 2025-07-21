import {inti} from './script.js'

window.addEventListener('DOMContentLoaded', () => {

    const cont1 = document.querySelector(".cont1");
    const cont2 = document.querySelector(".cont2");

    const percent = document.querySelector('.percent')
    const preloadcont = document.querySelector('.preloadcont')
    let intervalId

    let currentPercentage = 0

    function generateNumber(min, max) {
       let number = Math.floor(Math.random() * (max - min + 1)) + min
         return number
    }


    let interval = () => {
        currentPercentage = generateNumber(0, 5) + currentPercentage
        if (currentPercentage > 99) {
            percent.textContent = '99%' 
        } else {
        percent.textContent = currentPercentage + '%' }
    }

    function setPrecent() {
       intervalId =  setInterval(interval, 500)
    } 
    setPrecent()

    window.addEventListener('load',()=>{
        clearInterval(intervalId)
        percent.textContent = '100%'
        preloadcont.classList.add('hideLoadScrenn')
        inti(cont1,cont2)
    })
    // end of load listener

})