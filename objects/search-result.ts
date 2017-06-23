export class SearchResult{
    public videoId: string
    public videoTitle: string
    public videoThumbnail: string
    public selected: boolean
    
    constructor(videoId: string, videoTitle: string, videoThumbnail: string){
        this.videoId = videoId;
        this.videoTitle = videoTitle;
        this.videoThumbnail = videoThumbnail;
        this.selected = false;
    }
}