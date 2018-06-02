# Node Weather
Geocoded weather results from command line.

**API's**
- google geolocation
- dark sky

**Third-party modules:**
- yargs
- request
- axios

**Two Versions:**
- app.js
  - using callbacks with http requests using request module.
- app-promise.js
  - using promises with http requests using axios module.

## Getting Started Guide

**Install modules**

`npm install`

Run either app.js or app-promise.js followed by address option and a valid address string

**Example:**

`node app-promise.js --address '120 Spencer St, Melbourne'`

**Example Output:**

```
120 Spencer St, Melbourne VIC 3000, Australia

      It's currently 15.92 celsius.
      It feels like 16.34 celsius
```