const request = require('request')


const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=50ba5fb92ec4311678b0d4f7b9dde78e&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=f'
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
            const { temperature, feelslike } = body.current
            callback(undefined, `${description}. It is currently ${temperature} degrees out. The felt temperature is ${feelslike} degrees.`)
        }
    })
}

module.exports = forecast

