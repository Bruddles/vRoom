/// <reference path='../typings/index.d.ts' />

'use strict';

import * as express from 'express';
import * as bodyParser from 'body-parser';
//import * as http from 'http';
import * as path from 'path';
import * as socketIo from 'socket.io';
//import * as moniker from 'moniker';
import {Room} from './room';
import {User} from './user';

let app = express(),
    httpServer = require('http').Server(app),
    io = socketIo(httpServer),
    moniker = require('moniker'),
    names = moniker.generator([moniker.adjective, moniker.noun]),
    users: {} = {},
    rooms: {} = {};

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support videoId-encoded bodies
    extended: true
}));

//Static served files
app.use('/app', express.static(__dirname + '/../app'));
app.use('/node_modules', express.static(__dirname + '/../node_modules'));
app.use('/systemjs.config.js', express.static(__dirname + '/../systemjs.config.js'));

app.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, './../index.html'));
});

httpServer.listen(3000, function () {
    console.log('listening on *:3000');
});

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
        let user: User = getUserFromSocket(socket);
        console.log('Adding video: ' + videoId);

        if (!isNullOrUndefined(user)){
            addVideo(socket, videoId);
            //use io.sockets to go to every client in the room, including the sender
            io.sockets.in(user.room.name).emit('updatedVideoQueue', videoId);
        }
    });

    // current video ended
    socket.on('currentVideoEnded', function (currentVideoId) {
        let user: User = getUserFromSocket(socket);

        if (!isNullOrUndefined(user)){
            //check that the current id matches out queue
            if (currentVideoId = rooms[user.room.name].videoQueue[0]){
                //remove the current video and add it to the history
                rooms[user.room.name].videoHistory.push(
                    rooms[user.room.name].videoQueue.splice(0, 1)[0]
                );
            } 

            io.sockets.in(user.room.name).emit('fullVideoQueue', sendVideoQueue(socket));
        }
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
    let user = new User(name, socket.id);
    users[socket.id] = user;
}

// Creates/joins a room
function join(socket, name) {
    let user: User = getUserFromSocket(socket),
        room: Room;
    
    if (!isNullOrUndefined(user)){
        // If no room name was supplied, generate one
        if (name === '') {
            name = names.choose();
        }

        room = rooms[name];
        // if room does not exist, create one
        if (room === undefined) {
            room = new Room(name);
            rooms[name] = room;
        }

        // associate socket/user with this room
        socket.join(name);
        rooms[name].users.push(user);
        user.room = room;
    }
}

function addVideo(socket, videoId) {
    let user: User = getUserFromSocket(socket);

    if (!isNullOrUndefined(user)){
        // if the current queue is empty, send out the new video id
        if (user.room.videoQueue.length === 0) {
            socket.in(user.room.name).emit('nextVideo', videoId);
        }

        // add the id to the queue
        user.room.videoQueue.push(videoId);
    }
}

function sendCurrentVideo(socket) {
    let user: User = getUserFromSocket(socket);
    // return current video
    return isNullOrUndefined(user) || isNullOrUndefined(user.room) ? [] : user.room.videoQueue[0];
}

function sendVideoQueue(socket) {
    let user: User = getUserFromSocket(socket);
    // return videoQueue
    return isNullOrUndefined(user) || isNullOrUndefined(user.room) ? [] : user.room.videoQueue;
}

// Remove user from room
function leave(socket) {
    let user: User = getUserFromSocket(socket);

    //remove user from current room
    //if user is in a room
    if (!isNullOrUndefined(user)
        && !isNullOrUndefined(user.room) 
        && !isNullOrUndefined(user.room.name)
        && rooms[user.room.name].users.indexOf(user) > -1){
            rooms[user.room.name].users.splice(rooms[user.room.name].users.indexOf(user), 1);

            // if room is empty, delete room
            if (rooms[user.room.name].users.length === 0) {
                delete rooms[user.room.name];
            }
    }

    // remove current user from the list
    delete users[socket.id];
}

function getUserFromSocket (socket): User {
    let user: User = users[socket.id];

    if (isNullOrUndefined(user)){
        console.log('Cannot find user for socket id: ' + socket.id);
        return null;
    }

    return user;
}

function isNullOrUndefined(val): boolean {
    return (val === null || typeof val === "undefined")
}
