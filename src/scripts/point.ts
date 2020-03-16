import { Size } from '@/scripts/size';

class Point {

    public static className() {
        return 'Point';
    }

    public static zero(): Point {
        return new this(0, 0);
    }

    public static isPoint(point: Point): boolean {
        try {
            return point && point.x !== null && point.x !== undefined && point.y !== null && point.y !== undefined;
        } catch (e) {
            console.warn(e);
            return false;
        }
    }

    public static pointOffset(point1: Point, point2: Point): Size | null {
        if (this.isPoint(point1) && this.isPoint(point2)) {
            return point1.offsetWithPoint(point2);
        }
        return null;
    }

    public static distance(point1: Point, point2: Point) {
        if (this.isPoint(point1) && this.isPoint(point2)) {
            return this.distanceWithXY(point1.x, point1.y, point2.x, point2.y);
        }
        return 0;
    }

    public static distanceWithXY(x1: number, y1: number, x2: number, y2: number) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    }

    private _x: number = 0;
    private _y: number = 0;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    public offsetWithPoint(point: Point): Size | null {
        // @ts-ignore
        if (this.constructor.isPoint(point)) {
            return new Size(point.x - this.x, point.y - this.y);
        }
        return null;
    }

    public setupWithPoint(point: Point) {
        // @ts-ignore
        if (this.constructor.isPoint(point)) {
            this._x = point.x;
            this._y = point.y;
        } else {
            console.log(`setupWithPoint: ${point} 无效的Point对象`);
        }
    }

    public move(size: Size) {
        if (size && Size.isSize(size)) {
            this._x += size.width;
            this._y += size.height;
        }
    }

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
