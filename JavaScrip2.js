var fireworks = [];
var gravity;
var wind;

function setup() {
    colorMode(RGB);
createCanvas(window.innerWidth, window.innerHeight);
    createCanvas(document.body.clientWidth, document.body.clientHeight);
    stroke(255);
    strokeWeight(4);
    wind = createVector(0,0); // wind blowing in from the left...
    gravity = createVector(0, 0.2);
    background(0);
}

function draw() {
    background(0, 50);
    if (random(1) < 0.075) {
        fireworks.push(new Firework());
    }
    for (var i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].update();
        fireworks[i].show();
        if (fireworks[i].isSpent()) {
            fireworks.splice(i, 1);
        }
    }
}

//Fuegos artificiales
function Particle(x, y, rocket, heartRocket, fx, fy) {
    var minBoost = -11;
    var maxBoost = -13.5;
    this.pos = createVector(x, y);
    this.rocket = rocket;
    this.heartRocket = heartRocket;
    this.fx = fx;
    this.fy = fy;
    this.lifespan = 255;
    if (this.rocket) {
        this.vel = createVector(0, random(-1.7, -3.2));
        this.acc = createVector(0, random(minBoost, maxBoost));
    } else if (this.heartRocket) {
        this.vel = createVector(0,0);
        this.vel.mult(random(7, 20));
        this.acc = createVector(0, 0);
        this.r = random(75, 255);
        this.g = random(75, 255);
        this.b = random(75, 255);
    } else {
        this.vel = p5.Vector.random2D();
        this.vel.mult(random(7, 20));
        this.acc = createVector(0, 0);
        this.r = random(75, 255);
        this.g = random(75, 255);
        this.b = random(75, 255);
    }
}

Particle.prototype.isSpent = function() {
    return (this.lifespan <= 0);
}

Particle.prototype.applyForce = function(force) {
    // this is mainly being used to apply gravity as a force, but it would
    // be neat if each firework had a "boost" (accelleration) value that
    // was applied here. Some rockets could be more powerful than others
    // (but not by much...)
    this.acc.add(force);
}

Particle.prototype.update = function() {
    if (!this.rocket) {
        this.vel.mult(0.9);
        this.lifespan -= 4;
    }
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
}

Particle.prototype.show = function() {
    if (!this.rocket) {
        strokeWeight(3);
        stroke(this.r, this.g, this.b, this.lifespan);
    } else {
        strokeWeight(2);
        stroke(255, random(153, 255), 0);
    }
    if (this.heartRocket) {
        push();
        translate(this.fx, this.fy);
        strokeWeight(1);
        point(this.pos.x, this.pos.y);
        pop();
    } else {
        point(this.pos.x, this.pos.y);
    }
}

// fun firework

function Firework() {
    this.exploded = false;
    this.particles = [];
    this.firework = new Particle(random(100, (width - 100)), height, true);
}

Firework.prototype.isSpent = function() {
    return (this.exploded && this.particles.length == 0);
}

Firework.prototype.update = function() {
    if (!this.exploded) {
        this.firework.applyForce(gravity);
        this.firework.applyForce(wind);
        this.firework.update();
        if (this.firework.vel.y >= 0) {
            this.exploded = true;
            this.explode();
        }
    }
    for (var i = this.particles.length - 1; i >= 0; i--) {
        this.particles[i].applyForce(gravity);
        this.particles[i].applyForce(wind);
        this.particles[i].update();
        if (this.particles[i].isSpent()) {
            this.particles.splice(i, 1);
        }
    }
}

Firework.prototype.show = function() {
    if (!this.exploded) {
        this.firework.show();
    }
    for (var i = this.particles.length - 1; i >= 0; i--) {
        this.particles[i].show();
    }
}

Firework.prototype.explode = function() {
    if (random(1) < 0.7) {
        for (var i = 0; i < 75; i++) {
            this.particles.push(new Particle(this.firework.pos.x, this.firework.pos.y, false));
        }
    } else {
        // this turns out to be about 97 points...
        for (var t = 0; t <= TWO_PI; t += 0.065) {
            var x = (16 * pow(sin(t), 3)) * -1;
            var y = (13 * cos(t) - 5 * cos(t * 2) - 2 * cos(t * 3) - cos(t * 4)) * -1
            this.particles.push(new Particle(x, y, false, true, this.firework.pos.x, this.firework.pos.y));
        }
    }
}