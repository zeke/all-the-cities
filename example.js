const cities = require('.')

cities.filter(city => {
  return city.name.match('Albuquerque')
})

// [{
//   name: 'Albuquerque',
//   country: 'US',
//   altCountry: '',
//   muni: '',
//   muniSub: '',
//   featureClass: 'P',
//   featureCode: 'PPLA2',
//   adminCode: 'NM',
//   population: 545852,
//   lat: 35.08449,
//   lon: -106.65114
// }, {
//   name: 'Los Ranchos de Albuquerque',
//   country: 'US',
//   altCountry: '',
//   muni: '',
//   muniSub: '',
//   featureClass: 'P',
//   featureCode: 'PPL',
//   adminCode: 'NM',
//   population: 6024,
//   lat: 35.16199,
//   lon: -106.6428
// }]
