import {Room} from './room';

export class User{
    public name: string
    public socketID: string
    public room: Room
    
    constructor(name: string, socketID: string ){
        this.name = name;
        this.socketID = socketID;
    }
}