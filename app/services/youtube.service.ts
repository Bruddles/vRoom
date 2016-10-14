import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { window } from '@angular/platform-browser/src/facade/browser';

@Injectable()
export class YoutubeService {
    public yTPlayer;

    constructor() {
        //this.setupPlayer();
    }

    public addYTAPI() {
        const doc = window.document;
        let scriptTag = doc.createElement("script");
        scriptTag.type = "text/javascript";
        scriptTag.src = "http://www.youtube.com/iframe_api";
        doc.body.appendChild(scriptTag);
    }

    public createPlayer(playerElementId, playerHeight, playerWidth): void {
        if (window['YT'] && window['YT']['Player']) {
            this.yTPlayer = new window['YT']['Player'](
                playerElementId, 
                {
                    height: playerHeight,
                    width: playerWidth,
                    playerVars: {
                        rel: 0,
                        showinfo: 0
                    }
                }
            );
        } else {
            console.log('YT player is not defined');
        }
    }
}