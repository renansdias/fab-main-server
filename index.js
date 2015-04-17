// native deps
var path = require('path');

// external deps
var deployd = require('deployd');

// internal deps
var createMarkedHtmlServer = require('./lib/create-marked-html-server'),
	createSocketServer = require('./lib/create-socket-server'),
	createBracketsServer = require('./lib/create-brackets-server');


/////////////////////
// Create the marked html server
createMarkedHtmlServer({
	port: 3000,
	
	root: path.join(__dirname, 'web/app-source/www'),
	xPathAttribute: 'data-x-path',
	fnameAttribute: 'data-fname'
});

/////////////////
// Create the socket server
createSocketServer({
	port: 4000,

	socketNamespace: '/canvas',
})


/////////////////
// Create the brackets editor server
createBracketsServer({
	port: 8000,
	projectsDir: path.join(__dirname, 'web'),
	supportDir: path.join(__dirname, 'web/support')
});

var options = {
	port: 3051, 
	db: {
		host: 'localhost',
		port: 27017,
		name: 'dpd'
	}
};

var server = deployd(options);

server.listen();

server.on('listening', function() {
	console.log('Server is listening');
});