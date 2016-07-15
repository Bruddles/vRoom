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
var RoomLoginComponent = (function () {
    function RoomLoginComponent() {
    }
    RoomLoginComponent = __decorate([
        core_1.Component({
            selector: 'room-login',
            template: "\n\t\t<div id='room-container'>\n\t\t\t<div>\n\t\t\t\t<label>Room</label>\n\t\t\t\t<input id='room-input'/>\n\t\t\t\t<button id='room-join-send'>Join</button>\n\t\t\t\t<button id='room-create-send'>Create</button>\n\t\t\t</div>\n\t\t</div>\n\t"
        }), 
        __metadata('design:paramtypes', [])
    ], RoomLoginComponent);
    return RoomLoginComponent;
}());
exports.RoomLoginComponent = RoomLoginComponent;
//# sourceMappingURL=room-login.component.js.map