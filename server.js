	//Server modules
let express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	http = require('http').Server(app),
	io = require('socket.io')(http),
	//node modules
	moniker = require('moniker'),
	names = moniker.generator([moniker.adjective, moniker.noun]),
	//variables
	usernames = [],
	rooms = [],
	usersInRoom = {},
	videoQueue = {}, //video queue by room
	currentIndex = {}; //current index by room

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: true
})); 

//Static served files
app.use(express.static('src'));
app.use(express.static('bower_components'));

http.listen(3000, function () {
	console.log('listening on *:3000');
});

//Socket.io stuff
io.on('connection', function(socket){
	console.log('A user connected.');
	
	//login
	socket.on('login', function(name){
		login(socket, name);
	});
	
	//join room
	socket.on('join', function(name){
		join(socket, name);
	});
	
	//add video
	socket.on('addVideo', function(url){
		addVideo(socket, url);
	});
	
	//next video
	socket.on('nextVideo', function(){
		socket.to(socket.roomName).emit('nextVideo', nextVideo(socket));
	});
	
	//disconnect (cleanup)
	socket.on('disconnect', function(){
		console.log('A user disconnected');
		leave(socket);
	});
});

function login(socket, name){
	usernames.push(name);
	socket.userName = name;
}

function join(socket, name){
	if (name ===''){
		name = names.choose();
	}
	
	if (rooms.indexOf(name) === -1){
		rooms.push(name);
		usersInRoom[name] = [];
		videoQueue[name] = [];
		currentIndex[name] = 0;
	}
	
	socket.roomName = name;
	socket.join(name);
	usersInRoom[name].push(name);
}

function addVideo(socket, url){
	videoQueue[socket.roomName].push(url);
}

function nextVideo(socket){
	let url;
	
	if (videoQueue[socket.roomName].length <= currentIndex[socket.roomName]){
		url = '';
	} else {
		url = videoQueue[socket.roomName][currentIndex[socket.roomName]];
		currentIndex[socket.roomName]++;
	}
	return url;
}

function leave(socket){
	usernames.splice(usernames.indexOf(socket.userName), 1);
	usersInRoom[socket.userName].splice(usersInRoom[socket.userName].indexOf(socket.userName), 1);
	if (usersInRoom[socket.userName].length === 0){
		delete usersInRoom[socket.userName];
		rooms.splice(rooms.indexOf(socket.roomName), 1);
	}
}
