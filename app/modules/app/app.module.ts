import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from '../../components/app/app.component';
import { LoginComponent } from '../../components/login/login.component';
import { RoomComponent } from '../../components/room/room.component';
import { RoomLoginComponent } from '../../components/room-login/room-login.component';

import { SocketIoService } from '../../services/socket-io.service';
import { YoutubeService } from '../../services/youtube.service';
import { YoutubeDataApi } from '../../services/youtube-data-api.service';
import { DataStoreService } from '../../services/data-store.service';

import { routing } from '../../components/app/app.routing';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        HttpModule],
    declarations: [
        AppComponent,
        LoginComponent,
        RoomComponent,
        RoomLoginComponent],
    providers: [
        SocketIoService,
        YoutubeService,
        YoutubeDataApi,
        DataStoreService],
    bootstrap: [AppComponent]
})
export class AppModule { }