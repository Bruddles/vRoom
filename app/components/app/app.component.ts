import {Component} from '@angular/core';
import {SocketIoService} from './../../services/socket-io.service';

@Component({
	moduleId: module.id,
	selector: 'vroom',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.css']
})

export class AppComponent {
	constructor(private socketIoService: SocketIoService){}
}

