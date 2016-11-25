import {User} from './user';

export class Room {
    public name: string
    public users: User[]
    public videoQueue: string[]
    public videoHistory: string[]

    constructor(name: string){
        this.name = name;
        this.users = [];
        this.videoQueue = [];
        this.videoHistory = [];
    }
}

