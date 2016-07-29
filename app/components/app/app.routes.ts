import { provideRouter, RouterConfig }  from '@angular/router';
import { LoginComponent } from './../login/login.component';
import { RoomLoginComponent } from './../room-login/room-login.component';
import { RoomComponent } from './../room/room.component';

const routes: RouterConfig = [{
		path: '',
		component: LoginComponent
	}, {
		path: 'room-login',
		component: RoomLoginComponent
	}, {
		path: 'room',
		component: RoomComponent
	}
];

export const appRouterProviders = [
	provideRouter(routes)
];