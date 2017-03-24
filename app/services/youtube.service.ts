import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {Video} from '../../objects/video';
import {VideoState} from '../../objects/video-state';

@Injectable()
export class YoutubeService {
    private yTPlayerInitialised: boolean = false;

    public yTPlayer;

    constructor() { }

    public addYTAPI() {
        const doc = window.document;
        let scriptTag = doc.createElement("script");
        scriptTag.type = "text/javascript";
        scriptTag.src = "http://www.youtube.com/iframe_api";
        doc.body.appendChild(scriptTag);
    }

    public createPlayer(playerElementId, 
        playerHeight,
        playerWidth,
        onReadyFunc,
        onStateChangeFunc): void {
            window['onYouTubeIframeAPIReady'] = () => {
                this.yTPlayer = new window['YT'].Player(
                    playerElementId, 
                    {
                        height: playerHeight,
                        width: playerWidth,
                        playerVars: {
                            rel: 0,
                            showinfo: 0,
                            autoplay: 0//,
                            //controls: 0
                        },
                        events: {
                            'onReady': onReadyFunc,
                            'onStateChange': onStateChangeFunc
                        }
                    }
                );
                this.yTPlayerInitialised = true;
            }
            if (window['YT'] && window['YT'].Player) {
                window['onYouTubeIframeAPIReady']();
            } else {
                console.log('YT player is not defined');
            }
    }

    public playNextVideo(video: Video){
        if (this.yTPlayerInitialised){
            this.yTPlayer.cueVideoById(video.videoId, 0, 'High');
            if (video.state === VideoState.PLAYING || video.state === VideoState.UNSTARTED ){
                this.playVideo(video);
            } else if (video.state === VideoState.PAUSED){
                this.pauseVideo(video);
            }
        }
    }

    public pauseVideo(video: Video){
        //console.log('Pausing video at ' + (video.elaspsedTime/1000) + 's');
        this.yTPlayer.seekTo((video.elaspsedTime/1000), true);
        this.yTPlayer.pauseVideo();
        video.videoStopped();
    }

    public playVideo(video: Video){
        //console.log('Playing video at ' + (video.elaspsedTime/1000) + 's');
        this.yTPlayer.seekTo((video.elaspsedTime/1000), true);
        this.yTPlayer.playVideo();
        video.videoStarted();
    }
}