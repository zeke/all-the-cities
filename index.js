const Pbf = require('pbf')
const fs = require('fs')
const path = require('path')

var pbf = new Pbf(fs.readFileSync(path.join(__dirname, 'cities.pbf')))
var cities = []

var lastLat = 0
var lastLon = 0

while (pbf.pos < pbf.length) {
    cities.push(pbf.readMessage(readCity, {
        name: '',
        country: '',
        featureCode: '',
        adminCode: '',
        population: 0,
        lat: 0,
        lon: 0
    }))
}

module.exports = cities

function readCity(tag, city, pbf) {
    if (tag === 1) city.name = pbf.readString()
    else if (tag === 2) city.country = pbf.readString()
    else if (tag === 3) city.altCountry = pbf.readString()
    else if (tag === 4) city.muni = pbf.readString()
    else if (tag === 5) city.muniSub = pbf.readString()
    else if (tag === 6) city.featureCode = pbf.readString()
    else if (tag === 7) city.adminCode = pbf.readString()
    else if (tag === 8) city.population = pbf.readVarint()
    else if (tag === 9) {
        lastLat += pbf.readSVarint()
        city.lat = lastLat / 1e5
    } else if (tag === 10) {
        lastLon += pbf.readSVarint()
        city.lon = lastLon / 1e5
    }
}
