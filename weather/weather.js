const request = require('request');

const getWeather = (lat, long, callback) => {
  const {darkSkyApiKey} = require('../secrets');
  request({
    url: `https://api.darksky.net/forecast/${darkSkyApiKey}/${lat},${long}?units=si`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, {
        currentTemp: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature,
      })
    } else {
      callback('Unable to fetch weather.')
    }
  })
};

module.exports = {
  getWeather
};
