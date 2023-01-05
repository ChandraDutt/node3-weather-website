const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8c37a7bf6dd14102b5430972a3293d75&query=' + latitude + ',' + longitude
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Could not connect to Weatherstack API', undefined)
        }
        else if (body.error) {
            callback('Unable to find location', undefined)
        }
        else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' +
                body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.')
        }
    })
}

// Synchronous code without callbacks
// request({ url: url, json: true }, (error, response) => {

//     if (error) {
//         console.log(chalk.red.bold.inverse('Could not connect to Weatherstack API'));
//     }
//     else if(response.body.error){
//         console.log(chalk.red.bold.inverse('Unable to find location'));
//     }
//     else {
//         // Will print the current temperature to the console
//         console.log(response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature +
//             ' degrees out. It feels like ' + response.body.current.feelslike + ' degrees out.')
//     }

// })

module.exports = forecast