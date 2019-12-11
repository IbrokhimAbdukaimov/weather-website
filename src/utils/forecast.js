const request=require('request')

const forecast=(latitude, longitude, callback)=>{
    const url='https://api.darksky.net/forecast/6b5452d719f970fbe132325ff93786dd/'+longitude+','+latitude+'?units=si&lang=ru'
    request({url,json:true},(error,{body})=>{
        //request({url: url,json:true},(error,response)=>{
        if(error){
            callback('connection error',undefined)
        }else if(body.error){
        //}else if(response.body.error){
            callback('Unable to find location',undefined)
        }else{
            //callback(undefined,{
                //forecastData: 'In '+body.timezone+' it is '+body.currently.icon+' and '+body.currently.temperature+' C '+' and '+body.currently.precipProbability+' chance of rain'
                
                // timezone: body.timezone,
                // temperature: body.currently.temperature,
                // precipitation: body.currently.precipProbability
                // timezone: response.body.timezone,
                // temperature: response.body.currently.temperature,
                // precipitation: response.body.currently.precipProbability
            
            
            
            //})
            callback(undefined, 'In '+body.timezone+' it is '+body.currently.icon+' and '+body.currently.temperature+' C '+' and '+body.currently.precipProbability*100+'% chance of rain')

        }
    })
}

module.exports=forecast