var laser_frames = []
function setupLaser(){
	laser_frames.push(loadImage("assets/Laser_01.png"))
	laser_frames.push(loadImage("assets/Laser_02.png"))
}

function laser(x, y, speed){
	this.speed = speed
	this.x = x
	this.y = y
	this.anim = new animation(laser_frames, 0, 0)
	this.anim.loop = true
	this.anim.inter = 500
	this.anim.alwaysRender = true
	this.anim.start()

	this.toDelete = false
	
	this.draw = function(){
		push()
		translate(this.x, this.y)
		this.anim.draw()
		pop()
	}
	
	this.move = function(){
		this.y += this.speed
	}
	
	this.hit = function(){
		this.toDelete = true
	}
	
	this.hits = function(x, y, w, h){
		if(this.x < x+w && this.x+this.anim.getWidth() > x && this.y < y+h && this.y+this.anim.getHeight() > y)
			return true
		else
			return false
	}
}