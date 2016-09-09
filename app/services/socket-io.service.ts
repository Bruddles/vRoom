import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as io from "socket.io-client";

@Injectable()
export class SocketIoService {
	public socket = io();

	public login(name){
		this.socket.emit('login', name);
	}

	public join(name){
		this.socket.emit('join', name);
	}

}