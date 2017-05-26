import { Component, Input, NgZone} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SocketIoService } from './../../services/socket-io.service';
import { YoutubeDataApi } from './../../services/youtube-data-api.service';

import { SearchResult } from './../../../objects/search-result'
import { Video } from './../../../objects/video'


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
    public selectedResults: SearchResult[]

    constructor(private socketIoService: SocketIoService, 
        private youtubeDataApi : YoutubeDataApi,
        private zone : NgZone) { 
        this.socketIoService.addYTAPI();
        this.socketIoService.createPlayer('player');
        this.youtubeDataApi.addGAPI();
    }

    sendVideo() {
        this.socketIoService.addVideo(this.url);
        this.url = '';
    }

    searchVideo2(){
        let me = this;
        //TODO: According to some reading, the gapi is being run outside of the angular zone, 
        //and so it is waiting for the next digest cycle before updating the view, even through the model is updated instantly
        this.searchResults = me.youtubeDataApi.search2(this.searchString);
    }

    searchVideo(){
        this.youtubeDataApi.search(this.searchString).then(results => {
            this.searchResults = results;
        });
    }

    selectVideo(selected: SearchResult){
        let index = this.selectedResults.indexOf(selected);
        if (index !== -1) {
            this.selectedResults.push(selected);
        } else {
            this.selectedResults.splice(index, 1);
        }
    }
}

