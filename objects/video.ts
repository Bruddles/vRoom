import {Stopwatch} from './stopwatch'

export class Video {
    private _stopwatch: Stopwatch

    public id: number
    public videoId: string
    public state: YT.PlayerState

    get elaspsedTime() {
        return this._stopwatch.elapsedTime;
    }

    constructor(id: number, videoId: string){
        this.id = id
        this.videoId = videoId;
        this.state = YT.PlayerState.UNSTARTED;

        this._stopwatch = new Stopwatch();
    }

    public videoStarted() {
        this._stopwatch.start();
    }

    public videoStopped() {
        this._stopwatch.stop();
    }

    public equals(video: Video): boolean{
        return (this.id === video.id && this.videoId === video.videoId);
    }
}

