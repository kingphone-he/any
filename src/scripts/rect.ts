import {Point} from '@/scripts/point';
import {Size} from '@/scripts/size';

/**
 * 矩形类
 */
class Rect {

    public static className(): string {
        return 'Rect';
    }

    /**
     * 坐标为(0, 0)宽高为0的矩形
     */
    public static zero(): Rect {
        return new this(0, 0, 0, 0);
    }

    /**
     * 判断是否为有效的矩形
     * 判断依据：origin为有效的Point对象，size为有效的Size对象
     * @param rect
     */
    public static isRect(rect: Rect) {
        return !!(rect && Point.isPoint(rect.origin) && Size.isSize(rect.size));

    }

    /**
     * 坐标
     */
    private _origin: Point = Point.zero();
    /**
     * 宽高
     */
    private _size: Size = Size.zero();

    /**
     * 构造
     * @param x      x坐标
     * @param y      y坐标
     * @param width  宽度
     * @param height 高度
     */
    constructor(x: number, y: number, width: number, height: number) {
        this._origin.x = x;
        this._origin.y = y;
        this._size.width = width;
        this._size.height = height;
    }

    /**
     * 在当前矩形对象的基础上设置坐标和宽高
     * @param rect
     */
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

    /**
     * 底部y值
     */
    get bottom() {
        return this.y + this.height;
    }

    /**
     * 右侧x值
     */
    get right() {
        return this.x + this.width;
    }
}

export {
    Point,
    Size,
    Rect
};
