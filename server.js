'use strict'
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
	rooms = {};
	
/*
	Room:	
		users
		videoQueue
		videoHistory
*/

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
	socket.on('nextVideo', function(currentUrl){
		socket.to(socket.roomName).emit('nextVideo', nextVideo(socket, currentUrl));
	});
	
	//disconnect (cleanup)
	socket.on('disconnect', function(){
		console.log('A user disconnected');
		leave(socket);
	});
});

// Creates a new username
function login(socket, name){
	// create username
	usernames.push(name);
	// associate username with this socket
	socket.userName = name;
}

// Creates/joins a room
function join(socket, name){
	// If no room name was supplied, generate one
	if (name ===''){
		name = names.choose();
	}
	
	// if room does not exist, create one
	if (rooms[name] === undefined){
		//TODO: create a room class
		rooms[name] = {
			users: [],
			videoQueue: [],
			videoHistory: []
		};
	}
	
	// associate socket/user with this room
	socket.roomName = name;
	socket.join(name);
	rooms[name].users.push(name);
}

function addVideo(socket, url){
	// if the current queue is empty, send out the new video id
	if (rooms[socket.roomName].videoQueue.length === 0){
		socket.to(socket.roomName).emit('nextVideo', url);
	}
	
	// add the id to the queue
	rooms[socket.roomName].videoQueue.push(url);
}

function nextVideo(socket, currentUrl){
	// if current video on client matches current video on server
	// move current url to history
	if (rooms[socket.roomName].videoQueue[0] === currentUrl){
		let removed = rooms[socket.roomName].videoQueue.splice(0, 1)[0];
		
		rooms[socket.roomName].videoHistory.push(removed);
	}
	// return next video
	return rooms[socket.roomName] === undefined ? '' : rooms[socket.roomName].videoQueue[0];
	
}

// Remove user from room
function leave(socket){
	// remove current user from the list
	usernames.splice(usernames.indexOf(socket.userName), 1);
	
	// remove user from the room users list
	rooms[socket.roomName].users.splice(rooms[socket.roomName].users.indexOf(socket.userName), 1);
	
	// if room is empty, delete room
	if (rooms[socket.roomName].users.length === 0){
		delete rooms[socket.roomName];
	}
}
