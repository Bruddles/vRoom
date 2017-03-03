import {Stopwatch} from './stopwatch'
import {VideoState} from './video-state'

export class Video {
    private _stopwatch: Stopwatch

    public id: number
    public videoId: string
    public state: VideoState

    get elaspsedTime() {
        return this._stopwatch.elapsedTime;
    }

    constructor(id: number, videoId: string){
        this.id = id
        this.videoId = videoId;
        this.state = VideoState.UNSTARTED;

        this._stopwatch = new Stopwatch(0, 0);
    }

    public videoStarted() {
        this.state = VideoState.PLAYING;
        this._stopwatch.start();
    }

    public videoStopped() {
        this.state = VideoState.PAUSED;
        this._stopwatch.stop();
    }
    
    public videoEnded() {
        this.state = VideoState.ENDED;
        this._stopwatch.stop();
    }

    public equals(video: Video): boolean{
        return (this.id === video.id && this.videoId === video.videoId);
    }

    public getData(){
        return {
            id: this.id,
            videoId: this.videoId,
            state: this.state,
            stopwatch: this._stopwatch.getData()
        }
    }

    public static init(data){
        let video: Video = new Video(data.id, data.videoId);
        video.state = data.state;
        video._stopwatch = Stopwatch.init(data.stopwatch);
        return video;
    }
}

