export class Video {
    public id: number
    public videoId: string
    public timeStarted: number
    public playTime: number
    public state: YT.PlayerState

    constructor(id: number, videoId: string){
        this.id = id
        this.videoId = videoId;
        this.timeStarted = null;
        this.playTime = null;
        this.state = YT.PlayerState.UNSTARTED;
    }

    public setStartTime(){
        this.timeStarted = Date.now();
    }

    public setPlayTime(seconds: number){
        this.playTime = seconds;
    }
}

