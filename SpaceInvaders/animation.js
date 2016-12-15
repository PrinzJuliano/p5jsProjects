function animation(frms, x, y){
	this.x = x
	this.y = y
	this.inter = 100
	this.done = false
	this.shouldStart = false
	this.alwaysRender = false
	this.loop = false
	this.frms = frms

	this.current = 0
	
	this.draw = function(){
		if(this.alwaysRender || (this.shouldStart && this.done === false))
			image(this.frms[this.current], this.x, this.y)
	}
	
	this.start = function(){
		this.shouldStart = true
		var that = this
		setTimeout(function(){
			that.nextFrame()
		}, this.inter)
	}
	
	this.getWidth = function(){
		return this.frms[this.current].width
	}
	
	this.getHeight = function(){
		return this.frms[this.current].height
	}
	
	this.nextFrame = function(){
		this.current++
		
		if(this.current >= this.frms.length)
		{
			if(this.loop)
				this.current = 0
			else {
				this.done = true
			}
		}
		if(!this.done){
			var that = this
			setTimeout(function(){
				that.nextFrame()
			}, this.inter)
		}
	}
}