import { Component, Input } from '@angular/core';
import {SocketIoService} from './../../services/socket-io.service';

@Component({	
	moduleId: module.id,
	selector: 'login',
	templateUrl: 'login.component.html'
})
export class LoginComponent{
	username: string;

	 constructor(private socketIoService: SocketIoService){}

	 userLogin(){
		 debugger;
	 	this.socketIoService.login(this.username);
	 }
}