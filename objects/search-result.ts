export class SearchResult{
    public videoId: string
    public videoTitle: string
    public videoThumbnail: string
    
    constructor(videoId: string, videoTitle: string, videoThumbnail: string){
        this.videoId = videoId;
        this.videoTitle = videoTitle;
        this.videoThumbnail = videoThumbnail;
    }
}