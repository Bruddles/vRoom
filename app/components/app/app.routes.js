"use strict";
var router_1 = require('@angular/router');
var login_component_1 = require('./../login/login.component');
var room_login_component_1 = require('./../room-login/room-login.component');
var room_component_1 = require('./../room/room.component');
var routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: login_component_1.LoginComponent
    }, {
        path: 'room-login',
        component: room_login_component_1.RoomLoginComponent
    }, {
        path: 'room',
        component: room_component_1.RoomComponent
    }
];
exports.appRouterProviders = [
    router_1.provideRouter(routes)
];
//# sourceMappingURL=app.routes.js.map