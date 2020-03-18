<template>
    <div style="width: 100%; height: 500px">
        <div class="point_input_container">
            <div class="input_container"><el-input-number controls-position="right" size="mini" placeholder="startPointX" type="number" v-model="sketchpad.bezierPath.startPoint.x" /></div>
            <div class="input_container"><el-input-number controls-position="right" size="mini" placeholder="startPointy" type="number" v-model="sketchpad.bezierPath.startPoint.y" /></div>
        </div>
        <div class="point_input_container">
            <div class="input_container"><el-input-number controls-position="right" size="mini" placeholder="endPointX" type="number" v-model="sketchpad.bezierPath.endPoint.x" /></div>
            <div class="input_container"><el-input-number controls-position="right" size="mini" placeholder="endPointy" type="number" v-model="sketchpad.bezierPath.endPoint.y" /></div>
        </div>
        <div class="control_points_container_wrapper">
            <div class="point_input_container control_points_container" v-for="(controlPoint, controlPointIndex) in sketchpad.bezierPath.controlPoints">
                <div class="input_container"><el-input-number controls-position="right" size="mini" type="number" :placeholder="`controlPoint${controlPointIndex}X`" v-model="controlPoint.x" /></div>
                <div class="input_container"><el-input-number controls-position="right" size="mini" type="number" :placeholder="`controlPoint${controlPointIndex}Y`" v-model="controlPoint.y" /></div>
                <el-button size="mini" type="button" class="el-icon-minus" @click="removeControlPoint(controlPoint, controlPointIndex)"></el-button>
            </div>
        </div>
        <div  class="point_input_container">
            <el-button size="mini" type="button" class="el-icon-plus" @click="addControlPoint"></el-button>
            <el-button size="mini" type="button" class="el-icon-refresh" @click="reloadBezierPath"></el-button>
        </div>
        <div>
            <sketchpad ref="sketchpad" v-if="sketchpad" :sketchpad="sketchpad"></sketchpad>
        </div>
    </div>
</template>

<script>
    import Sketchpad from "../components/Sketchpad.vue";
    import {Point} from "../scripts/point";
    import {BezierPathTest} from "../components/examples/bezier-path-test";

    export default {
        name: "BezierPathExample",
        components: {Sketchpad},
        data() {
            return {
                sketchpad: new BezierPathTest(),
            }
        },
        created() {
            // let bezierPathTest = new BezierPathTest();
            // bezierPathTest.setupBezierPathPointsDefault();
            // this.sketchpad = bezierPathTest;
            this.sketchpad.setupBezierPathPointsDefault();
        },
        methods: {
            addControlPoint() {
                this.sketchpad.bezierPath.controlPoints.push(Point.zero());
            },
            removeControlPoint(controlPoint, controlPointIndex) {
                this.sketchpad.bezierPath.controlPoints.splice(controlPointIndex, 1);
            },
            reloadBezierPath() {
                this.sketchpad.bezierPath.reset();
                this.sketchpad.updateBezierPath();
            }
        }
    }
</script>

<style scoped lang="less">
    .point_input_container {
        text-align: left;
        margin-bottom: 5px;
        margin-right: 50px;
    }
    .control_points_container_wrapper {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
    }
    .input_container {
        display: inline-block;
        margin-right: 5px;
    }
    .control_points_container {
        display: inline;
    }
</style>
