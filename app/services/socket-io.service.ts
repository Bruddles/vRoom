import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as io from "socket.io-client";
// import * as YouTubePlayer from 'youtube-player';
import { YoutubeService } from './youtube.service';
import {Video} from '../../objects/video';
import {Room} from '../../objects/room';
import {VideoState} from '../../objects/video-state'; 

@Injectable()
export class SocketIoService {
    public socket = io();
    public userName: string;
    public roomName: string;
    public videoQueue: Video[];
    public videoHistory: Video[];
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
        this.socket.on('updatedVideoQueue', function (video: Video) {
            if (_this.videoQueue.length === 0){
                _this.youtubeService.playNextVideo(video);
            }
            _this.videoQueue.push(video);
        });

        //upon joining a room we will get the current video queue
        //also triggered by thje end of the current video
        this.socket.on('fullVideoQueue', function (videoQueue: Video[]) {
            _this.videoQueue = videoQueue;
            if (videoQueue.length > 0){
                //play the current video, if it exists
                _this.youtubeService.playNextVideo(videoQueue[0]);
            }
        });

        this.socket.on('playCurrentVideo', function (){
            _this.videoQueue[0].videoStarted();
            _this.videoQueue[0].state = VideoState.PLAYING;
        });

        this.socket.on('pauseCurrentVideo', function (){
            _this.videoQueue[0].videoStopped();
            _this.videoQueue[0].state = VideoState.PAUSED;
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
                    _this.videoQueue[0]);
            } else if (event.data == YT.PlayerState.PLAYING) {
                _this.socket.emit('currentVideoPlaying', 
                    _this.videoQueue[0])
            } else if (event.data == YT.PlayerState.PAUSED) {
                //send paused event
                _this.socket.emit('currentVideoPaused', 
                    _this.videoQueue[0]);

            } else if (event.data == YT.PlayerState.BUFFERING) {

            } else if (event.data == YT.PlayerState.CUED){

            } else {
                console.log('Unrecognised event.');
            }
        }
        
    }
}