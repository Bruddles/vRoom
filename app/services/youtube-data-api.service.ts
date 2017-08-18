import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { SearchResult } from './../../objects/search-result'
import { SearchResults } from './../../objects/search-results'

@Injectable()
export class YoutubeDataApi {
    private _apiKey: string = 'AIzaSyBr8cF-enotAQTjopu_e1eDCx8ihwrjrE8';

    private gapi;
    private gapiInitialised: boolean = false;
    
    constructor (
        private http: Http
        ) {    }

    public addGAPI(){
        const doc = window.document;
        let scriptTag = doc.createElement("script");
        doc.body.appendChild(scriptTag);
        scriptTag.type = "text/javascript";
        scriptTag.onload = () => {this.initialiseGAPI(this);}
        scriptTag.src = "https://apis.google.com/js/client.js";
    }

    public initialiseGAPI(_this){
        if (window['gapi'] && !_this.gapiInitialised){
            //TODO: Since we are using gapi from the window, it s not part of angulars 'zone' and so when executed, takes everyhting outside of the zone
            // this means the search results arent updated instanly, it has to wait until they are nexted checked.
            _this.gapi = JSON.parse(JSON.stringify(window['gapi']));
            _this.gapi.load('client', () => {
                _this.gapi.client.setApiKey(_this._apiKey);
                _this.gapi.client.load('youtube', 'v3', () => {
                    _this.gapiInitialised = true;
                    console.log('GAPI Loaded');
                });
            });
        }
    }

    public search(query: string, pageToken: string): Promise<SearchResults> {
        return this.http.get(
                'https://www.googleapis.com/youtube/v3/search?key=' 
                + this._apiKey 
                + '&part=snippet&q=' + query 
                + '&type=video' 
                + (!!pageToken ? '&pageToken=' + pageToken : ''))
            .toPromise()
            .then(response => {
                let json: JSON = response.json(),
                    resultsArr : SearchResult[] = [],
                    results: SearchResults;
                    

                json['items'].forEach(element => {
                    let id: string = element['id']['videoId'],
                        title: string = element['snippet']['title'],
                        thumb: string = element['snippet']['thumbnails']['default']['url'];
                    resultsArr.push(new SearchResult(id, title, thumb))
                });

                results = new SearchResults(json['nextPageToken'], json['prevPageToken'], resultsArr);
                return results;
            });
    }
}