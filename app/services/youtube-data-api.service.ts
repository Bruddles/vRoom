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
        scriptTag.onload = this.initialiseGAPI;
        scriptTag.src = "https://apis.google.com/js/api.js";
    }

    public initialiseGAPI(){
        if (window['gapi'] && !this.gapiInitialised){
            this.gapi = window['gapi'];
            this.gapi.load('youtube', 'v3', () => {
                this.gapi.client.init({
                    'apiKey': this._apiKey,
                    'discoveryDocs': ['https://people.googleapis.com/$discovery/rest'],
                }).then(() => {
                    this.gapiInitialised = true;
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
             var request = this.gapi.client.youtube.search.list({
                    q: query,
                    part: 'snippet'
                }),
                results : SearchResult[], 
                str;

            request.execute(function(response) {
                str = JSON.stringify(response.result);
                response['items'].forEach(element => {
                    results.push(new SearchResult(element['id']['videoId']))
                });
            });

            console.log(str);
            return results;
        }
        
    }
}