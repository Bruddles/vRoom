import { Component, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SocketIoService } from './../../services/socket-io.service';


@Component({
    moduleId: module.id,
    selector: 'vroom',
    templateUrl: 'room.component.html',
    styleUrls: ['room.component.css']
})

export class RoomComponent {
    public url: string;

    constructor(private socketIoService: SocketIoService) { 
        this.socketIoService.addYTAPI();
        this.socketIoService.createPlayer('player');
    }

    sendVideo() {
        this.socketIoService.addVideo(this.url);
        this.url = '';
    }
}

