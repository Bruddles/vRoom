'use strict'
//Server modules
let express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    path = require('path'),
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
app.use(bodyParser.urlencoded({     // to support videoId-encoded bodies
    extended: true
}));

//Static served files
app.use('/app', express.static(__dirname + '/app'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/systemjs.config.js', express.static(__dirname + '/systemjs.config.js'));

app.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});

//Socket.io stuff
io.on('connection', function (socket) {
    console.log('A user connected.');

    //login
    socket.on('login', function (name) {
        console.log('A user logged in under the name ' + name);
        login(socket, name);
    });

    //join room
    socket.on('join', function (name) {
        console.log('A user joined the room ' + name);
        join(socket, name);
        socket.emit('fullVideoQueue', sendVideoQueue(socket));
    });

    //add video
    socket.on('addVideo', function (videoId) {
        console.log('Adding video: ' + videoId);
        addVideo(socket, videoId);
        socket.to(socket.roomName).emit('updatedVideoQueue', videoId);
    });

    // current video ended
    socket.on('currentVideoEnded', function (currentVideoId) {
        //check that the current id matches out queue
        if (currentVideoId = rooms[socket.roomName].videoQueue[0]){
            //remove the current video and add it to the history
            rooms[socket.roomName].videoHistory.push(
                rooms[socket.roomName].videoQueue.splice(0, 1)[0]
            );
        } 

        socket.emit('fullVideoQueue', sendVideoQueue(socket));
    });

    //next video
    socket.on('nextVideo', function (currentVideoId) {
        socket.to(socket.roomName).emit('nextVideo', nextVideo(socket, currentVideoId));
    });

    //disconnect (cleanup)
    socket.on('disconnect', function () {
        console.log('A user disconnected');
        leave(socket);
    });
});

// Creates a new username
function login(socket, name) {
    // create username
    usernames.push(name);
    // associate username with this socket
    socket.userName = name;
}

// Creates/joins a room
function join(socket, name) {
    // If no room name was supplied, generate one
    if (name === '') {
        name = names.choose();
    }

    // if room does not exist, create one
    if (rooms[name] === undefined) {
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
    rooms[name].users.push(socket.userName);
}

function addVideo(socket, videoId) {
    // if the current queue is empty, send out the new video id
    if (rooms[socket.roomName].videoQueue.length === 0) {
        socket.to(socket.roomName).emit('nextVideo', videoId);
    }

    // add the id to the queue
    rooms[socket.roomName].videoQueue.push(videoId);
}

function sendCurrentVideo(socket) {
    // return current video
    return rooms[socket.roomName] === undefined ? [] : rooms[socket.roomName].videoQueue[0];
}

function sendVideoQueue(socket) {
    // return videoQueue
    return rooms[socket.roomName] === undefined ? [] : rooms[socket.roomName].videoQueue;
}

function nextVideo(socket, currentVideoId) {
    // if current video on client matches current video on server
    // move current videoId to history
    if (rooms[socket.roomName].videoQueue[0] === currentVideoId) {
        let removed = rooms[socket.roomName].videoQueue.splice(0, 1)[0];

        rooms[socket.roomName].videoHistory.push(removed);
    }
    // return next video
    return rooms[socket.roomName] === undefined ? '' : rooms[socket.roomName].videoQueue[0];

}

// Remove user from room
function leave(socket) {
    // remove current user from the list
    if (usernames.indexOf(socket.userName) > -1) {
        usernames.splice(usernames.indexOf(socket.userName), 1);
    }

    // remove user from the room users list
    if (!isNullOrUndefined(socket.roomName) && !isNullOrUndefined(rooms[socket.roomName]) != null && !isNullOrUndefined(rooms[socket.roomName].users)) {
        rooms[socket.roomName].users.splice(rooms[socket.roomName].users.indexOf(socket.userName), 1);

        // if room is empty, delete room
        if (rooms[socket.roomName].users.length === 0) {
            delete rooms[socket.roomName];
        }
    }
}

function isNullOrUndefined(val) {
    return (val === null || typeof (val) !== undefined)
}
