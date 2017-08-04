import { SearchResult } from './search-result'

export class SearchResults{
    public nextPageToken: string;
    public prevPageToken: string;
    public results: SearchResult[];
    
    constructor(nextPageToken: string, prevPageToken: string, searchResults: SearchResult[]){
        this.nextPageToken = nextPageToken;
        this.prevPageToken = prevPageToken;
        this.results = searchResults;
    }
}