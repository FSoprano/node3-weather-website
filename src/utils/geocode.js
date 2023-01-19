const request = require('request');
const geocode = (address, callback) => {
    const apikey=process.env.MAPBOX_API_KEY
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + `.json?access_token=${apikey}&limit=1`
    // encodeURIComponent gets special characters right if they are part of the request term.
    request({ url, json:true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if ( body.features.length === 0) {
            callback('Unable to find location. Please try another search term.', undefined)
        } else {
            //1st is undefined because error has no value if things go right.
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })

        }

    })
}
module.exports = geocode