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
 *
 * coding breadcrumbs
 *  move vehicle code into vehicle.js
 *  create path.js → render, constructor. add simple path in sketch.js
 *
 *
 * TODO:
 *  come up with coding plan starting from scratch
 *  evade
 *  pursuit based on predicting target pos next frame based on its vel
 */


let font
let vehicle, target, path

function preload() {
    font = loadFont('data/meiryo.ttf')
}

function setup() {
    createCanvas(640, 360)
    colorMode(HSB, 360, 100, 100, 100)
    noCursor()

    vehicle = new Vehicle(100, 100)
    path = new Path(0, 200, width, 200)

}

function draw() {
    background(234, 34, 24)
    fill(201, 96, 83)
    strokeWeight(2)

    target = new p5.Vector(mouseX, mouseY)
    circle(target.x, target.y, 32)

    vehicle.seek(target)
    vehicle.update()
    vehicle.edges()
    vehicle.render()

    path.render()
}