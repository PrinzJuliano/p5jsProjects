function Ship(img){
	this.xpos = 400
	this.ypos = 0
	this.xdir = 0
	this.isHit = false
	this.toDelete = false

	this.explo;
	
	
	this.img = img
	
	
	this.draw = function(){
		this.ypos = height-mobileH-this.img.height
		if(!this.isHit)
			image(this.img, this.xpos, height-mobileH-this.img.height)
		else
		{
			this.explo.draw()
			if(this.explo.done())
				this.toDelete = true
		}
	}
	
	this.die = function(){
		this.explo = new explosion(this.xpos, height-mobileH-this.img.height)
		this.explo.start()
		this.isHit = true
		
	}
	
	this.setDir = function(dir){
		this.xdir = dir
	}
	
	this.move = function(){
		this.xpos += this.xdir*5
		if(this.xpos < 0)
			this.xpos = 0
		if(this.xpos > width-this.img.width)
			this.xpos = width-this.img.width
	}
}