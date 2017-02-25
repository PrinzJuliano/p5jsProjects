/**
 * Asteriods are the main obstacle to deal with.
 * 
 * @returns An asteriod
 */

function Asteroid(pos, r) {
	if(pos)
		this.pos = pos.copy();
	else
		this.pos = createVector(random(width), random(height));
	this.r = r || floor(random(20, 50));
	this.vel = p5.Vector.random2D();
	this.vertecies = floor(random(5, 15));
	this.offset = [];

	for (var i = 0; i < this.vertecies; i++)
		this.offset[i] = random(-this.r*0.5, this.r*0.5);

	this.update = function() {
		this.pos.add(this.vel);
		this.edges();
	}

	this.draw = function() {
		push();
		translate(this.pos.x, this.pos.y);
		stroke(255);
		strokeWeight(1);
		noFill();
		// ellipse(0, 0, this.r*2, this.r*2);
		beginShape();
		for (var i = 0; i < this.vertecies; i++) {
			var angle = map(i, 0, this.vertecies, 0, TWO_PI);
			var r = (this.r + this.offset[i]);

			var x = r * cos(angle);
			var y = r * sin(angle);
			vertex(x, y);
		}
		endShape(CLOSE);
		pop();
	}
	
	this.edges = function() {
		// constrain the position
		if (this.pos.x < -this.r)
			this.pos.x = width + this.r;
		else if (this.pos.x > width + this.r)
			this.pos.x = -this.r;

		if (this.pos.y < -this.r)
			this.pos.y = height + this.r;
		else if (this.pos.y > height + this.r)
			this.pos.y = -this.r;
	}
	
	this.breakup = function(){
		var newA = [];
		newA[0] = new Asteroid(this.pos, this.r*0.5);
		newA[1] = new Asteroid(this.pos, this.r*0.5);
		
		return newA;
	}
}