<template>
    <div id="sketchpad_canvas_container">
        <canvas id="sketchpad_canvas" ref="sketchpadCanvas"></canvas>
    </div>
</template>

<script>
    export default {
        name: "Sketchpad",
        props: ['sketchpad'],
        data() {
            return {
            }
        },
        created() {
            this.sketchpad && this.sketchpad.onSketchpadCreated();
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
        width: 100%;
        height: 100%;

        #sketchpad_canvas {
            width: 100%;
            height: 100%;
        }
    }
</style>
