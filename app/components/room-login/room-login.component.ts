import { Component, Input } from '@angular/core';
import {SocketIoService} from './../../services/socket-io.service';

@Component({
	moduleId: module.id,
	selector: 'room-login',
	templateUrl: 'room-login.component.html'
})
export class RoomLoginComponent{
	roomname: string;

	constructor(private socketIoService: SocketIoService){}

	join(){
		this.socketIoService.join(this.roomname);
	}

	create(){
		this.socketIoService.create();
	}
}