import {Point} from '@/scripts/point';
import {Size} from '@/scripts/size';

class Rect {

    public static className() {
        return 'Rect';
    }

    public static zero() {
        return new this(0, 0, 0, 0);
    }

    public static isRect(rect: Rect) {
        return !!(rect && Point.isPoint(rect.origin) && Size.isSize(rect.size));

    }

    private _origin: Point = Point.zero();
    private _size: Size = Size.zero();

    constructor(x: number, y: number, width: number, height: number) {
        this._origin.x = x;
        this._origin.y = y;
        this._size.width = width;
        this._size.height = height;
    }

    public setupWithRect(rect: Rect) {
        // @ts-ignore
        if (this.constructor.isRect(rect)) {
            this.origin.setupWithPoint(rect.origin);
            this.size.setupWithSize(rect.size);
        } else {
            console.log(`setupWithRect: ${rect} 无效的Rect对象`);
        }
    }

    get origin() {
        if (!this._origin) {
            this._origin = new Point(0, 0);
        }
        return this._origin;
    }

    set origin(value) {
        this._origin = value;
    }

    get size() {
        if (!this._size) {
            this._size = new Size(0, 0);
        }
        return this._size;
    }

    set size(value) {
        this._size = value;
    }

    get x() {
        return this.origin.x;
    }

    set x(value) {
        this.origin.x = value;
    }

    get y() {
        return this.origin.y;
    }

    set y(value) {
        this.origin.y = value;
    }

    get width() {
        return this.size.width;
    }

    set width(value) {
        this.size.width = value;
    }

    get height() {
        return this.size.height;
    }

    set height(value) {
        this.size.height = value;
    }

    get bottom() {
        return this.y + this.height;
    }

    get right() {
        return this.x + this.width;
    }
}

export {
    Point,
    Size,
    Rect
};
