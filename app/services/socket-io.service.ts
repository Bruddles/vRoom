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
		this.userName = '';
		this.roomName = '';
		this.videoQueue = [];
		this.videoHistory = [];

		//Set handlers for server broadcasts
		this.socket.on('updatedVideoQueue', function (videoQueue: string[]){
			this.videoQueue = videoQueue;
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
		this.socket.emit('addVideo', url);
	}

}