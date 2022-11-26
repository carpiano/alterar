

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  // TODO: Hacer una función para enviar los datos via osc.
  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [async context => {
      const OSC = context.app.OSC;
      console.log("sending OSC data");
      const message = new OSC.Message('/filter', context.data.valor);
      context.app.osc.send(message);
      return context
    }],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
