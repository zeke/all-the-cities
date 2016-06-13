const test = require('tape')
const cities = require('.')

test('all-the-cities', function (t) {
  t.plan(6)
  t.ok(Array.isArray(cities), 'cities is an array')
  t.ok(cities.length > 10000, 'cities contains 10,000 of cities')
  t.ok(cities[0].name, 'cities have a name')
  t.ok(cities[0].name, 'cities have a country')
  t.ok(cities[0].name, 'cities have a lat')
  t.ok(cities[0].name, 'cities have a lon')
})
