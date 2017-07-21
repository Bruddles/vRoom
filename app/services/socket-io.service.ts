import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as io from "socket.io-client";
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
        this.socket.on('updatedVideoQueue', function socketUpdatedVideoQueue(videoData: Object) {
            let video: Video = Video.init(videoData);
            _this.videoQueue.push(video);
            if (_this.videoQueue.length === 1){
                _this.youtubeService.playNextVideo(_this.videoQueue[0]);
            }
        });

        //upon joining a room we will get the current video queue
        //also triggered by thje end of the current video
        this.socket.on('fullVideoQueue', function socketFullVideoQueue(videoDataQueue: Object[]) {
            _this.videoQueue = videoDataQueue.map(d => {return Video.init(d);});
            if (_this.videoQueue.length > 0){
                //play the current video, if it exists
                _this.youtubeService.playNextVideo(_this.videoQueue[0]);
            }
        });

        this.socket.on('playCurrentVideo', function socketPlayCurrentVideo(videoData: Object){
            let video: Video = Video.init(videoData);

            if (_this.videoQueue[0].equals(video)){
                _this.videoQueue[0] = video;
                youtubeService.playVideo(_this.videoQueue[0]);
            }
        });

        this.socket.on('pauseCurrentVideo', function socketPauseCurrentVideo(videoData: Object){
            let video: Video = Video.init(videoData);

            if (_this.videoQueue[0].equals(video)){
                _this.videoQueue[0] = video;
                youtubeService.pauseVideo(_this.videoQueue[0]);
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

    public addVideo(videoId: string, title: string, thumb: string) {
        //this.videoQueue.push(videoId);
        this.socket.emit('addVideo', videoId, title, thumb);
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
            let newState = event.data;
            switch (newState){
                case YT.PlayerState.UNSTARTED:
                    console.log('Player State Change: Video Unstarted');
                    break;
                case YT.PlayerState.ENDED:
                    console.log('Player State Change: Video Ended');
                    _this.socket.emit('currentVideoEnded', _this.videoQueue[0].getData());
                    break;
                case YT.PlayerState.PLAYING:
                    console.log('Player State Change: Video Playing');
                    if (newState !== _this.videoQueue[0].state){
                        _this.socket.emit('currentVideoPlaying', _this.videoQueue[0].getData());
                    }
                    break;
                case YT.PlayerState.PAUSED:
                    console.log('Player State Change: Video Paused');
                    if (newState !== _this.videoQueue[0].state){
                        _this.socket.emit('currentVideoPaused', _this.videoQueue[0].getData());
                    }
                    break;
                case YT.PlayerState.BUFFERING:
                    console.log('Player State Change: Video Buffering');
                    break;
                case YT.PlayerState.CUED:
                    console.log('Player State Change: Video Cued');
                    break;
                default:
                    console.log('Unrecognised event.');
                    break;
            }
        }
    }
}