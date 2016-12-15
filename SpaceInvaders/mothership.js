var mothership_frames = []
function setupMothership(){
	mothership_frames.push(loadImage("assets/Mothership_01.png"))
	mothership_frames.push(loadImage("assets/Mothership_02.png"))
	mothership_frames.push(loadImage("assets/Mothership_03.png"))
	mothership_frames.push(loadImage("assets/Mothership_04.png"))
	mothership_frames.push(loadImage("assets/Mothership_05.png"))
	mothership_frames.push(loadImage("assets/Mothership_06.png"))
	mothership_frames.push(loadImage("assets/Mothership_07.png"))
	mothership_frames.push(loadImage("assets/Mothership_08.png"))
	mothership_frames.push(loadImage("assets/Mothership_09.png"))
}
function mothership(){
	this.x = -100
	this.y = 10
	this.speed = 5
	this.explo;
	this.isHit = false
	this.toDelete = false
	
	this.anim = new animation(mothership_frames, 0, 0)
	this.anim.loop = true
	this.anim.inter = 100
	this.anim.alwaysRender = true
	this.anim.start()
	
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
	
	this.intersects = function(x, y, w, h){
		if(this.x < x+w && this.x+this.anim.getWidth() > x && this.y < y+h && this.y+this.anim.getHeight() > y && !this.isHit)
			return true
		else
			return false
	}
	
	this.testForEdge = function(){
		if(this.x > width)
			return true
		else
			return false
	}
	
	this.move = function(){
		this.x += this.speed*((level/4) + 1)
	}
	
	this.die = function(){
		this.explo = new explosion(0, 0)
		this.explo.start()
		this.isHit = true
		
	}
}