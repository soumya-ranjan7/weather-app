//import { response } from "express"

console.log('Client side javascript file is loaded!')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')
const msg3 = document.querySelector('#msg3')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    msg1.textContent = "Loading data"
    msg2.textContent = ''
    msg3.textContent = ''

    if (search === '') {
        msg1.textContent = "Please enter a location"
    }
    else {
        const url = 'http://localhost:3001/weather?address=' + location

        fetch(url).then((response) => {
        response.json().then((data) => {
        if (data.error){
            msg1.textContent = data.error
        }
        else {
            msg1.textContent = ''
            msg2.textContent = data.location
            msg3.textContent = data.forecast
        }
    })
})      
    }
})