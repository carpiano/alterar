// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const OSC = require("osc-js");

const osc_addresses = {
    interior_este: '192.168.0.20',
    interior_oeste: '192.168.0.22',
    exterior_noreste: '192.168.0.19',
    exterior_suroeste: '192.168.0.19'
};

function oscParams(server) {
    return{
	type: 'udp4',
	send: {
	    host: server,
	    port: 9000
	}
    };
}

const osc_interior_este = new OSC({plugin: new OSC.DatagramPlugin(oscParams(osc_addresses['interior_este']))});
const osc_interior_oeste = new OSC({plugin: new OSC.DatagramPlugin(oscParams(osc_addresses['interior_oeste']))});
const osc_exterior_noreste = new OSC({plugin: new OSC.DatagramPlugin(oscParams(osc_addresses['exterior_noreste']))});
const osc_exterior_suroeste = new OSC({plugin: new OSC.DatagramPlugin(oscParams(osc_addresses['exterior_suroeste']))});

const osc_servers = {
    interior_este: osc_interior_este,
    interior_oeste: osc_interior_oeste,
    exterior_noreste: osc_exterior_noreste,
    exterior_suroeste: osc_exterior_suroeste,
};


function enviarBundle(x,y,osc_server){
    const Xmessage = new OSC.Message('/x/', x);
      const Ymessage = new OSC.Message('/y/'+ id, y);
      const pair = new OSC.Bundle([Xmessage, Ymessage]);
      osc_server.send(pair);
}

function enviarShift(x,y,osc_server){
    /*
     */
    const message = new OSC.Message('/3/xy', x, y);
    osc_server.send(message);
}

function enviarSlider(z,osc_server){
    /*
     */
    const message = new OSC.Message('/1/z', z);
    osc_server.send(message);
}

module.exports = (options = {}) => {
  return async context => {
      const id = context.id;
      const osc = context.app.osc;
      const OSC = context.app.OSC;
      const pantalla = await context.app.service('pantalla').get(id);
      
      const osc_server = osc_servers[pantalla.osc_server];
      if(context.data.nombre === 'shift') {
	  enviarShift(context.data.x/1000, context.data.y/1000, osc_server);
      };
      if(context.data.nombre === 'slider') {
	  enviarSlider(context.data.valor, id);
      };
    return context;
  };
};
