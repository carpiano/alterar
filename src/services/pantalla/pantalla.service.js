// Initializes the `Pantalla` service on path `/pantalla`
const { Pantalla } = require('./pantalla.class');
const createModel = require('../../models/pantalla.model');
const hooks = require('./pantalla.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
    app.use('pantalla', new Pantalla(options, app), {events: ['locked']});
    console.log(options.Model.db);

  // Get our initialized service so that we can register hooks
  const service = app.service('pantalla');
//  service.on('patched', (message) => console.log('pantalla patched', message))
  service.hooks(hooks);
};
