import { Injectable } from '@angular/core';
 
@Injectable()
export class DataStoreService {
    static readonly USERNAME: string = 'username'
    static readonly ROOMNAME: string = 'roomname'
    
    get username(): string {
        return sessionStorage.getItem(DataStoreService.USERNAME);
    }
    set username(value: string) {
        sessionStorage.setItem(DataStoreService.USERNAME, value);
    }

    get roomname(): string {
        return sessionStorage.getItem(DataStoreService.ROOMNAME);
    }
    set roomname(value: string) {
        sessionStorage.setItem(DataStoreService.ROOMNAME, value);
    }
}