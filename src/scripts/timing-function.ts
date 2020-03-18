/**
 * 时间函数类
 */
class TimingFunction {
    /**
     * 线性函数
     */
    public static Linear() {
        return (timingFunction: TimingFunction): number => {
            const k = (timingFunction.endPercent - timingFunction.startPercent) / (timingFunction.endTime - timingFunction.startTime);
            return timingFunction.startPercent + k * (timingFunction.time - timingFunction.startTime);
        };
    }

    /**
     * 先快后慢（淡出）
     */
    public static EaseOut() {
        return (timingFunction: TimingFunction): number => {
            return timingFunction.startPercent + Math.pow(timingFunction.time - timingFunction.startTime, 1 / 4);
        };
    }

    /**
     * 先慢后快（淡入）
     */
    public static EaseIn() {
        return (timingFunction: TimingFunction): number => {
            return timingFunction.startPercent + Math.pow(timingFunction.time - timingFunction.startTime, 4);
        };
    }

    /**
     * 时间步长
     */
    private _timeStep: number = 0.01;
    /**
     * 当前时间
     */
    private _time: number = 0;
    /**
     * 开始时间
     */
    private _startTime: number = 0;
    /**
     * 结束时间
     */
    private _endTime: number = 1;

    /**
     * 开始百分比
     */
    private _startPercent: number = 0;
    /**
     * 结束百分比
     */
    private _endPercent: number = 1;

    /**
     * 时间函数的实现
     * 可以定制
     */
    private _timingFunction: any;

    /**
     * 构造
     * 默认时间函数为线性函数
     */
    constructor() {
        this.timingFunction = TimingFunction.Linear();
    }

    /**
     * 时间继续
     */
    public next() {
        this.time += this.timeStep;
    }

    /**
     * 重置时间
     */
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
