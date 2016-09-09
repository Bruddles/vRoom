import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent }  from '../../components/app/app.component';
import { LoginComponent }  from '../../components/login/login.component';
import { RoomComponent }  from '../../components/room/room.component';
import { RoomLoginComponent }  from '../../components/room-login/room-login.component';

import { SocketIoService }  from '../../services/socket-io.service';

import { routing } from '../../components/app/app.routing';


@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		routing],
	declarations: [
		AppComponent,
		LoginComponent, 
		RoomComponent, 
		RoomLoginComponent],
	providers: [SocketIoService],
	bootstrap: [AppComponent]
})
export class AppModule { }