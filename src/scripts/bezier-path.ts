import {Line, Point} from '@/scripts/line';

class BezierPathLines {
    private readonly _lines: Line[] = [];
    private _level: number = 0;

    constructor() {
    }

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

class BezierPath {
    private _startPoint: Point = Point.zero();
    private _endPoint: Point = Point.zero();
    private readonly _controlPoints: Point[] = [];
    private readonly _points: Point[] = [];

    private readonly _bezierPathLines: BezierPathLines[] = [];
    private readonly _initialBezierPathLines: BezierPathLines = new BezierPathLines();

    private _percent: number = 0;
    private _startPercent: number = 0;
    private _endPercent: number = 1;

    constructor() {
    }

    public setupInitialBezierPathLines() {
        if (!this.initialBezierPathLines.lines.length) {
            const points = [this.startPoint, ...this.controlPoints, this.endPoint];
            for (let i = 0; i < points.length - 1; i++) {
                this.initialBezierPathLines.pushLine(new Line(points[i], points[i + 1]));
            }
        }
    }

    public setupBezierPathLines(percent: number) {
        if (0 <= percent && percent <= 1) {
            this._percent = percent;
            this.setupInitialBezierPathLines();
            this.bezierPathLines.splice(0, this.bezierPathLines.length);
            this.bezierPathLines.push(this.initialBezierPathLines);
            this.setupBezierPathLinesRecursive();
            this.points.push(this.pointInPathForCurrentPercent || Point.zero());
        } else {
            console.log(`setupBezierPathLines: percent 范围: [0, 1]`);
        }
    }

    public clearPoints() {
        this.points.splice(0, this.points.length);
    }

    private setupBezierPathLinesRecursive() {
        const currentLastBezierPathLines = this.bezierPathLines[this.bezierPathLines.length - 1];
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

    get pointInPathForCurrentPercent(): Point | null {
        const currentLastBezierPathLines = this.bezierPathLines[this.bezierPathLines.length - 1];
        return currentLastBezierPathLines.lines[0].linePointWithLengthPercentFromStart(this.percent);
    }

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
