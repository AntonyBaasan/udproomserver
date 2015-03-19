var PORT = 33333;
var HOST = '127.0.0.1';

var CLIENT_PORT = 33334;
var CLIENT_HOST = '127.0.0.1';


var dgram = require('dgram');
var server = dgram.createSocket('udp4');

server.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('message', function (message, remote) {
    console.log(remote.address + ':' + remote.port + ' - ' + message);


    server.send(message, 0, message.length, CLIENT_PORT, CLIENT_HOST, function (err, bytes) {
        if (err) throw err;
        console.log('UDP message sent to ' + CLIENT_HOST + ':' + CLIENT_PORT);
    });
});

server.bind(PORT, HOST);