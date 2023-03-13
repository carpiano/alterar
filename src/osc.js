const OSC = require("osc-js");
const options = {
  type: 'udp4',         // @param {string} 'udp4' or 'udp6'
  send: {
    host: '192.168.0.16',    // @param {string} Hostname of udp client for messaging
    port: 7400               // @param {number} Port of udp client for messaging
  }
}
const osc = new OSC({plugin: new OSC.DatagramPlugin(options)});

module.exports = { OSC , osc } ;
