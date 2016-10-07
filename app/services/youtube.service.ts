import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class YoutubeService {
    youtube: any = {
        ready: false,
        player: null,
        playerId: null,
        videoId: null,
        videoTitle: null,
        playerHeight: '100%',
        playerWidth: '100%'
    }

    constructor() {
        //this.setupPlayer();
    }

    setupPlayer() {
        console.log("Running Setup Player");
        // window['onYouTubeIframeAPIReady'] = () => {
        //     if (window['YT']) {
        //         console.log('Youtube API is ready');
        //         this.youtube.ready = true;
        //         this.bindPlayer('player');
        //         this.loadPlayer();
        //     }
        // };
        if (window['YT'] && window['YT']['Player']) {
            console.log('Youtube API is ready');
            this.youtube.ready = true;
            this.bindPlayer('player');
            this.loadPlayer();
        }
    }

    bindPlayer(elementId): void {
        this.youtube.playerId = elementId;
    }

    loadPlayer(): void {
        if (this.youtube.ready && this.youtube.playerId) {
            if (this.youtube.player) {
                this.youtube.player.destroy();
            }
            this.youtube.player = this.createPlayer();
        }
    }

    createPlayer(): void {
        return new window['YT']['Player'](this.youtube.playerId, {
            height: this.youtube.playerHeight,
            width: this.youtube.playerWidth,
            playerVars: {
                rel: 0,
                showinfo: 0
            }
        });
    }

    launchPlayer(id, title): void {
        this.youtube.player.loadVideoById(id);
        this.youtube.videoId = id;
        this.youtube.videoTitle = title;
        return this.youtube;
    }
}