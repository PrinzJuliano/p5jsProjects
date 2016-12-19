function Cell(pos, r, c){
	
	if(pos)
		this.pos = pos.copy();
	else 	
		this.pos =  createVector(random(width), random(height));
	
	this.r = r || 20;
	this.c = c || color(random(50, 255), random(50, 255), random(50, 255), 150);
	
	
	this.move = function(){
		var vel = p5.Vector.random2D();
		
		this.pos.add(vel)
		this.pos.x = constrain(this.pos.x, 0, width)
		this.pos.y = constrain(this.pos.y, 0, height)
	}
	
	this.mitosis = function(){
		this.pos.x += random(-this.r*2, this.r*2)
		this.pos.y += random(-this.r, this.r)
		var cell = new Cell(this.pos, this.r/2, this.c);
		return cell;
	}
	
	this.draw = function(){
		push();
		noStroke()
		fill(this.c)
		ellipse(this.pos.x, this.pos.y, this.r, this.r);
		pop();
		
	}
	
	this.clicked = function(x, y){
		var distance = dist(this.pos.x, this.pos.y, x, y);
		
		if(distance < this.r){
			return true;
		} else {
			return false;
		}
	}
}