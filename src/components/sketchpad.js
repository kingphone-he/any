class Sketchpad {
    static randomColor() {
        return `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    }

    constructor() {
    }

    onSketchpadCreated() {
    }

    onSketchpadMounted(sketchpadVueComponent) {
        this.sketchpadVueComponent = sketchpadVueComponent;
    }

    onSketchpadBeforeDestroy() {
    }

    get context() {
        return this.sketchpadVueComponent.context;
    }
}

export {
    Sketchpad
};
