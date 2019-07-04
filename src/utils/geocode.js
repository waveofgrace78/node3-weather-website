const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(address)}.json?access_token=pk.eyJ1Ijoid2F2ZW9mZ3JhY2U3OCIsImEiOiJjanhqYnFvYTkwMnB1M3ZudXJhNWtzeDExIn0.llVEVgB6hx2Lmc0vW44vKw&limit=1`
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback("Unable to connect to mapbox location service!");
        } else if (body.features.length === 0) {
            callback("Unable to find coordinates for location provided");
        } else {
            callback(undefined, {
                location: body.features[0].place_name,
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1]
            })
        }
    })
}

module.exports = geocode;