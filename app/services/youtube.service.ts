import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {Video} from '../../objects/video';

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
                            showinfo: 0
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
            this.yTPlayer.loadVideoById(video.videoId, 0, 'High');
            this.yTPlayer.seekTo((video.elaspsedTime/1000), true)
            this.yTPlayer.playVideo();
        }
    }

    public getCurrentVideoId(): string{
        if (this.yTPlayerInitialised){
            return this.yTPlayer.getVideoData()['video_id'];
        } else {
            return '';
        }
    }
}