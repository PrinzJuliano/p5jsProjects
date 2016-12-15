function Snake() {
	this.x = 0
	this.y = 0
	this.xspeed = 1
	this.yspeed = 0
	this.total = 0;
	this.tail = [];
	
	this.update = function(){
		if(this.total === this.tail.length){
			for(var i = 0; i < this.tail.length-1; i++){
				this.tail[i] = this.tail[i+1]
			}
		}
		this.tail[this.total-1] = createVector(this.x, this.y)
		
		this.x += this.xspeed*scl;
		this.y += this.yspeed*scl;
		
		if(this.x >= width && this.xspeed === 1)
			this.x = 0
		if(this.y >= height-mobileH && this.yspeed === 1)
			this.y = 0
		if(this.x <= -scl && this.xspeed === -1)
			this.x = width
		if(this.y <= -scl && this.yspeed === -1)
			this.y = height-mobileH
		
		this.x = constrain(this.x, 0, width-scl)
		this.y = constrain(this.y, 0, height-mobileH-scl)
		
		
	}
	
	this.death = function(){
		for(var i = 0; i < this.tail.length; i++){
			var pos = this.tail[i]
			var d = dist(this.x, this.y, pos.x, pos.y)
			
			if(d < 1)
			{
				console.log("starting over")
				frameRate(10)
				this.total = 0;
				this.tail = [];
				return true;
			}
		}
	}
	
	this.draw = function(){
		fill(255) //white
		//noStroke()
		for(var i = 0; i < this.tail.length; i++){
			if(this.total===0) break;
			rect(this.tail[i].x, this.tail[i].y, scl, scl)
		}
		
		rect(this.x, this.y, scl, scl)
	}
	
	this.eat = function(pos){
		var d = dist(this.x, this.y, pos.x, pos.y)
		if(d < 1) {
			this.total++
			return true
		}
		else{
			return false
		}
	}
	
	this.dir = function(x,y) {
		if((x === 1 && this.xspeed !== -1) || (x === -1 && this.xspeed !== 1) || x === 0){
			this.xspeed = x
		}
		if((y === 1 && this.yspeed !== -1) || (y === -1 && this.yspeed !== 1) || y === 0){
			this.yspeed = y
		}
	}
}