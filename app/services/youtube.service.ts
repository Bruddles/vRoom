import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

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
        if (window['YT'] && window['YT']['Player']) {
            this.yTPlayer = new window['YT']['Player'](
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
        } else {
            console.log('YT player is not defined');
        }
    }

    public playNextVideo(videoId){
        if (this.yTPlayerInitialised){
            this.yTPlayer.loadVideoById(videoId, 0, 'High');
            this.yTPlayer.playVideo();
        }
    }

    public getCurrentVideo(): string{
        if (this.yTPlayerInitialised){
            return this.yTPlayer.getVideoData()['video_id'];
        } else {
            return '';
        }
    }
}