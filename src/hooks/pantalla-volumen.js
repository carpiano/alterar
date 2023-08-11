// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const OSC = require("osc-js");

const osc_addresses = {
    ver_y_ser_visto: '192.168.1.102',
    respirar: '192.168.1.103',
    nuevas_pieles: '192.168.1.104',
    que_hacemos: '192.168.1.101'
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

const osc_ver_y_ser_visto = new OSC({plugin: new OSC.DatagramPlugin(oscParams(osc_addresses['ver_y_ser_visto']))});
const osc_respirar = new OSC({plugin: new OSC.DatagramPlugin(oscParams(osc_addresses['respirar']))});
const osc_nuevas_pieles = new OSC({plugin: new OSC.DatagramPlugin(oscParams(osc_addresses['nuevas_pieles']))});
const osc_que_hacemos = new OSC({plugin: new OSC.DatagramPlugin(oscParams(osc_addresses['que_hacemos']))});

const osc_servers = {
    ver_y_ser_visto: osc_ver_y_ser_visto,
    respirar: osc_respirar,
    nuevas_pieles: osc_nuevas_pieles,
    que_hacemos: osc_que_hacemos,
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
