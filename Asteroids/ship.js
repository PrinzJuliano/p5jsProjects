/**
 * The player object as ship.
 * 
 * @returns a ship object
 */

function Ship(){
	this.pos = createVector(width/2, height/2);
	this.r = 20;
	
	this.heading = 0;
	this.rotation = 0;
	
	this.vel = createVector(0, 0);
	this.acc = false;
	
	this.draw = function(){
		push();
		stroke(255);
		fill(bgColor);
		strokeWeight(1);
		translate(this.pos.x, this.pos.y);
		rotate(this.heading + HALF_PI);
		triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
		
		pop();
	}
	
	this.boosting = function(boo)
	{
		this.acc = boo;
	}
	
	this.boost = function(){
		var force = p5.Vector.fromAngle(this.heading);
		force.mult(0.1);
		this.vel.add(force);
		this.vel.limit(20);
	}
	
	this.update = function(){
		this.heading += this.rotation;
		
		if(this.acc)
			this.boost();
		
		this.pos.add(this.vel);
		
		this.vel.mult(0.995);
		
		this.edges();
	}
	
	this.hits = function(target)
	{
		var d = p5.Vector.dist(this.pos, target.pos);
		
		return (d < this.r + target.r);
	}
	
	this.edges = function(){
		// constrain the position
		if(this.pos.x < -this.r)
			this.pos.x = width+this.r;
		else if(this.pos.x > width+this.r)
			this.pos.x = -this.r;
		
		if(this.pos.y < -this.r)
			this.pos.y = height+this.r;
		else if(this.pos.y > height+this.r)
			this.pos.y = -this.r;
	}
	
	this.setRotation = function(angle)
	{
		this.rotation = angle;
	}
}