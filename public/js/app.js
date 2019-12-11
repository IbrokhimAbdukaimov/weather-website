console.log('Client side JS file is loaded')

fetch('http://puzzle.mead.io/puzzle').then((response)=>{

response.json().then((data)=>{
    console.log(data)
})
})



const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messgaeTwo=document.querySelector('#message-2')

//messageOne.textContent='From JS'

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    messageOne.textContent='loading....'
    messgaeTwo.textContent=' '
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        response.json().then((forecastData=>{
            if(!forecastData.error){
                //console.log(forecastData)
                messageOne.textContent='Location: '+forecastData.location
                messgaeTwo.textContent='Forecast: '+forecastData.forecast
            }else{
               // console.log(forecastData.error)
                messageOne.textContent=''+forecastData.error
            }
            
        }))
    })


    console.log(location)
})