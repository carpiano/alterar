const https = require('https');
const app = require('./src/app');
const fs= require('fs');


const server = https.createServer({
    key: fs.readFileSync('private-key.pem'),
    cert: fs.readFileSync('private-cert.pem'),
    cors: {origin: 'https://192.168.0.15:3000', credentials:true}
  }, app).listen(4430, "0.0.0.0");

  // Call app.setup to initialize all services and SocketIO

app.setup(server);
