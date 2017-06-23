import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SocketIoService } from './../../services/socket-io.service';
import { DataStoreService } from './../../services/data-store.service';

@Component({
	moduleId: module.id,
	selector: 'room-login',
	templateUrl: 'room-login.component.html',
	styleUrls: ['room-login.component.css']
})
export class RoomLoginComponent {
	@Input() username: string;
	roomname: string;

	constructor(
		private router: Router,
		private socketIoService: SocketIoService,
		private dataStoreService: DataStoreService) { 
        if (!!this.dataStoreService.username){
			this.socketIoService.login(this.dataStoreService.username);
        }
    }


	join() {
		let link = ['/room'];

		//route to room
		this.router.navigate(link);
        this.dataStoreService.roomname = this.roomname;
		this.socketIoService.join(this.roomname);
	}
}