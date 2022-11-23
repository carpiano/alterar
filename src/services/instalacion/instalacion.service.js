// Initializes the `instalacion` service on path `/instalacion`
const { Instalacion } = require('./instalacion.class');
const hooks = require('./instalacion.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/instalacion', new Instalacion(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('instalacion');

  service.hooks(hooks);
};
