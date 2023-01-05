const request = require('request')
const geocode = (address, callback) => {
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiY2hhbmRyYWR1dHQiLCJhIjoiY2xjZnhkNzlrMXhkbTNyb3d4MWgxZWVpNiJ9.Gp2mx05b1diGoXJF9pl-xA&limit=1'
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            // even if we dont pass undefined into second parameter below, it will be undefined by default
            callback('Unable to connect to the Mapbox API', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location, Enter a correct location search', undefined)
        } else {
            callback(undefined, {
                location: body.features[0].place_name,
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1]
            })
        }
    })
}

//Synchronous code without callbacks
// const geocodeUrl = 'http://api.mapbox.com/geocoding/v5/mapbox.places/akkayyapalem.json?access_token=pk.eyJ1IjoiY2hhbmRyYWR1dHQiLCJhIjoiY2xjZnhkNzlrMXhkbTNyb3d4MWgxZWVpNiJ9.Gp2mx05b1diGoXJF9pl-xA&limit=1'

// request({ url: geocodeUrl, json: true }, (error, response) => {
//     if (error) {
//         console.log(chalk.red.bold.inverse('Unable to connect to the Mapbox API'))
//     }
//     else if (response.body.features.length === 0){
//         console.log(chalk.red.bold.inverse('Enter the correct location search'));
//     }
//     else {
//         console.log(response.body.features[0].place_name)
//         const longitude = response.body.features[0].center[0]
//         const latitude = response.body.features[0].center[1]
//         console.log(latitude, longitude)
//     }
// })

module.exports = geocode