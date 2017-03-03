export class Stopwatch {
    private _elapsedTime: number = 0
    private _startedAt: number = 0

    get elapsedTime(): number {
        this.calculateElapsed();
        return this._elapsedTime
    }

    private now() {
        return (new Date()).getTime();
    }

    private calculateElapsed(){
        this._elapsedTime = this._startedAt 
            ? (this._elapsedTime + this.now() - this._startedAt) 
            : this._elapsedTime
    }

    constructor(elapsedTime: number, startedAt: number){
        this._elapsedTime = elapsedTime;
        this._startedAt = startedAt;
    }

    public start() {
        this._startedAt = this._startedAt ? this._startedAt : this.now();
    }

    public stop() {
        this.calculateElapsed();
        this._startedAt = 0;
    }

    public getData(){
        return {
            elapsedTime: this.elapsedTime,
            startedAt: this._startedAt
        };
    }

    public static init(data){
        return new Stopwatch(data.elapsedTime, data.startedAt);
    }
}