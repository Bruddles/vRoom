import { Component, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SocketIoService } from './../../services/socket-io.service';
import { YoutubeDataApi } from './../../services/youtube-data-api.service';

import { SearchResult } from './../../../objects/search-result'


@Component({
    moduleId: module.id,
    selector: 'vroom',
    templateUrl: 'room.component.html',
    styleUrls: ['room.component.css']
})

export class RoomComponent {
    public url: string;
    public searchString: string
    public searchResults: SearchResult[]

    constructor(private socketIoService: SocketIoService, 
        private youtubeDataApi : YoutubeDataApi) { 
        this.socketIoService.addYTAPI();
        this.socketIoService.createPlayer('player');
        this.youtubeDataApi.addGAPI();
        //this.youtubeDataApi.initialiseGAPI();

    }

    sendVideo() {
        this.socketIoService.addVideo(this.url);
        this.url = '';
    }

    searchVideo(){
        this.searchResults = this.youtubeDataApi.search(this.searchString);
    }
}

