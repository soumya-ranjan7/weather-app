const request = require('request')

const geocode = (address, callback)  =>  {
    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic291bXlhcmFuamFuNyIsImEiOiJja2d2dXdtdWwwMmxoMnJwaXE5NmZ5NGVjIn0.h4fee0qTO9OClMtGHf540A&limit=1'


    request({url, json: true}, (error, {body}) => {
  
        if (error) {
            callback('Unable to connect to location service.', undefined)
        }
        else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        }
        else {
            const latitude = body.features[0].center[1]
            const longitude = body.features[0].center[0]
            const location = body.features[0].place_name
            callback(undefined, {latitude, longitude, location})
        }
    })    
}

module.exports = geocode
 