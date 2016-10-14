import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as io from "socket.io-client";
// import * as YouTubePlayer from 'youtube-player';
import { YoutubeService } from './youtube.service';

@Injectable()
export class SocketIoService {
    public socket = io();
    public userName: string;
    public roomName: string;
    public videoQueue: string[];
    public videoHistory: string[];
    public player;

    constructor(private youtubeService: YoutubeService) {
        let _this = this;

        this.userName = '';
        this.roomName = '';
        this.videoQueue = [];
        this.videoHistory = [];

        //Set handlers for server broadcasts
        //if anyone else in the room adds a video 
        //add it to our video queue
        this.socket.on('updatedVideoQueue', function (videoUrl: string) {
            _this.videoQueue.push(videoUrl);
        });

        //upon joining a room we will get the current video queue
        this.socket.on('fullVideoQueue', function (videoQueue: string[]) {
            _this.videoQueue = videoQueue;
            this.player.loadVideoById(videoQueue[0], 0, 'High');
            this.player.playVideo();
        });
    }

    public login(name: string) {
        this.userName = name;
        this.socket.emit('login', name);
    }

    public join(name: string) {
        this.roomName = name;
        this.socket.emit('join', name);
    }

    public addVideo(videoId: string) {
        this.videoQueue.push(videoId);
        this.socket.emit('addVideo', videoId);
    }

    //Youtube service method wrappers
    public addYTAPI(){
        this.youtubeService.addYTAPI();
    }

    public createPlayer(playerElementId) {
         this.player = this.youtubeService.createPlayer(playerElementId, 300, 600);
    }

}