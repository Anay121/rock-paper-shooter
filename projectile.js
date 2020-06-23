class Projectile {
    constructor(x, y, r, playerLabel, velocity) {

        let options = {
            label: playerLabel,
            frictionAir: 0,
            isSensor: true,
        }
        // this.body = Bodies.circle(x, y, r, options);
        this.body = Bodies.rectangle(x, y, r, r, options);
        this.r = r;
        // if (playerLabel == 'rock') {
        //     this.color = 'red';
        // } else if (playerLabel == 'scissors') {
        //     this.color = 'blue';
        // } else if (playerLabel == 'paper') {
        //     this.color = 'green';
        // }

        World.add(world, this.body);
        Body.setVelocity(this.body, velocity);
    }

    show() {
        let pos = this.body.position;
        let angle = this.body.angle;
        if (this.body.position.y > window.windowHeight) {
            this.removeBody();
        }
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        strokeWeight(1);
        // stroke(255);
        fill(0);
        rect(0, 0, this.r, this.r)
        imageMode(CENTER);
        if(this.body.label.includes('rock')){
            image(rockImg, 0, 0, this.r, this.r);
        }
        else if(this.body.label.includes('paper')){
            image(paperImg, 0, 0, this.r, this.r);
        }
        else if(this.body.label.includes('scissors')){
            image(scissorImg, 0, 0, this.r, this.r);
        }
        
        
        // fill(this.color);
        // circle(0, 0, this.r * 2);
        pop();
    }

    removeBody() {
        World.remove(world, this.body);
    }

}