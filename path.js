class Path {
    constructor(x1, y1, x2, y2) {
        this.start = new p5.Vector(x1, y1)
        this.end = new p5.Vector(x2, y2)
    }


    /**
     * 1. predict the future position: fpos, of the vehicle
     * 2. is fpos on the path? calculate distance between point and line
     *      if distance d is less than the path radius, do nothing
     *      else we're off the path
     * 3. find projection point: target
     * 4. seek this target :3
     * @param path
     */
    follow(path) {

    }

    render() {
        stroke(0, 0, 100, 70)
        strokeWeight(2)
        line(this.start.x, this.start.y,
            this.end.x, this.end.y)
    }
}