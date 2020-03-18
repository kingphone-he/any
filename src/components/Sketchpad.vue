<template>
    <div id="sketchpad_canvas_container">
        <span style="position: absolute; left: 0; top: 0">(0, 0)</span>
        <span style="position: absolute; right: 0; top: 0">({{ width }}, 0)</span>
        <span style="position: absolute; left: 0; bottom: 0">(0, {{ height }})</span>
        <span style="position: absolute; right: 0; bottom: 0">({{ width }}, {{ height }})</span>
        <canvas id="sketchpad_canvas" ref="sketchpadCanvas"></canvas>
    </div>
</template>

<script>
    import {BezierPathTest} from "./examples/bezier-path-test";

    export default {
        name: "Sketchpad",
        props: ['sketchpad'],
        data() {
            return {
                width: 0,
                height: 0
            }
        },
        created() {
            this.sketchpad && this.sketchpad.onSketchpadCreated();
            this.sketchpad && (this.$props.sketchpad.onCallback = (type) => {
                if (type === BezierPathTest.CallbackType.UpdateBezierPath) {
                    this.sketchpad && this.sketchpad.destroy();
                    this.sketchpad && this.sketchpad.drawPathAnimated();
                }
            });
        },
        mounted() {
            this.sketchpadCanvas = this.$refs.sketchpadCanvas;
            this.width = ~~this.sketchpadCanvas.clientWidth * 2;
            this.height = ~~this.sketchpadCanvas.clientHeight * 2;
            this.sketchpadCanvas.width = this.width;
            this.sketchpadCanvas.height = this.height;
            this.context = this.sketchpadCanvas.getContext('2d');

            this.sketchpad && this.sketchpad.onSketchpadMounted(this);
        },
        methods: {
        },
        beforeDestroy() {
            this.sketchpad && this.sketchpad.onSketchpadBeforeDestroy();
        }
    }
</script>

<style scoped lang="less">
    #sketchpad_canvas_container {
        position: relative;
        width: 100%;
        height: 100%;
        border: 1px solid lightgray;

        #sketchpad_canvas {
            width: 100%;
            height: 100%;
        }
    }
</style>
