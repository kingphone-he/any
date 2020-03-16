import {BezierPath} from '../../scripts/bezier-path';
import {Line, Point} from '../../scripts/line';
import {TimingFunction} from '../../scripts/timing-function';
import {Sketchpad} from '../sketchpad';

class BezierPathTest extends Sketchpad {

    constructor() {
        super();
        this.colors = {
            bezierPathColor: 'red'
        };
        this.bezierPath = new BezierPath();
        this.bezierPath.startPoint = new Point(50, 500);
        this.bezierPath.endPoint = new Point(1000, 150);
        // this.bezierPath.controlPoints.push(new Point(150, 0));
        this.bezierPath.controlPoints.push(new Point(150, 150), new Point(900, 500));
        // this.bezierPath.controlPoints.push(new Point(150, 150), new Point(350, 375), new Point(700, 275), new Point(900, 500));

        // 默认线性速度
        this.timingFunction = new TimingFunction();
        // 先快后慢，开始的时候因为速度太快，导致开头丢失0.3的percent，所以开头0.3的曲线丢失或者间隔太大变成直线
        // this.timingFunction.timingFunction = (timingFunction) => {
        //     return timingFunction.startPercent + Math.pow(timingFunction.time - timingFunction.startTime, 1/4);
        // };
        // 先慢后快
        // this.timingFunction.timingFunction = (timingFunction) => {
        //     return timingFunction.startPercent + Math.pow(timingFunction.time - timingFunction.startTime, 4);
        // };
        this.timingFunction.startPercent = this.bezierPath.startPercent;
        this.timingFunction.endPercent = this.bezierPath.endPercent;
    }

    onSketchpadCreated() {
        super.onSketchpadCreated();
    }

    onSketchpadMounted(sketchpadVueComponent) {
        super.onSketchpadMounted(sketchpadVueComponent);
        this.drawPathAnimated();
    }

    onSketchpadBeforeDestroy() {
        super.onSketchpadBeforeDestroy();
        this.timer && clearInterval(this.timer);
    }

    drawLines(lines, color) {
        this.context.beginPath();
        for (let i = 0; i < lines.length; i++) {
            i === 0 && this.context.moveTo(lines[i].start.x, lines[i].start.y);
            this.context.lineTo(lines[i].end.x, lines[i].end.y);
        }
        this.context.lineWidth = 2;
        this.context.strokeStyle = color;
        this.context.fillStyle = 'transparent';
        this.context.stroke();
    }

    drawLinesExtremePoint(lines, color) {
        for (let i = 0; i < lines.length; i++) {
            let startPath = new Path2D();
            startPath.arc(lines[i].start.x, lines[i].start.y, 5, 0, 2 * Math.PI);
            startPath.closePath();
            this.drawPointArcPath(startPath, color);
            let endPath = new Path2D();
            endPath.arc(lines[i].end.x, lines[i].end.y, 5, 0, 2 * Math.PI);
            endPath.closePath();
            this.drawPointArcPath(endPath, color);
            if (lines.length === 1) {
                let bezierPathPointPath =  new Path2D();
                let point = lines[i].linePointWithLengthPercentFromStart(this.bezierPath.percent);
                bezierPathPointPath.arc(point.x, point.y, 5, 0, 2 * Math.PI);
                bezierPathPointPath.closePath();
                this.drawPointArcPath(bezierPathPointPath, this.colors.bezierPathColor);
            }
        }
    }

    drawPointArcPath(path, color) {
        this.context.beginPath();
        this.context.lineWidth = 2;
        this.context.strokeStyle = color;
        this.context.fillStyle = color;
        this.context.stroke(path);
        this.context.fill(path);
    }

    drawResultLines() {
        for (let i = 0; i < this.bezierPath.bezierPathLines.length; i++) {
            let bezierPathLines = this.bezierPath.bezierPathLines[i];
            this.colors[i] = this.colors[i] || this.constructor.randomColor();
            this.drawLines(bezierPathLines.lines, this.colors[i]);
            this.drawLinesExtremePoint(bezierPathLines.lines, this.colors[i]);
        }
    }

    drawPoints() {
        this.context.beginPath();
        for (let i = 0; i < this.bezierPath.points.length; i++) {
            i === 0 ? this.context.moveTo(this.bezierPath.points[i].x, this.bezierPath.points[i].y) : this.context.lineTo(this.bezierPath.points[i].x, this.bezierPath.points[i].y);
        }
        this.context.lineWidth = 4;
        this.context.strokeStyle = this.colors.bezierPathColor;
        this.context.stroke();
    }

    drawPathAnimated() {
        if (this.bezierPath.distanceBetweenStartPointAndEndPoint > 0) {
            const draw = (percent) => {
                this.context.clearRect(0, 0, this.sketchpadVueComponent.width, this.sketchpadVueComponent.height);
                this.drawPoints();
                this.drawResultLines();
            };
            this.timer && clearInterval(this.timer);
            this.timingFunction.time = 0;
            this.timer = setInterval(() => {
                let percent = this.timingFunction.percent;
                this.bezierPath.setupBezierPathLines(percent);
                if (percent <= this.timingFunction.endPercent) {
                    draw(percent);
                } else {
                    // clearInterval(this.timer);
                    this.bezierPath.clearPoints();
                    this.timingFunction.restore();
                }
                this.timingFunction.next();
            }, 50);
        }
    }
}

export {
    BezierPathTest
}
