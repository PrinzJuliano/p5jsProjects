function Particle(x, y, r, isStatic) {
	this.r = r;
	
	var options = {
		isStatic: isStatic || false,
		restitution: 0.5,
		friction: 0,
		density: 1
	}
	
	this.hue = random(0, 360);
	
	this.body = Bodies.circle(x + random(-0.5, 0.5), y, r, options);
	World.add(world, this.body);
	
}

Particle.prototype.offScreen = function(){
	var x = this.body.position.x;
	
	return (x < -50 || x > width + 50);
}

Particle.prototype.draw = function(){
	push();
	if(this.body.isStatic){
		fill(120, 100, 100);
		stroke(120, 100, 100);
	} else {
		fill(this.hue, 100, 100);
		stroke(this.hue, 100, 100);
	}
	var pos = this.body.position;
	translate(pos.x, pos.y);
	
	ellipse(0, 0, this.r * 2);
	pop();
}