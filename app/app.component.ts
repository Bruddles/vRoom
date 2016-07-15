import {Component} from '@angular/core';

@Component({
	selector: 'vroom',
	template: `
		<div id='container'>
			<div id='video-player-container'>
				<div id="player">Please join a room...</div>
			</div>
			<div id='queue-container'>
				<div id='video-queue'>
					<ul>
						<li>There are no items in the queue</li>
					</ul>
				</div>
				<div id='queue-form'>
					<input id='url-input' autocomplete='off' />
					<button id='url-send'>Send</button>
				</div>
			</div>
		</div>
	`
	//selector: 'vroom',
//template: '<h1>My First Angular 2 App</h1>'
})

export class AppComponent {}