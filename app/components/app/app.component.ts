import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {SocketIoService} from './../../services/socket-io.service';

@Component({
	moduleId: module.id,
	selector: 'vroom',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.css'],
	directives: [ROUTER_DIRECTIVES]
})

export class AppComponent {
	constructor(private socketIoService: SocketIoService){}
}

