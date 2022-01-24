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
 *  a vehicle pursuing the one following the path
 *  groups of vehicles following path
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
 *  in sketch.js
 *      iterate through each vehicle. apply follow(path), separate(v's)
 *      debug drawings based on const DEBUG
 *
 *  in vehicle.js
 *      predicted position in 25 frames
 *      normal, target, worldRecord (min of distances to all projected points?)
 *      look through all pairs of adjacent points in a path:
 *          note that path must wrap around
 *          get normal point to that line with scalarProjection
 *              predictedPosition projected onto vector.sub(b, a)
 *              this is a vector from a to b on the path line
 *          check to see if the normal is within the line segment: x, y
 *          keep track of shortest distance to any projected point
 *      seek the closest projected point, our target
 *      but draw some DEBUG info first
 *
 *  add separate behavior to vehicle.js
 *      loop across all other boids
 *          if distance between our boid and looped boid is bigger than
 *          desired distance:
 *              create vector pointing away from neighboring boid
 *              weigh these by their distance
 *              divide by total number of neighbors to get average sep force
 *              applyForce after normalize, mult(maxSpeed), limit maxForce
 *              if magnitude > 0
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