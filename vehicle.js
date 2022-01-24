/**
 * Returns the projected point between future and [start, end]
 *
 * @param start start of our path. the vertex of the angle between future,
 * start, and end;
 * @param future vehicle position
 * @param end end of the path
 *
 * @return the projected point
 */
function findProjection(start, future, end) {
    /* vector from start to future */
    let v1 = p5.Vector.sub(future, start)

    /* vector from start to end */
    let v2 = p5.Vector.sub(end, start)

    /* the dot product formula is easier if we normalize the 2nd vector */
    v2.normalize()

    let scalarProjection = v1.dot(v2)
    v2.mult(scalarProjection)
    v2.add(start)
    return v2
}

class Vehicle {
    constructor(x, y) {
        this.pos = new p5.Vector(x, y)
        this.vel = new p5.Vector()
        this.acc = new p5.Vector()

        this.max_force = 0.1
        this.max_speed = 4
        this.r = 12
    }


    /**
     *
     * @param target
     * @returns {*} a steering force p5.Vector!
     */
    seek(target) {
        // our desired velocity is straight at our target from our origin!
        let desired_velocity = p5.Vector.sub(target, this.pos)
        desired_velocity.setMag(this.max_speed)
        let steering = p5.Vector.sub(desired_velocity, this.vel)

        /* make seeking more realistic by limiting acceleration */
        steering.limit(this.max_force)
        return steering
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
        let futurePos = this.vel.copy()
        futurePos.mult(20)
        futurePos.add(this.pos) // where will we be in the future?

        fill(0, 100, 70, 30) // a transparent red
        circle(futurePos.x, futurePos.y, 16)

        /* step 2. is futurePos on our path? target is our projection point */
        let target = findProjection(path.start, futurePos, path.end)
        fill(90, 100, 80, 40)
        circle(target.x, target.y, 16)

        /* distance between our future position and our vector projection */
        let dist = p5.Vector.dist(futurePos, target)

        /* seek only if we're not already within the radius of the path */
        if (dist > path.radius)
            return this.seek(target)
        else return new p5.Vector(0, 0)
    }


    applyForce(force) {
        this.acc.add(force)
    }


    update() {
        this.vel.add(this.acc)
        this.vel.limit(this.max_speed)
        this.pos.add(this.vel)
        this.acc.mult(0)
    }


    render() {
        stroke(90, 0, 100, 100)
        strokeWeight(4)
        strokeJoin(ROUND)
        fill(0, 0, 100) // white
        push()
        translate(this.pos.x, this.pos.y)
        rotate(this.vel.heading())

        /* make a triangle with math */
        let s = this.r
        triangle(
            -s, -s / 1.3,
            -s, s / 1.3,
            s, 0
        );

        pop()
    }


    /**
     *  a simple edges function that does not take radius into account
     */
    edges() {
        if (this.pos.x > width) /* wrap when hitting right boundary */
            this.pos.x = 0
        else if (this.pos.x < 0) /* wrap when hitting left boundary */
            this.pos.x = width
        else if (this.pos.y > height) /* wrap when hitting bottom boundary */
            this.pos.y = 0
        else if (this.pos.y < 0) /* wrap when hitting top boundary */
            this.pos.y = height
    }
}