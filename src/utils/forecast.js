const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = `https://api.darksky.net/forecast/ff2466eda23588ea994a56266e9fe2b5/${latitude},${longitude}`
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback("Unable to connect to Dark Sky weather service!");
        } else if (body.error) {
            callback("Dark Sky is unable to find weather for the location provided");
        } else {
            callback(undefined, `${body.daily.summary} Currently: ${body.currently.summary} at ${body.currently.temperature}°F. Today will be a low of ${body.daily.data[0].temperatureLow}°F and a high of ${body.daily.data[0].temperatureHigh}°F with a ${body.daily.data[0].precipProbability * 100}% chance of ${body.daily.data[0].precipType}. Tomorrow will be a low of ${body.daily.data[1].temperatureLow}°F and a high of ${body.daily.data[1].temperatureHigh}°F with a ${body.daily.data[1].precipProbability * 100}% chance of ${body.daily.data[1].precipType}.`)
        }
    })
};

module.exports = forecast;