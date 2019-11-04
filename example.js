const cities = require('.')

console.log(cities.filter(city => {
  return city.name.match('Albuquerque')
}))

// [{
//   cityId: '5454711',
//   name: 'Albuquerque',
//   country: 'US',
//   altCountry: '',
//   muni: '',
//   muniSub: '',
//   featureClass: 'P',
//   featureCode: 'PPLA2',
//   adminCode: 'NM',
//   population: 545852,
//   loc: {
//     type: 'Point',
//     coordinates: [-106.65114, 35.084] //[lon,lat]
//   }
// }, {
//   cityId: '5476960',
//   name: 'Los Ranchos de Albuquerque',
//   country: 'US',
//   altCountry: '',
//   muni: '',
//   muniSub: '',
//   featureClass: 'P',
//   featureCode: 'PPL',
//   adminCode: 'NM',
//   population: 6024,
//   loc: {
//     type: 'Point',
//     coordinates: [-106.6428, 35.16199]
//   }
// }]
