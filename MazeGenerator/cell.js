function Cell(i, j){
	this.i = i;
	this.j = j;
	
	this.visited = false;
	
	this.walls = [true, true, true, true]; //top right bottom left
	
	this.checkNeighbors = function(){
		var neighbors = [];
		
		var top = 		grid[index(i	, j-1	)];
		var right = 	grid[index(i + 1, j		)];
		var bottom = 	grid[index(i	, j + 1	)];
		var left = 		grid[index(i - 1, j		)];
		
		if(top && !top.visited) 		neighbors.push(top);
		if(right && !right.visited) 	neighbors.push(right);
		if(bottom && !bottom.visited) 	neighbors.push(bottom);
		if(left && !left.visited) 		neighbors.push(left);
		
		if(neighbors.length > 0)
		{
			var r = Math.floor(random(0, neighbors.length));
			return neighbors[r];
		}
		else {
			return undefined;
		}
		
	}
	
	this.highlight = function(){
		var x = this.i*w;
		var y = this.j*w;
		
		noStroke();
		fill(0, 255, 0);
		rect(x, y, w, w);
	}
	
	this.draw = function(){
		var x = this.i*w;
		var y = this.j*w;
		
		push();
		stroke(0);
		strokeWeight(2);
		
		if(this.walls[0])
			line(x, y, x+w, y); 	//top
		if(this.walls[1])
			line(x+w, y, x+w, y+w); //right
		if(this.walls[2])
			line(x+w, y+w, x, y+w); //bottom
		if(this.walls[3])
			line(x, y+w, x, y); 	//left
		
		if(this.visited){
			noStroke();
			fill(255, 255, 255);
			rect(x+1, y+1, w, w);
		}
		pop();
	}
}