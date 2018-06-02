const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    address: {
      demand: true,
      alias: 'a',
      describe: 'Address to fetch weather for',
      string: true,
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

const {googleApiKey, darkSkyApiKey} = require('./secrets');
const encodedAddress = encodeURIComponent(argv.address);
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${googleApiKey}`;

axios.get(geocodeUrl)
  .then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
      throw new Error('Unable to find that address.');
    }
    const lat = response.data.results[0].geometry.location.lat;
    const lng = response.data.results[0].geometry.location.lat;
    const weatherUrl = `https://api.darksky.net/forecast/${darkSkyApiKey}/${lat},${lng}?units=si`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
  })
  .then((response) => {
    const currentTemp = response.data.currently.temperature;
    const currentApparentTemp = response.data.currently.apparentTemperature;
    console.log(`
      It's currently ${currentTemp} celsius. 
      It feels like ${currentApparentTemp} celsius`
    );
  })
  .catch((err) => {
    if (err.code === 'ENOTFOUND') {
      console.log('Unable to connect to API servers.');
    } else {
      console.log(err.message);
    }
  });
