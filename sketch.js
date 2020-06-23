const Engine = Matter.Engine,
    World = Matter.World,
    Body = Matter.Body,
    Events = Matter.Events,
    Bodies = Matter.Bodies;

const bulletLabel = ['rock', 'paper', 'scissors'];
let player;
let incomingStuff = [];
let spawner;
let movement = 'none';
let shoot = 'none';

function preload() {
    img = loadImage('assets/rock2.jpg')
}

function setup() {
    let h = window.innerHeight;
    let w = window.innerWidth;
    canvas = createCanvas(w, h);
    engine = Engine.create();
    world = engine.world;
    world.gravity = {
        x: 0,
        y: 0
    };
    // Engine.run(engine);
    world.frictionAir = {
        x: 0,
        y: 0
    };
    player = new Player(w / 2, h - 20, 10, 'player'); // for now just a circle body
    spawner = setInterval(() => {
        makeProjectile(random(400, window.innerWidth - 400), 20, random(bulletLabel), 0, 4)
    }, 3000);
    document.body.addEventListener("keydown", function (e) {
        console.log(e);
        if (e.code == "ArrowLeft") {
            movement = 'left';
        }
        if (e.code == "ArrowRight") {
            movement = 'right';
        }
        if (e.key == 'q') {
            makeProjectile(player.body.position.x, player.body.position.y - 25, 'rock', 0, -4);
        }
        if (e.key == 'w') {
            makeProjectile(player.body.position.x, player.body.position.y - 25, 'paper', 0, -4);
        }
        if (e.key == 'e') {
            makeProjectile(player.body.position.x, player.body.position.y - 25, 'scissors', 0, -4);
        }
    });
    document.body.addEventListener("keyup", function (e) {
        console.log(e.key);
        if (e.code == "ArrowLeft" || e.code == 'ArrowRight') {
            movement = 'none';
        }
    });
    Events.on(engine, 'beforeUpdate', function () {
        if (movement == 'left') {
            Body.setVelocity(player.body, {
                x: -4,
                y: 0
            })
        } else if (movement == 'right') {
            Body.setVelocity(player.body, {
                x: 4,
                y: 0
            })
        } else if (movement == 'none') {
            Body.setVelocity(player.body, {
                x: 0,
                y: 0
            })
        }
    });
    Events.on(engine, 'collisionStart', function (event) {

        var pairs = event.pairs;

        // i shot a rock at paper
        if (pairs[0].bodyA.label == 'rock' && pairs[0].bodyB.label == 'paper') {
            World.remove(world, pairs[0].bodyA);
            World.remove(world, pairs[0].bodyB);
            incomingStuff = incomingStuff.filter((elem) => {
                return (elem.body.id != pairs[0].bodyA.id && elem.body.id != pairs[0].bodyB.id);
            });
        }
        if (pairs[0].bodyA.label == 'paper' && pairs[0].bodyB.label == 'scissors') {
            World.remove(world, pairs[0].bodyA);
            World.remove(world, pairs[0].bodyB);
            incomingStuff = incomingStuff.filter((elem) => {
                return (elem.body.id != pairs[0].bodyA.id && elem.body.id != pairs[0].bodyB.id);
            });
        }
        if (pairs[0].bodyA.label == 'scissors' && pairs[0].bodyB.label == 'rock') {
            World.remove(world, pairs[0].bodyA);
            World.remove(world, pairs[0].bodyB);
            incomingStuff = incomingStuff.filter((elem) => {
                return (elem.body.id != pairs[0].bodyA.id && elem.body.id != pairs[0].bodyB.id);
            });
        }
        // i shot a rock at a rock
        if (pairs[0].bodyA.label == 'rock' && pairs[0].bodyB.label == 'rock') {
            World.remove(world, pairs[0].bodyB);
            incomingStuff = incomingStuff.filter((elem) => {
                return (elem.body.id != pairs[0].bodyB.id);
            });
        }
        if (pairs[0].bodyA.label == 'scissors' && pairs[0].bodyB.label == 'scissors') {
            World.remove(world, pairs[0].bodyB);
            incomingStuff = incomingStuff.filter((elem) => {
                return (elem.body.id != pairs[0].bodyB.id);
            });
        }
        if (pairs[0].bodyA.label == 'paper' && pairs[0].bodyB.label == 'paper') {
            World.remove(world, pairs[0].bodyB);
            incomingStuff = incomingStuff.filter((elem) => {
                return (elem.body.id != pairs[0].bodyB.id);
            });
        }
        // i shot a paper at rock
        if (pairs[0].bodyA.label == 'paper' && pairs[0].bodyB.label == 'rock') {
            World.remove(world, pairs[0].bodyB);
            incomingStuff = incomingStuff.filter((elem) => {
                return (elem.body.id != pairs[0].bodyB.id);
            });
        }
        if (pairs[0].bodyA.label == 'scissors' && pairs[0].bodyB.label == 'paper') {
            World.remove(world, pairs[0].bodyB);
            incomingStuff = incomingStuff.filter((elem) => {
                return (elem.body.id != pairs[0].bodyB.id);
            });
        }
        if (pairs[0].bodyA.label == 'rock' && pairs[0].bodyB.label == 'scissors') {
            World.remove(world, pairs[0].bodyB);
            incomingStuff = incomingStuff.filter((elem) => {
                return (elem.body.id != pairs[0].bodyB.id);
            });
        }

    });
}

function draw() {
    Engine.update(engine, 1000 / 60);
    background(100);
    player.show();
    incomingStuff.forEach((elem) => elem.show());
}

function makeProjectile(x, y, bulletLabel, xs, ys) {
    let pos = {
        x: x,
        y: y
    };
    proj = new Projectile(pos.x, pos.y, 10, bulletLabel, {
        x: xs,
        y: ys
    });
    incomingStuff.push(proj);
    console.log(incomingStuff);
}