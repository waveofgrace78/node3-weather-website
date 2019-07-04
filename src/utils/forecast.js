const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = `https://api.darksky.net/forecast/ff2466eda23588ea994a56266e9fe2b5/${latitude},${longitude}`
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback("Unable to connect to Dark Sky weather service!");
        } else if (body.error) {
            callback("Dark Sky is unable to find weather for the location provided");
        } else {
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain.`)
        }
    })
};

module.exports = forecast;