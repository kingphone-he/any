import {
    Point
} from './point';

/**
 * 线条类
 */
class Line {

    public static className(): string {
        return 'Line';
    }

    /**
     * 判断是否是有效的线条
     * 判断依据：开始点和结束点都是有效的点
     * @param line 要判断的线条
     */
    public static isLine(line: Line): boolean {
        return Point.isPoint(line.start) && Point.isPoint(line.end);
    }

    /**
     * 通过斜率和直线上的点获得一个线条
     * 线条起始点为传进来的point，结束点为该线段上x为 point.x + 100的点的坐标
     * @param k
     * @param point
     */
    public static lineWithKAndPoint(k: number, point: Point): Line | null {
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
    public static getDistanceBetweenPointAndLine(point: Point, lineStartOffsetTop: number, lineEndOffsetTop: number, lineX: number): number {
        if (point.y >= lineStartOffsetTop && point.y <= lineEndOffsetTop) {
            return Math.abs(lineX - point.x);
        } else if (point.y < lineStartOffsetTop) {
            return Math.sqrt(Math.pow(point.x - lineX, 2) + Math.pow(lineStartOffsetTop - point.y, 2));
        } else if (point.y > lineEndOffsetTop) {
            return Math.sqrt(Math.pow(point.x - lineX, 2) + Math.pow(lineEndOffsetTop - point.y, 2));
        }
        return 0;
    }

    /**
     * 获取两线交点
     * @param line1 线条1
     * @param line2 线条2
     */
    public static intersectionForTwoLine(line1: Line, line2: Line): Point | null {
        if (this.isLine(line1)) {
            return line1.intersectionWithLine(line2);
        }
        return null;
    }

    /**
     * 开始点
     */
    private _start: Point = Point.zero();
    /**
     * 结束点
     */
    private _end: Point = Point.zero();

    /**
     * 构造
     * @param start 开始点
     * @param end   结束点
     */
    constructor(start: Point | null, end: Point | null) {
        this._start = start || Point.zero();
        this._end = end || Point.zero();
    }

    /**
     * 在原线条对象的基础上通过传进来的Line对象更新开始点和结束点
     * @param line 传进来的Line对象
     */
    public setupWithLine(line: Line) {
        // @ts-ignore
        if (this.constructor.isLine(line)) {
            this.start.setupWithPoint(line.start);
            this.end.setupWithPoint(line.end);
        } else {
            console.log(`setupWithLine: ${line} 无效的Line对象`);
        }
    }

    /**
     * 线条的长度
     */
    get length(): number {
        return Point.distance(this.start, this.end);
    }

    /**
     * 是否是垂直线
     */
    public isVertical(): boolean {
        return this.start.x === this.end.x;
    }

    /**
     * 斜率
     * 如果是垂直线，则返回Infinity
     */
    get k(): number {
        if (!this.isVertical()) {
            return (this.end.y - this.start.y) / (this.end.x - this.start.x);
        }
        return Infinity;
    }

    /**
     * 直线方程的中常数项
     * 如果是垂直线，则返回NaN
     */
    get b(): number {
        if (!this.isVertical()) {
            return this.start.y - this.k * this.start.x;
        }
        return NaN;
    }

    /**
     * 法线的斜率
     * 如果当前直线是垂直线，则直接返回0
     */
    public verticallyK(): number {
        if (!this.isVertical()) {
            return -1 / this.k;
        }
        return 0;
    }

    /**
     * 法线方程中的常数项
     * 如果当前直线是垂直线，则返回中心点的y坐标
     */
    public verticallyB(): number {
        if (!this.isVertical()) {
            const centerPoint = this.centerPoint;
            return this.centerPoint.y - this.k * this.centerPoint.x;
        }
        return this.centerPoint.y;
    }

    /**
     * 获得当前直线上从起始位置距离为直线长度的percent倍处的点坐标
     * @param percent
     */
    public linePointWithLengthPercentFromStart(percent: number): Point {
        if (!this.isVertical()) {
            const x = (this.end.x - this.start.x) * percent + this.start.x;
            return this.linePointWithX(x);
        }
        const y = (this.end.y - this.start.y) * percent + this.start.y;
        return new Point(this.start.x, y);
    }

    /**
     * 中心点坐标
     */
    get centerPoint(): Point {
        return new Point((this.start.x + this.end.x) / 2, (this.start.y + this.end.y) / 2);
    }

    /**
     * 当前直线方程中，指定x处的y坐标
     * @param x 指定x
     */
    public linePointYWithX(x: number): number | null {
        if (!this.isVertical()) {
            return this.k * x + this.b;
        }
        return null;
    }

    /**
     * 当前直线方程中，指定x处的点坐标
     * 如果是垂直线则直接返回开始点的坐标
     * @param x 指定x
     */
    public linePointWithX(x: number): Point {
        if (!this.isVertical()) {
            return new Point(x, this.linePointYWithX(x) || 0);
        }
        return this.start;
    }

    /**
     * 当前直线方程中，指定y处的x坐标
     * 如果是垂直线则直接返回开始点的x（因为x坐标都相等）
     * @param y 指定y
     */
    public linePointXWithY(y: number): number {
        if (!this.isVertical()) {
            return (y - this.b) / this.k;
        }
        return this.start.x;
    }

    /**
     * 当前直线方程中，指定y处的点坐标
     * @param y 指定y
     */
    public linePointWithY(y: number): Point {
        return new Point(this.linePointXWithY(y), y);
    }

    /**
     * 判断一个点是否在当前直线上
     * @param point
     */
    public isPointOnLine(point: Point): boolean {
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
    public intersectionWithLine(line: Line): Point |null {
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

    /**
     * 沿着法线方向移动value距离
     * @param value 指定移动的距离
     */
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

    /**
     * 拷贝当前线条
     */
    public clone(): Line | null {
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
