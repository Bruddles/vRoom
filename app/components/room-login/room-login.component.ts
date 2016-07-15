import { Component, Input } from '@angular/core';

@Component({
	selector: 'room-login',
	template: `
		<div id='room-container'>
			<div>
				<label>Room</label>
				<input id='room-input'/>
				<button id='room-join-send'>Join</button>
				<button id='room-create-send'>Create</button>
			</div>
		</div>
	`
})
export class RoomLoginComponent{
	constructor() { }
}