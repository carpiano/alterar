// Initializes the `parlante` service on path `/parlante`
const { Parlante } = require('./parlante.class');
const createModel = require('../../models/parlante.model');
const hooks = require('./parlante.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/parlante', new Parlante(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('parlante');

  service.hooks(hooks);
};
