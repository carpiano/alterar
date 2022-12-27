// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const OSC = context.app.OSC;
    const id = context.id;
    const message = new OSC.Message('/pantalla/'+ id, context.data.valor);
    context.app.osc.send(message);
    return context;
  };
};
