"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'vroom',
            template: "\n\t\t<div id='container'>\n\t\t\t<div id='video-player-container'>\n\t\t\t\t<div id=\"player\">Please join a room...</div>\n\t\t\t</div>\n\t\t\t<div id='queue-container'>\n\t\t\t\t<div id='video-queue'>\n\t\t\t\t\t<ul>\n\t\t\t\t\t\t<li>There are no items in the queue</li>\n\t\t\t\t\t</ul>\n\t\t\t\t</div>\n\t\t\t\t<div id='queue-form'>\n\t\t\t\t\t<input id='url-input' autocomplete='off' />\n\t\t\t\t\t<button id='url-send'>Send</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t"
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map