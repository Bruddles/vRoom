import { bootstrap }    from '@angular/platform-browser-dynamic';

import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/login/login.component';
import { RoomLoginComponent } from './components/room-login/room-login.component';
import { RoomComponent } from './components/room/room.component';

import { SocketIoService } from './services/socket-io.service';

import { appRouterProviders } from './components/app/app.routes';

bootstrap(AppComponent, [appRouterProviders, SocketIoService]).catch(err => console.error(err));
//bootstrap(AppComponent, [appRouterProviders]).catch(err => console.error(err));