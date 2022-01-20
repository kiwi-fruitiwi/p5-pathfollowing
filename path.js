class Path {
    constructor(x1, y1, x2, y2) {
        this.start = new p5.Vector(x1, y1)
        this.end = new p5.Vector(x2, y2)
    }

    render() {
        stroke(0, 0, 100, 70)
        strokeWeight(2)
        line(this.start.x, this.start.y,
            this.end.x, this.end.y)
    }
}