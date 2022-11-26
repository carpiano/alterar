const https = require('https');
const app = require('./src/app');
const fs= require('fs');


const server = https.createServer({
    key: fs.readFileSync('private-key.pem'),
    cert: fs.readFileSync('private-cert.pem')
  }, app).listen(4430, "localhost");

  // Call app.setup to initialize all services and SocketIO

app.setup(server);
