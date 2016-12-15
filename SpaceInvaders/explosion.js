var explosion_frames = []

function explosionSetup(){
	explosion_frames.push(loadImage("assets/Explosion_01.png"))
	explosion_frames.push(loadImage("assets/Explosion_02.png"))
	explosion_frames.push(loadImage("assets/Explosion_03.png"))
	explosion_frames.push(loadImage("assets/Explosion_04.png"))	
}

function explosion(x, y){
	
	this.anim = new animation(explosion_frames, x, y)
	
	this.start = function(){
		this.anim.start()
	}
	
	this.draw = function(){
		this.anim.draw()
	}
	
	this.done = function(){
		return this.anim.done
	}
}