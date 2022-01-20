
class Vehicle {
    constructor(x, y) {
        this.pos = new p5.Vector(x, y)
        this.vel = new p5.Vector()
        this.acc = new p5.Vector()

        this.max_force = 0.2
        this.max_speed = 4
        this.r = 12
    }

    seek(target) {
        // our desired velocity is straight at our target from our origin!
        let desired_velocity = p5.Vector.sub(target, this.pos)
        desired_velocity.setMag(this.max_speed)
        let steering = p5.Vector.sub(desired_velocity, this.vel)

        /* make seeking more realistic by limiting acceleration */
        steering.limit(this.max_force)
        this.applyForce(steering)
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