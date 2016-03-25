#!/usr/bin/env node

const fs = require('fs')
const split = require('split2')
const through = require('through2')
const cities = require('cities1000')

var results = []

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

  console.error(row.name)

  results.push({
    name: row.name,
    country: row.country,
    altCountry: row.altCountry,
    muni: row.municipality,
    muniSub: row.municipalitySubdivision,
    featureClass: row.featureClass,
    featureCode: row.featureCode,
    adminCode: row.adminCode,
    population: row.population,
    lat: parseFloat(row.lat),
    lon: parseFloat(row.lon)
  })

  next()
})

fs.createReadStream(cities.file)
  .pipe(split())
  .pipe(rowStream)

rowStream.on('finish', function () {
  process.stdout.write(JSON.stringify(results, null, 2))
})
