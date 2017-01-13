import {User} from './user';
import {Video} from './video';

export class Room {
    public name: string
    public users: User[]
    public videoQueue: Video[]
    public videoHistory: Video[]

    constructor(name: string){
        this.name = name;
        this.users = [];
        this.videoQueue = [];
        this.videoHistory = [];
    }
}

