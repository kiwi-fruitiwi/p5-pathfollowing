/**
 * @author Kiwi
 * @date 2022-01-14
 *
 * simple vehicle model ← Steering Behaviors for Autonomous Characters, Reynolds
 *     mass, max_speed, max_force
 *     position, velocity
 *     orientation? "N basis vectors"
 *
 * steering = desired_velocity - current_velocity
 *
 * a vehicle's desired velocity should be a vector pointing to its target,
 * magnitude set to max_speed.
 *
 * TODO: come up with coding plan starting from scratch.
 */

class Vehicle {
    constructor(x, y) {
        this.pos = new p5.Vector(x, y)
        this.vel = new p5.Vector()
        this.acc = new p5.Vector()

        this.max_speed = 4
        this.r = 12
    }

    seek(target) {
        // our desired velocity is straight at our target from our origin!
        let desired_velocity = p5.Vector.sub(target, this.pos)
        desired_velocity.setMag(this.max_speed)
        let steering = p5.Vector.sub(desired_velocity, this.vel)

        this.applyForce(steering)
    }

    applyForce(force) {
        this.acc.add(force)
    }

    update() {
        this.vel.add(this.acc)
        this.pos.add(this.vel)
        this.acc.mult(0)
    }

    render() {
        noStroke()
        fill(0, 0, 100) // white
        push()
        translate(this.pos.x, this.pos.y)
        rotate(this.vel.heading())

        /* make a triangle with math */
        let s = this.r
        triangle(
            -s, -s/1.3,
            -s, s/1.3,
            s, 0
        );

        pop()
    }
}


let font
let vehicle, target

function preload() {
    font = loadFont('data/meiryo.ttf')
}

function setup() {
    createCanvas(640, 360)
    vehicle = new Vehicle(100, 100)
    colorMode(HSB, 360, 100, 100, 100)

    noCursor()
}

function draw() {    
    background(234, 34, 24)

    target = new p5.Vector(mouseX, mouseY)
    fill(201, 96, 83)
    circle(target.x, target.y, 32)

    vehicle.seek(target)
    vehicle.update()
    vehicle.render()
}