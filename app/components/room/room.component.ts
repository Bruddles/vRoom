import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {SocketIoService} from './../../services/socket-io.service';

@Component({
	moduleId: module.id,
	selector: 'vroom',
	templateUrl: 'room.component.html',
	styleUrls: ['room.component.css']
})

export class RoomComponent implements OnInit {
	@Input() username: string;
	@Input() roomname: string;
	
	constructor(
		private route: ActivatedRoute,
		private socketIoService: SocketIoService) { }

	ngOnInit(): void {
		this.route.params.forEach((params: Params) => {
			this.username = params['username'];
			this.roomname = params['roomname'];
		});
	}
}

