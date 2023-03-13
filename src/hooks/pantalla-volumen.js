// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const OSC = require("osc-js");

const options = {
  type: 'udp4',         // @param {string} 'udp4' or 'udp6'
  send: {
    host: '192.168.0.16',    // @param {string} Hostname of udp client for messaging
    port: 7400               // @param {number} Port of udp client for messaging
  }
}
const osc = new OSC({plugin: new OSC.DatagramPlugin(options)});

function enviarBundle(x,y,id){
    const Xmessage = new OSC.Message('/x/', x);
      const Ymessage = new OSC.Message('/y/'+ id, y);
      const pair = new OSC.Bundle([Xmessage, Ymessage]);
      osc.send(pair);
}

function enviarShift(x,y,id){
    /*
     */
    const message = new OSC.Message('/3/xy', x, y);
    osc.send(message);
}

function enviarSlider(z,id){
    /*
     */
    const message = new OSC.Message('/1/z', z);
    osc.send(message);
}

module.exports = (options = {}) => {
  return async context => {
      const id = context.id;
      const osc = context.app.osc;
      const OSC = context.app.OSC;
      if(context.data.nombre === 'shift') {
	  console.log(context.data);
	  enviarShift(context.data.x/1000, context.data.y/1000, id);
      };
      if(context.data.nombre === 'slider') {
	  console.log(context.data);
	  enviarSlider(context.data.valor, id);
      };
    return context;
  };
};
