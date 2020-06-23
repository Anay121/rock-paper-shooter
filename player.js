class Player {
    constructor(x, y, r, playerLabel) {
        let options = {
            label: playerLabel
        }
        this.body = Bodies.circle(x, y, r, options);
        this.r = r;
        this.playerColor = 'green';
        World.add(world, this.body);
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
        // fill(this.playerColor);
        shape = circle(0, 0, this.r * 2);
        console.log(shape);
        img.mask(shape);
        pop();
    }

    removeBody() {
        World.remove(world, this.body);
    }

}
