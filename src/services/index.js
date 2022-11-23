const instalacion = require('./instalacion/instalacion.service.js');
const pantalla = require('./pantalla/pantalla.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(instalacion);
  app.configure(pantalla);
};
