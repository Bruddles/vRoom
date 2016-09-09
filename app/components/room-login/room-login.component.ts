import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SocketIoService } from './../../services/socket-io.service';

@Component({
	moduleId: module.id,
	selector: 'room-login',
	templateUrl: 'room-login.component.html'
})
export class RoomLoginComponent implements OnInit {
	@Input() username: string;
	roomname: string;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private socketIoService: SocketIoService) { }

	ngOnInit(): void {
		this.route.params.forEach((params: Params) => {
			this.username = params['username'];
		});
	}

	join() {
		let link = ['/room', this.username, this.roomname];

		//route to room
		this.router.navigate(link);
		this.socketIoService.join(this.roomname);

	}
}