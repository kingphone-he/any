class TimingFunction {
    public static Linear() {
        return (timingFunction: TimingFunction): number => {
            const k = (timingFunction.endPercent - timingFunction.startPercent) / (timingFunction.endTime - timingFunction.startTime);
            return timingFunction.startPercent + k * (timingFunction.time - timingFunction.startTime);
        };
    }

    private _timeStep: number = 0.01;
    private _time: number = 0.01;
    private _startTime: number = 0;
    private _endTime: number = 1;

    private _startPercent: number = 0;
    private _endPercent: number = 1;

    private _timingFunction: any;

    constructor() {
        this.timingFunction = TimingFunction.Linear();
    }

    public next() {
        this.time += this.timeStep;
    }

    public restore() {
        this.time = 0;
    }

    get timeStep(): number {
        return this._timeStep;
    }

    set timeStep(value: number) {
        this._timeStep = value;
    }

    get time(): number {
        return this._time;
    }

    set time(value: number) {
        this._time = value;
    }

    get startTime(): number {
        return this._startTime;
    }

    set startTime(value: number) {
        this._startTime = value;
    }

    get endTime(): number {
        return this._endTime;
    }

    set endTime(value: number) {
        this._endTime = value;
    }

    get percent(): number {
        return this._timingFunction(this);
    }

    get startPercent(): number {
        return this._startPercent;
    }

    set startPercent(value: number) {
        this._startPercent = value;
    }

    get endPercent(): number {
        return this._endPercent;
    }

    set endPercent(value: number) {
        this._endPercent = value;
    }

    get timingFunction(): (timingFunction: TimingFunction) => number {
        return this._timingFunction;
    }

    set timingFunction(value: (timingFunction: TimingFunction) => number) {
        this._timingFunction = value;
    }
}

export {
    TimingFunction
};
