import {
    Point
} from './point';

class Line {

    public static className() {
        return 'Line';
    }

    public static isLine(line: Line) {
        return Point.isPoint(line.start) && Point.isPoint(line.end);
    }

    public static lineWithKAndPoint(k: number, point: Point) {
        if (Point.isPoint(point) && k) {
            const b = point.y - k * point.x;
            const endPoint = new Point(point.x + 100, 0);
            endPoint.y = k * endPoint.x + b;
            return new this(point, endPoint);
        }
        return null;
    }

    /**
     * 获取点到直线的最近距离
     * @param point 点的坐标
     * @param lineStartOffsetTop 线的起点的y坐标
     * @param lineEndOffsetTop   线的重点的y坐标
     * @param lineX 线的x坐标
     * @returns {number}
     */
    public static getDistanceBetweenPointAndLine(point: Point, lineStartOffsetTop: number, lineEndOffsetTop: number, lineX: number) {
        if (point.y >= lineStartOffsetTop && point.y <= lineEndOffsetTop) {
            return Math.abs(lineX - point.x);
        } else if (point.y < lineStartOffsetTop) {
            return Math.sqrt(Math.pow(point.x - lineX, 2) + Math.pow(lineStartOffsetTop - point.y, 2));
        } else if (point.y > lineEndOffsetTop) {
            return Math.sqrt(Math.pow(point.x - lineX, 2) + Math.pow(lineEndOffsetTop - point.y, 2));
        }
    }

    /**
     * 获取两线交点
     * @param line1
     * @param line2
     */
    public static intersectionForTwoLine(line1: Line, line2: Line) {
        if (this.isLine(line1)) {
            return line1.intersectionWithLine(line2);
        }
        return null;
    }

    private _start: Point = Point.zero();
    private _end: Point = Point.zero();

    constructor(start: Point | null, end: Point | null) {
        this._start = start || Point.zero();
        this._end = end || Point.zero();
    }

    public setupWithLine(line: Line) {
        // @ts-ignore
        if (this.constructor.isLine(line)) {
            this.start.setupWithPoint(line.start);
            this.end.setupWithPoint(line.end);
        } else {
            console.log(`setupWithLine: ${line} 无效的Line对象`);
        }
    }

    get length() {
        return Point.distance(this.start, this.end);
    }

    public isVertical() {
        return this.start.x === this.end.x;
    }

    get k() {
        if (!this.isVertical()) {
            return (this.end.y - this.start.y) / (this.end.x - this.start.x);
        }
        return Infinity;
    }

    get b() {
        if (!this.isVertical()) {
            return this.start.y - this.k * this.start.x;
        }
        return NaN;
    }

    public verticallyK() {
        if (!this.isVertical()) {
            return -1 / this.k;
        }
        return 0;
    }

    public verticallyB() {
        if (!this.isVertical()) {
            const centerPoint = this.centerPoint;
            return this.centerPoint.y - this.k * this.centerPoint.x;
        }
        return this.centerPoint.y;
    }

    public linePointWithLengthPercentFromStart(percent: number) {
        if (!this.isVertical()) {
            const x = (this.end.x - this.start.x) * percent + this.start.x;
            return this.linePointWithX(x);
        }
        const y = (this.end.y - this.start.y) * percent + this.start.y;
        return new Point(this.start.x, y);
    }

    get centerPoint() {
        return new Point((this.start.x + this.end.x) / 2, (this.start.y + this.end.y) / 2);
    }

    public linePointYWithX(x: number): number | null {
        if (!this.isVertical()) {
            return this.k * x + this.b;
        }
        return null;
    }

    public linePointWithX(x: number) {
        if (!this.isVertical()) {
            return new Point(x, this.linePointYWithX(x) || 0);
        }
        return null;
    }

    public linePointXWithY(y: number) {
        if (!this.isVertical()) {
            return (y - this.b) / this.k;
        }
        return this.start.x;
    }

    public linePointWithY(y: number) {
        if (!this.isVertical()) {
            return new Point(this.linePointXWithY(y), y);
        }
        return null;
    }

    public isPointOnLine(point: Point) {
        if (!Point.isPoint(point)) {
            return false;
        }
        if (!this.isVertical()) {
            return point.y === (this.k * point.x + this.b);
        }
        return point.x === this.start.x;
    }

    /**
     * 获取跟另一个线的交点
     * @param line
     */
    public intersectionWithLine(line: Line) {
        // @ts-ignore
        if (this.constructor.isLine(line)) {
            if (this.isVertical() && line.isVertical()) {
                return null;
            } else if (this.isVertical()) {
                return line.linePointWithX(this.start.x);
            } else if (line.isVertical()) {
                return this.linePointWithX(line.start.x);
            } else if (this.k === line.k) {
                return null;
            } else {
                let x = (this.b - line.b) / (line.k - this.k);
                return this.linePointWithX(x);
            }
        }
        return null;
    }

    public moveAlongVerticalDirection(value: number) {
        const k = this.k;
        if (k !== Infinity) {
            const moveX = -value * Math.sin(Math.atan(k));
            const moveY = value * Math.cos(Math.atan(k));
            (isNaN(moveX) || isNaN(moveY)) && console.log(k, value, Math.sin(Math.atan(k)), this.start.x, this.end.x, this.start.y, this.end.y);
            this.start.x += moveX;
            this.start.y += moveY;
            this.end.x += moveX;
            this.end.y += moveY;
        } else {
            this.start.y += value;
            this.end.y += value;
        }
    }

    public clone() {
        if (Line.isLine(this)) {
            return new Line(this.start.clone() || Point.zero(), this.end.clone() || Point.zero());
        }
        return null;
    }

    get start(): Point {
        return this._start;
    }

    set start(value: Point) {
        this._start = value;
    }

    get end(): Point {
        return this._end;
    }

    set end(value: Point) {
        this._end = value;
    }
}

export {
    Point,
    Line
};
