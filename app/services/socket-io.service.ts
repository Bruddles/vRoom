import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as io from "socket.io-client";

@Injectable()
export class SocketIoService{
	public socket = io();
	public userName: string;
	public roomName: string;
	public videoQueue: string[];
	public videoHistory: string[];

	constructor(){
		let _this = this;

		this.userName = '';
		this.roomName = '';
		this.videoQueue = [];
		this.videoHistory = [];

		//Set handlers for server broadcasts
		//if anyone else in the room adds a video 
		//add it to our video queue
		this.socket.on('updatedVideoQueue', function (videoUrl: string){
			_this.videoQueue.push(videoUrl);
		});

		//upon joining a room we will get the current video queue
		this.socket.on('fullVideoQueue', function (videoQueue: string[]){
			_this.videoQueue= videoQueue;
		});
	}

	public login(name: string){
		this.userName = name;
		this.socket.emit('login', name);
	}

	public join(name: string){
		this.roomName = name;
		this.socket.emit('join', name);
	}

	public addVideo(url: string){
		this.videoQueue.push(url);
		this.socket.emit('addVideo', url);
	}

}