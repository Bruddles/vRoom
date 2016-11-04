import {User} from './user';

export class Room {
    public users: User[]
    public videoQueue: string[]
    public videoHistory: string[]

    constructor(){
        this.users = [];
        this.videoQueue = [];
        this.videoHistory = [];
    }
}

