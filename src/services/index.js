const instalacion = require('./instalacion/instalacion.service.js');
const pantalla = require('./pantalla/pantalla.service.js');
const parlante = require('./parlante/parlante.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(instalacion);
  app.configure(pantalla);
  app.configure(parlante);
};
