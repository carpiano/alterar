const OSC = require("osc-js");
const osc = new OSC({
    plugin: new OSC.DatagramPlugin({ send: { port: 5005, host: '127.0.0.1' } })
  });

module.exports = { OSC , osc } ;
