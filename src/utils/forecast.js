const request = require('request')


const forecast = (latitude, longitude, callback) => {

    const apikey = process.env.WEATHERSTACK_API_KEY

    const url = `http://api.weatherstack.com/current?access_key=${apikey}&query=` + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)
    // One could add something like "+ '&units=f'" to get the temperature values in Fahrenheit.
    request( { url, json: true }, (error, { body }) => {
        // error, like request, is an object with that name. It will not be available
        // if false or missing user input is given.
        if (error) {
            callback("Unable to connect to weather service!", undefined);
        } else if (body.error) {
        // response.body.error => part of response object. Available for example in 
        // cases of missing user input.
            callback('Unable to find location', undefined)
        }
        
        else {
        // const data = JSON.parse(response.body)
        // No longer required because json:true, that means we do not have to parse it.
            const description = body.current.weather_descriptions[0]
            const { temperature, feelslike, humidity } = body.current
            callback(undefined, `${description}. It is currently ${temperature} degrees out. 
                It feels like ${feelslike} degrees. The humidity is ${humidity} percent.`
            )
        }
    })
}
module.exports = forecast

