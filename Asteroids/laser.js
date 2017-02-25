/**
 * 
 */

function Laser(pos, heading, startVel) {
	this.pos = pos.copy();
	this.vel = p5.Vector.fromAngle(heading);
	this.vel.mult(10);
	this.vel.add(startVel);
	

	this.update = function() {
		this.pos.add(this.vel);
	}

	this.draw = function() {
		push();
		strokeWeight(4);
		stroke(255);
		point(this.pos.x, this.pos.y)
		pop();
	}
	
	this.hits = function(asteroid){
		var distance = p5.Vector.dist(this.pos, asteroid.pos);
		if(distance < asteroid.r)
			return true;
		else
			return false;
	}
	
	this.edges = function(){
		// constrain the position
		if(this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height)
			return true;
		else
			return false;
	}
	
}