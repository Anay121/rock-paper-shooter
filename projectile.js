class Projectile {
    constructor(x, y, r, playerLabel, velocity) {
        let options = {
            label: playerLabel,
            frictionAir: 0
        }
        this.body = Bodies.circle(x, y, r, options);
        this.r = r;
        this.color = 'red';
        World.add(world, this.body);
        Body.setVelocity(this.body, velocity)
    }

    show() {
        let pos = this.body.position;
        let angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        strokeWeight(1);
        stroke(255);
        fill(this.color);
        circle(0, 0, this.r * 2);
        pop();
    }

    removeBody() {
        World.remove(world, this.body);
    }

}
