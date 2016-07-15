import {Component} from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'vroom',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.css']
})

export class AppComponent {
	onClick() {
		console.log('Login clicked.');
	}
}

