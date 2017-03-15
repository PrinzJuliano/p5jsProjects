function Spot(x, y){
	this.x = x;
	this.y = y;
	this.f = 0;
	this.g = 0;
	this.h = 0;
	this.previous;
	this.wall = false;
	
	if(random(1) < 0.3)
		this.wall = true;
	
	this.neighbors = [];
	
	this.draw = function(col){
		fill(col);
		if(this.wall){
			fill(color(0));
		}
		noStroke();
		ellipse(this.x * width/cols, this.y * height/rows, width/cols / 2, height/rows / 2)
		//rect(this.x * width/cols, this.y * height/rows, width/cols-1, height/rows-1);
	}
	
	this.addNeighbors = function(grid){
		if(this.x < cols - 1)
			this.neighbors.push(grid[this.x+1][this.y]);
		if(this.x > 0)
			this.neighbors.push(grid[this.x-1][this.y]);
		if(this.y < rows - 1)
			this.neighbors.push(grid[this.x][this.y+1]);
		if(this.y > 0)
			this.neighbors.push(grid[this.x][this.y-1]);
		
		if(this.x > 0 && this.y > 0)
			this.neighbors.push(grid[this.x-1][this.y-1])
		if(this.x < cols-1 && this.y < rows-1)
			this.neighbors.push(grid[this.x+1][this.y+1])
		if(this.x < cols-1 && this.y > 0)
			this.neighbors.push(grid[this.x+1][this.y-1])
		if(this.x > 0 && this.y < rows-1)
			this.neighbors.push(grid[this.x-1][this.y+1])
	}
}