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
    public YoutubeService: YoutubeService;

    constructor(private youtubeService: YoutubeService) {
        let _this = this;

        this.userName = '';
        this.roomName = '';
        this.videoQueue = [];
        this.videoHistory = [];
        this.youtubeService = youtubeService;

        //Set handlers for server broadcasts
        //if anyone else in the room adds a video 
        //add it to our video queue
        this.socket.on('updatedVideoQueue', function (videoId: string) {
            if (_this.videoQueue.length === 0){
                _this.youtubeService.playNextVideo(videoId);
            }
            _this.videoQueue.push(videoId);
        });

        //upon joining a room we will get the current video queue
        //also triggered by thje end of the current video
        this.socket.on('fullVideoQueue', function (videoQueue: string[]) {
            _this.videoQueue = videoQueue;
            if (videoQueue.length > 0){
                //play the current video, if it exists
                _this.youtubeService.playNextVideo(videoQueue[0]);
            }
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
        //this.videoQueue.push(videoId);
        this.socket.emit('addVideo', videoId);
    }

    //Youtube service method wrappers
    public addYTAPI(){
        this.youtubeService.addYTAPI();
    }

    public createPlayer(playerElementId) {
        //create player
        this.youtubeService.createPlayer(
            playerElementId, 
            300, 
            600,
            this.onPlayerReadyFunction(),
            this.onPlayerStateChangeFunction());
    }

    public onPlayerReadyFunction() {
        let _this = this;

        return function onPlayerReady() {
            if (_this.videoQueue.length > 0){
                _this.youtubeService.playNextVideo(_this.videoQueue[0]);
            }
        };
    }

    public onPlayerStateChangeFunction() {
        let _this = this;

        return function onPlayerStateChange(event) {
            if (event.data == YT.PlayerState.ENDED){
                //tell server video ENDED
                _this.socket.emit('currentVideoEnded', 
                    _this.youtubeService.getCurrentVideo());
            } else if (event.data == YT.PlayerState.PLAYING) {

            } else if (event.data == YT.PlayerState.PAUSED) {
                //send paused event

            } else if (event.data == YT.PlayerState.BUFFERING) {

            } else if (event.data == YT.PlayerState.CUED){

            } else {
                console.log('Unrecognised event.');
            }
        }
        
    }
}