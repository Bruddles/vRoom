import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SocketIoService } from './../../services/socket-io.service';

@Component({
	moduleId: module.id,
	selector: 'room-login',
	templateUrl: 'room-login.component.html'
})
export class RoomLoginComponent {
	@Input() username: string;
	roomname: string;

	constructor(
		private router: Router,
		private socketIoService: SocketIoService) { }


	join() {
		let link = ['/room'];

		//route to room
		this.router.navigate(link);
		this.socketIoService.join(this.roomname);

	}
}