class Box {
	
	
	constructor(x, y, z, _r){
		this.pos = createVector(x, y, z)
		this.r = _r
	}
	
	generate(){
		var boxes = []
		for(var x = -1; x < 2; x++)
		{
			for(var y = -1; y < 2; y++)
			{
				for(var z = -1; z < 2; z++)
				{
					var sum = Math.abs(x) + Math.abs(y) + Math.abs(z)
					
					if(sum > 1){
						var newR = this.r/3
						var b = new Box(this.pos.x+ x * newR, this.pos.y + y * newR, this.pos.z + z * newR, newR)
						boxes.push(b)
					}
					
					
					
				}
			}
		}
		return boxes
		
	}
	
	draw(){
		push()
		translate(this.pos.x, this.pos.y, this.pos.z)
		ambientMaterial(250);
		box(this.r)
		pop()
	}
}