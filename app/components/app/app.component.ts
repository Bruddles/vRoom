import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
	moduleId: module.id,
	selector: 'vroom',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.css'],
	directives: [ROUTER_DIRECTIVES]
})

export class AppComponent {
	onClick() {
		console.log('Login clicked.');
	}
}

