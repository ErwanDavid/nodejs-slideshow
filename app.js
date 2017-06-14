const express = require('express');
const app = express();
const cors = require('cors');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const config = require('./config');
const utils = require('./utils');

app.use(express.static('img'));
app.use(cors());
app.set('view engine', 'pug');

let isTimeoutRunning = false;

const initIntervalToReloadBrowser = () => {
  if(!isTimeoutRunning){
    isTimeoutRunning = true;
    utils.setIntervalToReloadBrowser();
  }
};

setInterval(utils.getNextFile, config.timer);

// Init
utils.listFiles();

// Socket
io.on('connection', (socket) => {
  utils.setSocket(socket);
  initIntervalToReloadBrowser();
});

// HTTP handler
app.get('/', (req, res) => {
  res.render('index', {currentFileSrc: utils.getCurrentFile(), socketAddress : config.socketAddress})
});

// Start server
server.listen(config.serverPort);
console.log(`Server started on port ${config.serverPort}`)
