import { Injectable } from '@angular/core';
 
@Injectable()
export class DataStoreService {
    static readonly USERNAME: string = 'username'
    static readonly ROOMNAME: string = 'roomname'
    
    get username(): string {
        return localStorage.getItem(DataStoreService.USERNAME);
    }
    set username(value: string) {
        localStorage.setItem(DataStoreService.USERNAME, value);
    }

    get roomname(): string {
        return localStorage.getItem(DataStoreService.ROOMNAME);
    }
    set roomname(value: string) {
        localStorage.setItem(DataStoreService.ROOMNAME, value);
    }
}