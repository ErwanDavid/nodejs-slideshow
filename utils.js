const fs = require('fs');
const timer = require('./config').timer;

let browserSocket;
let filesCache = [];
let currentFile = '';

const listFiles = () => {
    fs.readdir('img', (err, files) => {
        files.sort();
        filesCache = files;
    });
}

const setIntervalToReloadBrowser = () => {
  setInterval(() => {
    browserSocket.emit('reload');
  }, timer);
}

const setSocket = (socket) => {
  browserSocket = socket;
}

const getNextFile = () => {
    currentFile = filesCache.shift();
    if(filesCache.length === 0){
        listFiles();
    }
}

const getCurrentFile = () => {
  if (!fs.existsSync(`img/${currentFile}`)) {
    fs.readdir('img', (err, files) => {
        files.sort();
        filesCache = files;
        return filesCache[0];
    });
  }
  return currentFile;
}

module.exports = {
  getNextFile,
  setSocket,
  setIntervalToReloadBrowser,
  listFiles,
  getCurrentFile,
}
