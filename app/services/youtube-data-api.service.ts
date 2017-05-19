import { Injectable } from "@angular/core";

import { SearchResult } from './../../objects/search-result'

@Injectable()
export class YoutubeDataApi {
    private _apiKey: string = 'AIzaSyBr8cF-enotAQTjopu_e1eDCx8ihwrjrE8';

    private gapi;
    private gapiInitialised: boolean = false;
    
    constructor () {    }

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
            _this.gapi = window['gapi'];
            _this.gapi.load('client', () => {
                _this.gapi.client.setApiKey(_this._apiKey);
                _this.gapi.client.load('youtube', 'v3', () => {
                    _this.gapiInitialised = true;
                    console.log('GAPI Loaded');
                });
            });
        }
    }

    public search(query: string): SearchResult[] {
        if (!this.gapiInitialised){
            console.log('GAPI is not initialised');
            return [];
        } else {
            let request = this.gapi.client.youtube.search.list({
                    q: query,
                    part: 'snippet',
                    type: 'video'
                }),
                results : SearchResult[] = [], 
                str;

            request.execute(function(response) {
                response['items'].forEach(element => {
                    let id: string = element['id']['videoId'],
                        title: string = element['snippet']['title'],
                        thumb: string = element['snippet']['thumbnails']['default']['url'];
                    results.push(new SearchResult(id, title, thumb))
                });
            });

            console.log(results);
            return results;
        }
        
    }
}