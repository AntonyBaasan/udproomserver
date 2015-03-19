var PORT = 33333;
var HOST = '127.0.0.1';

var CLIENT_PORT = 33334;
var CLIENT_HOST = '127.0.0.1';

//import packages
var dgram = require('dgram');
var prompt = require('prompt');

//create socket
var client = dgram.createSocket('udp4');
//start to listen
client.bind(CLIENT_PORT, CLIENT_HOST);


//Event listen
client.on('listening', function () {
    var address = client.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

//Event messages
client.on('message', function (message, remote) {
    console.log("SERVER SEND :: "+remote.address + ':' + remote.port + ' - ' + message);

});



//Get input
prompt.start();
//prompt.get(['username', 'password'], function(err, result) {
//    if (err) {
//        console.log('err');
//        return;
//    }

//    console.log('Command-line input received:');
//    console.log('   Username: ' + result.username);
//    console.log('   Password: ' + result.password);
//});

var askInput = function () {
    prompt.get(['username', 'password'], function (err, result) {
        if (err) {
            console.log('err');
            return;
        }

        console.log('Command-line input received:');
        console.log('   Username: ' + result.username);
        console.log('   Password: ' + result.password);

        var message = new Buffer('Message to Server from Client!');
        client.send(message, 0, message.length, PORT, HOST, function (err, bytes) {
            if (err) throw err;
            console.log('UDP message sent to ' + HOST + ':' + PORT);
        });

        askInput();
    });
}
askInput();

/*
var message = new Buffer('Message to Server from Client!');
client.send(message, 0, message.length, PORT, HOST, function (err, bytes) {
    if (err) throw err;
    console.log('UDP message sent to ' + HOST + ':' + PORT);
});
*/
