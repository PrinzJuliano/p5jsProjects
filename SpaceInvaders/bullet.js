function Bullet(x, y){
	this.x = x
	this.y = y
	this.r = 4
	this.toDelete = false
	
	this.draw = function(){
		noStroke()
		fill("#ffffff")
		rect(this.x, this.y, this.r, this.r)
	}
	
	this.move = function(){
		this.y -= 5
	}
	
	this.hit = function(){
		this.toDelete = true
	}
	
	this.hits = function(alien){
		return alien.intersects(this.x, this.y, this.r, this.r)
	}
	
}