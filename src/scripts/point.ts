import { Size } from '@/scripts/size';

/**
 * 点类
 */
class Point {

    public static className(): string {
        return 'Point';
    }

    /**
     * (0, 0)点
     */
    public static zero(): Point {
        return new this(0, 0);
    }

    /**
     * 判断是否是有效的点
     * 判断依据：x、y为有效的number类型（非Infinity、null、undefined）
     * @param point
     */
    public static isPoint(point: Point): boolean {
        try {
            return point && point.x !== null && point.x !== undefined && point.x !== Infinity && point.y !== null && point.y !== undefined && point.y !== Infinity;
        } catch (e) {
            console.warn(e);
            return false;
        }
    }

    /**
     * 两个点的x和y的差值
     * @param point1 点1
     * @param point2 点2
     */
    public static pointOffset(point1: Point, point2: Point): Size | null {
        if (this.isPoint(point1) && this.isPoint(point2)) {
            return point1.offsetWithPoint(point2);
        }
        return null;
    }

    /**
     * 两点之间的直线距离
     * @param point1 点1
     * @param point2 点2
     */
    public static distance(point1: Point, point2: Point): number {
        if (this.isPoint(point1) && this.isPoint(point2)) {
            return this.distanceWithXY(point1.x, point1.y, point2.x, point2.y);
        }
        return 0;
    }

    /**
     * 两点之间直线距离计算
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     */
    public static distanceWithXY(x1: number, y1: number, x2: number, y2: number) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    }

    /**
     * x坐标
     */
    private _x: number = 0;
    /**
     * y坐标
     */
    private _y: number = 0;

    /**
     * 构造
     * @param x x坐标
     * @param y y坐标
     */
    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    /**
     * 跟另一个点之间的x和y的差值
     * @param point 另一个点
     */
    public offsetWithPoint(point: Point): Size | null {
        // @ts-ignore
        if (this.constructor.isPoint(point)) {
            return new Size(point.x - this.x, point.y - this.y);
        }
        return null;
    }

    /**
     * 在当前点对象的基础上更新x和y
     * @param point 目标点
     */
    public setupWithPoint(point: Point) {
        // @ts-ignore
        if (this.constructor.isPoint(point)) {
            this._x = point.x;
            this._y = point.y;
        } else {
            console.log(`setupWithPoint: ${point} 无效的Point对象`);
        }
    }

    /**
     * 移动当前点的x和y坐标
     * @param size 移动的距离
     */
    public move(size: Size) {
        if (size && Size.isSize(size)) {
            this._x += size.width;
            this._y += size.height;
        }
    }

    /**
     * 拷贝当前的点
     */
    public clone(): Point | null {
        // @ts-ignore
        if (this.constructor.isPoint(this)) {
            return new Point(this.x, this.y);
        }
        return null;
    }

    get x(): number {
        return this._x;
    }

    set x(value: number) {
        this._x = value;
    }

    get y(): number {
        return this._y;
    }

    set y(value: number) {
        this._y = value;
    }
}

export {
    Point
};
