import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import {SocketIoService} from './../../services/socket-io.service';
import {DataStoreService} from './../../services/data-store.service';

@Component({
	moduleId: module.id,
	selector: 'login',
	templateUrl: 'login.component.html',
	styleUrls: ['login.component.css']
})
export class LoginComponent {
	username: string;

	constructor(private router: Router,
		private socketIoService: SocketIoService,
		private dataStoreService: DataStoreService) {
        }

	userLogin() {
		let link = ['/room-login'];

		if (!!this.username && !!this.username.trim()){
			//route to room login
			this.router.navigate(link);
            this.dataStoreService.username = this.username;
			this.socketIoService.login(this.username);
		} else {
			alert('Please enter a username.');
		}
	}
}