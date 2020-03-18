import {Line, Point} from '@/scripts/line';

/**
 * 贝塞尔曲线每级的线条数组类
 */
class BezierPathLines {
    /**
     * 线条数组
     */
    private readonly _lines: Line[] = [];
    /**
     * 级
     */
    private _level: number = 0;

    /**
     * 构造
     */
    constructor() {
    }

    /**
     * 添加线
     * @param line
     */
    public pushLine(line: Line) {
        this.lines.push(line);
    }

    get lines(): Line[] {
        return this._lines;
    }

    get level(): number {
        return this._level;
    }

    set level(value: number) {
        this._level = value;
    }
}

/**
 * 贝塞尔曲线类
 */
class BezierPath {
    /**
     * 开始点
     */
    private _startPoint: Point = Point.zero();
    /**
     * 结束点
     */
    private _endPoint: Point = Point.zero();
    /**
     * 控制点数组，可以为空数组，空数组时连接开始和结束点的直线
     */
    private readonly _controlPoints: Point[] = [];
    /**
     * 贝塞尔曲线的轨迹点
     */
    private readonly _points: Point[] = [];

    /**
     * 贝塞尔曲线每级的线条
     */
    private readonly _bezierPathLines: BezierPathLines[] = [];
    /**
     * 贝塞尔曲线第一级的线条，点没有发生改变时不需要每次都要重新初始化第一级的线条
     * 往下的每级的线条都按照上一级的线条来重新计算
     */
    private readonly _initialBezierPathLines: BezierPathLines = new BezierPathLines();

    /**
     * 当前绘制百分比
     */
    private _percent: number = 0;
    /**
     * 开始绘制的百分比
     * 例如：0时从头开始绘制；0.5时从50%处开始绘制；
     */
    private _startPercent: number = 0;
    /**
     * 结束绘制的百分比
     * 例如：0.5时绘制到50%处；1时绘制到结尾；
     */
    private _endPercent: number = 1;

    /**
     * 构造
     */
    constructor() {
    }

    /**
     * 初始化第一级的线条
     * @param forceUpdate 是否强刷
     */
    public setupInitialBezierPathLines(forceUpdate: boolean) {
        // 如果强刷，则清空第一级的线条
        if (forceUpdate) {
            this.clearInitialBezierPathLines();
        }
        // 如果第一级有线条的话不重新创建
        if (!this.initialBezierPathLines.lines.length) {
            const points = [this.startPoint, ...this.controlPoints, this.endPoint];
            for (let i = 0; i < points.length - 1; i++) {
                this.initialBezierPathLines.pushLine(new Line(points[i], points[i + 1]));
            }
        }
    }

    /**
     * 按照指定percent创建贝塞尔曲线的轨迹点
     * @param percent 百分比
     */
    public setupBezierPathLines(percent: number) {
        if (0 <= percent && percent <= 1) {
            this._percent = percent;
            this.setupInitialBezierPathLines(false);
            this.bezierPathLines.splice(0, this.bezierPathLines.length);
            this.bezierPathLines.push(this.initialBezierPathLines);
            this.setupBezierPathLinesRecursive();
            this.points.push(this.pointInPathForCurrentPercent || Point.zero());
        } else {
            console.log(`setupBezierPathLines: percent 范围: [0, 1]`);
        }
    }

    /**
     * 重置
     */
    public reset() {
        this._percent = 0;
        this.clearInitialBezierPathLines();
        this.bezierPathLines.splice(0, this.bezierPathLines.length);;
    }

    /**
     * 清空第一级的线条
     */
    public clearInitialBezierPathLines() {
        this.initialBezierPathLines.lines.splice(0, this.initialBezierPathLines.lines.length);
    }

    /**
     * 清空当前贝塞尔曲线的轨迹点
     */
    public clearPoints() {
        this.points.splice(0, this.points.length);
    }

    /**
     * 递归创建除了第一级往下的线条
     * 往下每级的线条依赖上一级的线条
     */
    private setupBezierPathLinesRecursive() {
        const currentLastBezierPathLines = this.bezierPathLines[this.bezierPathLines.length - 1];
        /**
         * 跳出递归的条件是最后一级的线条数量为1
         */
        if (currentLastBezierPathLines.lines.length > 1) {
            const bezierPathLines = new BezierPathLines();
            bezierPathLines.level = currentLastBezierPathLines.level + 1;
            this.bezierPathLines.push(bezierPathLines);
            for (let i = 0; i < currentLastBezierPathLines.lines.length - 1; i++) {
                const startPoint = currentLastBezierPathLines.lines[i].linePointWithLengthPercentFromStart(this.percent);
                const endPoint = currentLastBezierPathLines.lines[i + 1].linePointWithLengthPercentFromStart(this.percent);
                const line = new Line(startPoint, endPoint);
                bezierPathLines.lines.push(line);
            }
            this.setupBezierPathLinesRecursive();
        }
    }

    /**
     * 从最后一级的线条上按照当前百分比获得的点坐标就是贝塞尔曲线上当前百分比对应的点的坐标
     */
    get pointInPathForCurrentPercent(): Point | null {
        const currentLastBezierPathLines = this.bezierPathLines[this.bezierPathLines.length - 1];
        return currentLastBezierPathLines.lines[0].linePointWithLengthPercentFromStart(this.percent);
    }

    /**
     * 开始点和结束点中间的距离
     */
    get distanceBetweenStartPointAndEndPoint() {
        return Point.distance(this.startPoint, this.endPoint);
    }

    get startPoint(): Point {
        return this._startPoint;
    }

    set startPoint(value: Point) {
        this._startPoint = value;
    }

    get endPoint(): Point {
        return this._endPoint;
    }

    set endPoint(value: Point) {
        this._endPoint = value;
    }

    get controlPoints(): Point[] {
        return this._controlPoints;
    }

    get points(): Point[] {
        return this._points;
    }

    get bezierPathLines(): BezierPathLines[] {
        return this._bezierPathLines;
    }

    get initialBezierPathLines(): BezierPathLines {
        return this._initialBezierPathLines;
    }

    get percent(): number {
        return this._percent;
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
}

export {
    BezierPath
};
