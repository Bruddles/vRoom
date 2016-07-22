import { Component, Input } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({	
	moduleId: module.id,
	selector: 'login',
	templateUrl: 'login.component.html',
	directives: [ROUTER_DIRECTIVES]
})
export class LoginComponent{
	constructor() { }
}