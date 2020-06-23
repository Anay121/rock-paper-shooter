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
function setup(){
    let h = window.innerHeight;
    let w = 0.4*window.innerWidth;
    canvas = createCanvas(w, h);
    engine = Engine.create();
    world = engine.world;
    world.gravity = {x:0, y:0};
    // Engine.run(engine);
    world.frictionAir = {x:0, y:0};
    player = new Player(w/2, h-20, 10, 'player'); // for now just a circle body
    spawner = setInterval(makeProjectile, 3000);
    document.body.addEventListener("keydown", function(e) {
        console.log(e.key);
        if(e.key == "ArrowLeft"){
            movement = 'left';
        }
        if(e.key == "ArrowRight"){
            movement = 'right';
        }
    });
    document.body.addEventListener("keyup", function(e) {
        console.log(e.key);
        if(e.key == "ArrowLeft" || e.key == 'ArrowRight'){
            movement = 'none';
        }
    });
    Events.on(engine, 'beforeUpdate', function(){
        if(movement == 'left'){
            Body.setVelocity(player.body, {x:-1, y:0})
        }
        else if(movement == 'right'){
            Body.setVelocity(player.body, {x:1, y:0})
        }
        else if(movement == 'none'){
            Body.setVelocity(player.body, {x:0, y:0})
        }
    });
}

function draw(){
    Engine.update(engine, 1000 / 60);   
    background(100);
    player.show();
    incomingStuff.forEach((elem)=>elem.show());
}

function makeProjectile(){
    let pos = {x: random(10, window.innerWidth-10), y:20};
    proj = new Projectile(pos.x, pos.y, 10, random(bulletLabel));
    incomingStuff.push(proj);
}