/**
 * 宽高尺寸类
 */
class Size {

    public static className(): string {
        return 'Size';
    }

    /**
     * 判断是否是有效的Size类对象
     * 判断依据：width、height为有效的number类型（非Infinity、null、undefined）
     * @param size
     */
    public static isSize(size: Size): boolean {
        try {
            return size && size.width !== null && size.width !== Infinity && size.width !== undefined && size.height !== null && size.height !== undefined && size.height !== Infinity;
        } catch (e) {
            console.warn(e);
            return false;
        }
    }

    /**
     * 宽高为0的宽高对象
     */
    public static zero() {
        return new this(0, 0);
    }

    /**
     * 宽度
     */
    private _width: number = 0;
    /**
     * 高度
     */
    private _height: number = 0;

    /**
     * 构造
     * @param width  宽度
     * @param height 高度
     */
    constructor(width: number, height: number) {
        this._width = width;
        this._height = height;
    }

    /**
     * 在当前的宽高对象的基础上更新宽高值
     * @param size
     */
    public setupWithSize(size: Size) {
        // @ts-ignore
        if (this.constructor.isSize(size)) {
            this.width = size.width;
            this.height = size.height;
        } else {
            console.log(`setupWithSize: ${size} 无效的Size对象`);
        }
    }

    /**
     * 拷贝
     */
    public clone(): Size | null {
        // @ts-ignore
        if (this.constructor.isSize(this)) {
            return new Size(this.width, this.height);
        }
        return null;
    }

    get width(): number {
        return this._width;
    }

    set width(value: number) {
        this._width = value;
    }

    get height(): number {
        return this._height;
    }

    set height(value: number) {
        this._height = value;
    }
}

export {
    Size
};
