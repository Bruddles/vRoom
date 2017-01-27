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

    public start() {
        this._startedAt = this._startedAt ? this._startedAt : this.now();
    }

    public stop() {
        this.calculateElapsed();
        this._startedAt = 0;
    }
}