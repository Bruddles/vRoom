import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './../login/login.component';
import { RoomLoginComponent } from './../room-login/room-login.component';
import { RoomComponent } from './../room/room.component';

const appRoutes: Routes  = [{
		path: '',
		component: LoginComponent
	}, {
		path: 'room-login/:username',
		component: RoomLoginComponent
	}, {
		path: 'room/:username/:roomname',
		component: RoomComponent
	}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);