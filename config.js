const ipAddress = process.argv[2];
const serverPort = 3333;
const timer = 5000;
const socketAddress = `${ipAddress}:${serverPort}`;

module.exports = {
    serverPort,
    socketAddress,
    timer,
};
