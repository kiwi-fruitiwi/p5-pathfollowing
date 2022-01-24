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
 * TODO:
 *
 *  complex paths with line segments → bezier curves
 *      https://editor.p5js.org/codingtrain/sketches/2FFzvxwVt
 *      path following + separation in vehicle.applyBehaviors(vehicles, path)
 *          constant k multiplier to these forces
 *      in follow(path):
 *          path needs to wrap around
 *          getNormalPoint(predictPos, a, b) is just scalarProjection → vector
 *
 *  in path.js
 *      strokeJoin(ROUND)
 *      render() → make a vertex for each point in points []
 *          beginShape → endShape
 *
 *  in sketch.js:
 *      iterate through each vehicle. apply follow(path), separate(v's)
 *      debug drawings based on const DEBUG
 *
 *  a vehicle pursuing the one following the path
 *  groups of vehicles following path
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
    vehicle.vel.x = 1
}

function draw() {
    background(234, 34, 24)
    fill(201, 96, 83)
    strokeWeight(2)

    /* seek a target */
    // target = new p5.Vector(mouseX, mouseY)
    // circle(target.x, target.y, 32)
    // vehicle.seek(target)

    path.end.y = mouseY

    let force = vehicle.follow(path)
    vehicle.applyForce(force)

    vehicle.edges()
    vehicle.update()
    vehicle.render()

    path.render()
}