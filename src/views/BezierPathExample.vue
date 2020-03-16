<template>
    <div style="width: 100%; height: 500px">
        <sketchpad ref="sketchpad" v-if="sketchpad" :sketchpad="sketchpad"></sketchpad>
    </div>
</template>

<script>
    import Sketchpad from "../components/Sketchpad.vue";
    import {BezierPathTest} from "../components/examples/bezier-path-test";

    export default {
        name: "BezierPathExample",
        components: {Sketchpad},
        data() {
            return {
                sketchpad: null
            }
        },
        created() {
            this.sketchpad = new BezierPathTest();
        }
    }
</script>

<style scoped>

</style>
