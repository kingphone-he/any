const CallbackType = {};

/**
 * 画板组件的数据类基类
 */
class Sketchpad {
    /**
     * 随机 颜色
     * @return {string}
     */
    static randomColor() {
        return `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    }

    /**
     * 子类继承之后重写，并return特有的类型枚举
     * @return {object}
     */
    static get CallbackType() {
        return CallbackType;
    }

    /**
     * 构造
     */
    constructor() {
    }

    /**
     * 组件创建时调用
     */
    onSketchpadCreated() {
    }

    /**
     * 组件挂在时调用
     * @param sketchpadVueComponent 组件
     */
    onSketchpadMounted(sketchpadVueComponent) {
        this.sketchpadVueComponent = sketchpadVueComponent;
    }

    /**
     * 销毁前调用
     */
    onSketchpadBeforeDestroy() {
        this.destroy();
    }

    /**
     * 回调
     * @param type 回调类型
     * @param data 附带数据
     */
    onCallback(type, data) {
    }

    /**
     * 销毁
     */
    destroy() {
    }

    /**
     * 组件里的canvas的context
     * @return {*}
     */
    get context() {
        return this.sketchpadVueComponent.context;
    }
}

export {
    Sketchpad
};
