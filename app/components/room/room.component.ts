import { Component, Input, NgZone} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { SocketIoService } from './../../services/socket-io.service';
import { YoutubeDataApi } from './../../services/youtube-data-api.service';
import { DataStoreService } from './../../services/data-store.service';

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
		private dataStoreService: DataStoreService,
        private zone : NgZone) { 

        if (!!this.dataStoreService.username  && !(!!this.socketIoService.userName)){
			this.socketIoService.login(this.dataStoreService.username);
        }
        if (!!this.dataStoreService.roomname  && !(!!this.socketIoService.roomName)){
			this.socketIoService.join(this.dataStoreService.roomname);
        }    
        this.socketIoService.addYTAPI();
        this.socketIoService.createPlayer('player');
        this.youtubeDataApi.addGAPI();
        this.selectedResults = [];
    }

    sendVideo() {
        this.socketIoService.addVideo(this.url, null, null);
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

    selectVideo(event: Event, result: SearchResult){
        if (result.selected) {
            this.selectedResults.splice(this.selectedResults.indexOf(result), 1);
        } else {
            this.selectedResults.push(result);
        }
        //flip the selected boolean
        result.selected = !result.selected;
    }

    sendSelectedVideos() {
        this.selectedResults.map((curr, ind, arr) => {
            this.socketIoService.addVideo(curr.videoId, curr.videoTitle, curr.videoThumbnail);
        })
    }
}

