class Path {
    constructor(x1, y1, x2, y2) {
        this.start = new p5.Vector(x1, y1)
        this.end = new p5.Vector(x2, y2)
        this.radius = 20
    }

    render() {
        stroke(0, 0, 100, 70)
        strokeWeight(2)

        /*  a line from our start pVector to our end pVector */
        line(this.start.x, this.start.y, this.end.x, this.end.y)

        /* draw a thick, low alpha line to show the radius bounds */
        stroke(0, 0, 100, 20)
        strokeWeight(this.radius*2)
        line(this.start.x, this.start.y, this.end.x, this.end.y)
    }
}