var alien1_frames = []
var alien2_frames = []

function alienSetup(){
	alien1_frames.push(loadImage("assets/Alien1_01.png"))
	alien1_frames.push(loadImage("assets/Alien1_02.png"))
	alien2_frames.push(loadImage("assets/Alien2_01.png"))
	alien2_frames.push(loadImage("assets/Alien2_02.png"))	
}
function alien(frams, x, y){
	this.x = x
	this.y = y
	this.isHit = false
	this.toDelete = false
	this.anim = new animation(frams, 0, 0)
	this.anim.loop = true
	this.anim.inter = 500
	this.anim.alwaysRender = true
	this.anim.start()
	this.explo; //define when it gets hit
	
	this.xdir = 1
	
	this.shiftDown = function(){
		this.xdir *= -1
		this.y += this.anim.getHeight()
		
		
	}
	
	this.draw = function(){
		push()
		translate(this.x, this.y)
		if(!this.isHit)
			this.anim.draw()
		else{
			this.explo.draw()
			if(this.explo.done())
				this.toDelete = true
		}
		pop()
	}
	
	this.testForEdge = function(){
		if(this.x+this.anim.getWidth() > width || this.x < 0)
			return true
		else
			return false
	}
	
	this.intersects = function(x, y, w, h){
		if(this.x < x+w && this.x+this.anim.getWidth() > x && this.y < y+h && this.y+this.anim.getHeight() > y && !this.isHit)
			return true
		else
			return false
	}
	
	this.move = function(){
		this.x += this.xdir*((level/4) + 1)
	}
	
	this.die = function(){
		this.explo = new explosion(0, 0)
		this.explo.start()
		this.isHit = true
		
	}
	
}