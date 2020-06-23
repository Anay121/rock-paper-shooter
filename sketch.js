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
let lives = 5;
let score = 50;
let gameOver = 0;
let time = 1500;
let rocks = 5;
let papers = 5;
let scissors = 5;
let textLength;
function preload() {
    rockImg = loadImage('https://cors-anywhere.herokuapp.com/https://raw.githubusercontent.com/Anay121/InfiniteVenues/master/static/VTGRock.png')
    paperImg = loadImage('https://cors-anywhere.herokuapp.com/https://raw.githubusercontent.com/Anay121/InfiniteVenues/master/static/VTGPaper.png')
    scissorImg = loadImage('https://cors-anywhere.herokuapp.com/https://raw.githubusercontent.com/Anay121/InfiniteVenues/master/static/VTGScissors.png')
    heartImg = loadImage('https://cors-anywhere.herokuapp.com/https://raw.githubusercontent.com/Anay121/InfiniteVenues/master/static/lives.png')
}

function setup() {
    frameRate(60);
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
    player = new Player(w / 2, h - 20, 40, 'player'); 
    // spawner = setInterval(() => {
    //     makeProjectile(random(400, window.innerWidth - 400), 20, random(bulletLabel), 0, 4, rockImg)
    // }, 3000);

    var spawner = function () {
        makeProjectile(random(400, window.innerWidth - 400), 20, random(bulletLabel), 0, 4);
        if (score > 0 && score % 5 == 0) {
            time -= 100;
        }
        setTimeout(spawner, time);
    }
    setTimeout(spawner, time);

    document.body.addEventListener("keydown", function (e) {
        if (!gameOver) {
            if (e.code == "ArrowLeft") {
                movement = 'left';
            }
            if (e.code == "ArrowRight") {
                movement = 'right';
            }
            if (e.key == 'q' && rocks > 0) {
                makeProjectile(player.body.position.x, player.body.position.y - 25, 'rock', 0, -6);
                rocks--;
            }
            if (e.key == 'w' && papers > 0) {
                makeProjectile(player.body.position.x, player.body.position.y - 25, 'paper', 0, -6);
                papers--;
            }
            if (e.key == 'e' && scissors > 0) {
                makeProjectile(player.body.position.x, player.body.position.y - 25, 'scissors', 0, -6);
                scissors--;
            }
            if (e.key == 's'){
                specialPower();
            }
        } else {
            if (e.key == "r") {
                lives = 5;
                score = 0;
                gameOver = 0;
                time = 1500;
                papers = 5;
                rocks = 5;
                scissors = 5;
            }
        }
    });
    document.body.addEventListener("keyup", function (e) {
        if (e.code == "ArrowLeft" || e.code == 'ArrowRight') {
            movement = 'none';
        }
    });
    Events.on(engine, 'beforeUpdate', function () {

        if (movement == 'left') {
            Body.setVelocity(player.body, {
                x: -6,
                y: 0
            })
        } else if (movement == 'right') {
            Body.setVelocity(player.body, {
                x: 6,
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
            score++;
            rocks = rocks+1 > 8 ? 8 : rocks+1;
            papers = papers+1 > 8 ? 8 : papers+1;;
            incomingStuff = incomingStuff.filter((elem) => {
                return (elem.body.id != pairs[0].bodyA.id && elem.body.id != pairs[0].bodyB.id);
            });
        }
        if (pairs[0].bodyA.label == 'paper' && pairs[0].bodyB.label == 'scissors') {
            World.remove(world, pairs[0].bodyA);
            World.remove(world, pairs[0].bodyB);
            score++;
            papers = papers+1 > 8 ? 8 : papers+1;;
            scissors = scissors+1 > 8 ? 8 : scissors+1;
            incomingStuff = incomingStuff.filter((elem) => {
                return (elem.body.id != pairs[0].bodyA.id && elem.body.id != pairs[0].bodyB.id);
            });
        }
        if (pairs[0].bodyA.label == 'scissors' && pairs[0].bodyB.label == 'rock') {
            World.remove(world, pairs[0].bodyA);
            World.remove(world, pairs[0].bodyB);
            score++;
            scissors = scissors+1 > 8 ? 8 : scissors+1;
            rocks = rocks+1 > 8 ? 8 : rocks+1;
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
        if (pairs[0].bodyA.label == 'srock' || pairs[0].bodyB.label == 'srock' || pairs[0].bodyA.label == 'spaper' || pairs[0].bodyB.label == 'spaper' || pairs[0].bodyA.label == 'sscissors' || pairs[0].bodyB.label == 'sscissors') {
            World.remove(world, pairs[0].bodyA);
            World.remove(world, pairs[0].bodyB);
            score++;
            incomingStuff = incomingStuff.filter((elem) => {
                return (elem.body.id != pairs[0].bodyA.id && elem.body.id != pairs[0].bodyB.id);
            });
        }

    });
}

function draw() {
    Engine.update(engine, 1000 / 60);
    background(0);
    stroke(255);
    fill(255);
    line(375, 0, 375, window.innerHeight);
    textAlign(LEFT)
    line(window.innerWidth - 375, 0, window.innerWidth - 375, window.innerHeight);
    player.show();
    textSize(25);
    text('Score : ' + score, 100, 100);
    text('Lives : ', 100, 150);
    textLength = textWidth('Lives : ');
    for(let i=0; i < lives; i++){
        image(heartImg, 100+textLength+i*20, 135, 20, 20)
    }
    text('Rocks : ', 100, 400);
    textLength = textWidth('Rocks : ');
    for(let i=0; i < rocks; i++){
        image(rockImg, 100+textLength+i*20, 400-15, 20, 20)
    }
    text('Papers : ', 100, 450);
    textLength = textWidth('Papers : ');
    for(let i=0; i < papers; i++){
        image(paperImg, 100+textLength+i*20, 450-15, 20, 20)
    }
    text('Scissors : ', 100, 500); 
    textLength = textWidth('Scissors : ');
    for(let i=0; i < scissors; i++){
        image(scissorImg, 100+textLength+i*20, 500-15, 20, 20)
    }
    if (gameOver) {
        // textLength = textWidth('Game Over ');
        textAlign(CENTER);
        text('Game Over ', window.innerWidth / 2 , window.innerHeight / 2);
        textSize(20);
        text('Press r to restart', window.innerWidth / 2, window.innerHeight / 2 + 35);
    }

    noStroke();
    incomingStuff.forEach((elem) => {
        elem.show();
        if (elem.body.position.y > window.windowHeight) {
            lives--;
            if (lives <= 0) {
                lives = 0;
                gameOver = 1;
            }
        }
    });
    incomingStuff = incomingStuff.filter((elem) => elem.body.position.y < window.windowHeight && elem.body.position.y > -20);
}

function makeProjectile(x, y, bulletLabel, xs, ys) {
    if (!gameOver) {
        let pos = {
            x: x,
            y: y
        };
        proj = new Projectile(pos.x, pos.y, 40, bulletLabel, {
            x: xs,
            y: ys
        });
        incomingStuff.push(proj);
    }
}

function specialPower(){
    let elems = incomingStuff.slice();
    let playerPos = player.body.position;
    let specialLabel;
    console.log('hie');
    elems.forEach((elem)=>{
        console.log(elem)
        let sy = -7;
        let sx = -11*(playerPos.x - elem.body.position.x)/(playerPos.y - elem.body.position.y)
        if(elem.body.label == 'rock'){
            specialLabel = 'spaper'
        }
        else if(elem.body.label == 'paper'){
            specialLabel = 'sscissors'
        }
        else if(elem.body.label == 'scissors'){
            specialLabel = 'srock'
        }
        makeProjectile(playerPos.x, playerPos.y, specialLabel, sx, sy);
    });
}