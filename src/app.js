const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');

// TODO: mover esto a un módulo propio.
const { OSC , osc } = require("./osc");

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');


const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');

// TODO: no estamos usando esto, lo necesitamos?
// const socketio = require('@feathersjs/socketio');
// const channels = require('./channels');

const app = express(feathers());

app.OSC = OSC;
app.osc = osc;

// TODO: por qué necesitamos abrir un puerto si sólo queremos enviar cosas?
app.osc.open({ port: 9912 });

// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet({
    contentSecurityPolicy: false
}));
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', express.static(app.get('public')));

// TODO: mover esto a un módulo propio.
// Contenido más o menos estático que queremos servir.
app.get('/content/:file(integrantes|links).json', function (req, res, next) {
    var options = {
	root: "data",
	dotfiles: 'deny',
    }; 
    var fileName = req.params.file+".json" ;
    res.sendFile(fileName, options, function (err) {
	if (err) {
	    next(err) ;
	} else {
	    console.log('Sent:', fileName);
	}
    });
});

// Set up Plugins and providers
app.configure(express.rest());

// TODO: Por ahora no lo estamos usando.
// app.configure(socketio());

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
// Set up our services (see `services/index.js`)
app.configure(services);

// Set up event channels (see channels.js)
// TODO: Necesitamos esto?
//app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

module.exports = app;
