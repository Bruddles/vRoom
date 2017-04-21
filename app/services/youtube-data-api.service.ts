import { Injectable } from "@angular/core";

@Injectable()
export class YoutubeDataApi {
    private _apiKey: string = 'AIzaSyBr8cF-enotAQTjopu_e1eDCx8ihwrjrE8';

    private gapi;
    private gapiInitialised: boolean = false;
    
    constructor () {    }

    public addGAPI(){
        const doc = window.document;
        let scriptTag = doc.createElement("script");
        scriptTag.type = "text/javascript";
        scriptTag.src = "https://apis.google.com/js/api.js";
        doc.body.appendChild(scriptTag);
    }

    public initialiseGAPI(){
        if (window['gapi']){
            this.gapi = window['gapi'];
            this.gapi.client.init({
                'apiKey': this._apiKey
            });
            this.gapiInitialised = true;
        }
    }

    public search(query: string): string{
        var request = this.gapi.client.youtube.search.list({
                q: query,
                part: 'snippet'
            }), 
            str;

        request.execute(function(response) {
            str = JSON.stringify(response.result);
        });

        console.log(str);
        return str;
    }
}