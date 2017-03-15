function Boundary(x, y, w, h) {
	
	var options = {
		isStatic: true
	}
	this.w = w;
	this.h = h;
	this.body = Bodies.rectangle(x, y, w, h, options);
	World.add(world, this.body);
	
}

Boundary.prototype.draw = function(){
	push();
	fill(255);
	stroke(255);
	var pos = this.body.position;
	translate(pos.x, pos.y);
	rectMode(CENTER);
	rect(0, 0, this.w, this.h);
	pop();
}