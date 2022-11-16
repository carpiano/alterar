const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
const https = require('https');
const fs= require('fs');
const cors = require('cors');

// A messages service that allows to create new
// and return all existing messages
class MessageService {
  constructor() {
    this.messages = [];
  }

  async find () {
    // Just return all our messages
    return this.messages;
  }

  async create (data) {
    // The new message is the data merged with a unique identifier
    // using the messages length since it changes whenever we add one
    const message = {
      id: this.messages.length,
      text: data.text
    }

    // Add new message to the list
    this.messages.push(message);

    return message;
  }
}

// Creates an ExpressJS compatible Feathers application
const app = express(feathers());

app.use(cors());

// Parse HTTP JSON bodies
app.use(express.json());
// Parse URL-encoded params
app.use(express.urlencoded({ extended: true }));
// Host static files from the current folder
app.use(express.static(__dirname));
// Add REST API support
app.configure(express.rest());
// Configure Socket.io real-time APIs
app.configure(socketio());
// Register an in-memory messages service
app.use('/messages', new MessageService());
// Register a nicer error handler than the default Express one
app.use(express.errorHandler());

app.put('/pantalla/:id/alterar', function (req,res) {
  console.log('alterar:' + req.params.id);
  console.log(req.body);
  res.sendStatus(200);
})

app.get('/content/:file(integrantes|links).json', function (req, res, next) {
  var options = {
    root: "data",
    dotfiles: 'deny',
  }
  console.log(req.params);
  var fileName = req.params.file+".json"
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err)
    } else {
      console.log('Sent:', fileName)
    }
  })
})


// Add any new real-time connection to the `everybody` channel
app.on('connection', connection =>
  app.channel('everybody').join(connection)
);
// Publish all events to the `everybody` channel
app.publish(data => app.channel('everybody'));

// // Start the server
// app.listen(3030).on('listening', () =>
//   console.log('Feathers server listening on localhost:3030')
// );

// For good measure let's create a message
// So our API doesn't look so empty
app.service('messages').create({
  text: 'Hello world from the server'
});

const server = https.createServer({
    key: fs.readFileSync('private-key.pem'),
    cert: fs.readFileSync('private-cert.pem')
  }, app).listen(4430, "192.168.0.40");

  // Call app.setup to initialize all services and SocketIO
app.setup(server);
