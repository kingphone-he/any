class Size {

    public static className() {
        return 'Size';
    }

    public static isSize(size: Size): boolean {
        try {
            return size && size.width !== null && size.width !== undefined && size.height !== null && size.height !== undefined;
        } catch (e) {
            console.warn(e);
            return false;
        }
    }

    public static zero() {
        return new this(0, 0);
    }

    private _width: number = 0;
    private _height: number = 0;
    constructor(width: number, height: number) {
        this._width = width;
        this._height = height;
    }

    public setupWithSize(size: Size) {
        // @ts-ignore
        if (this.constructor.isSize(size)) {
            this.width = size.width;
            this.height = size.height;
        } else {
            console.log(`setupWithSize: ${size} 无效的Size对象`);
        }
    }

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
