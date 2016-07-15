import { Component, Input } from '@angular/core';

@Component({
	selector: 'login',
	template: `
		<div id='login-container'>
			<div>
				<label>Username</label>
				<input id='username-input'/>
				<button id='username-send'>Login</button>
			</div>
		</div>
	`
})
export class LoginComponent{
	constructor() { }
}