#!/usr/bin/env node

const fs = require('fs')
const split = require('split2')
const through = require('through2')
const cities = require('cities1000')
const Pbf = require('pbf')

var pbf = new Pbf()

var lastLat = 0
var lastLon = 0

var rowStream = through(function (line, enc, next) {
  var row = line.toString().split('\t').reduce(function (acc, x, ix) {
    var key = cities.fields[ix]
    if (key === 'alternativeNames') x = x.split(',')
    if (key === 'lat' || key === 'lon') x = parseFloat(x)
    if (key === 'elevation') x = x ? parseInt(x, 10) : undefined
    if (key === 'population') x = x ? parseInt(x, 10) : undefined

    acc[key] = x
    return acc
  }, {})
  if (!row.id) return

  pbf.writeRawMessage(writeCity, row)

  next()
})

function writeCity(city, pbf) {
  pbf.writeStringField(1, city.name)
  pbf.writeStringField(2, city.country)

  if (city.altCountry && city.altCountry !== city.country)
    pbf.writeStringField(3, city.altCountry)

  if (city.municipality)
    pbf.writeStringField(4, city.municipality)

  if (city.municipalitySubdivision)
    pbf.writeStringField(5, city.municipalitySubdivision)

  pbf.writeStringField(6, city.featureCode)
  pbf.writeStringField(7, city.adminCode)

  if (city.population)
    pbf.writeVarintField(8, city.population)

  const lat = Math.round(1e5 * city.lat)
  const lon = Math.round(1e5 * city.lon)
  pbf.writeSVarintField(9, lat - lastLat)
  pbf.writeSVarintField(10, lon - lastLon)
  lastLat = lat
  lastLon = lon
}

fs.createReadStream(cities.file)
  .pipe(split())
  .pipe(rowStream)

rowStream.on('finish', function () {
  process.stdout.write(Buffer.from(pbf.finish()))
})
