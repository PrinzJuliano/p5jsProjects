function Branch(parent, pos, dir){
   this.position = pos;
   this.parent = parent;
   this.direction = dir;
   this.count = 0;
   this.originalDirection = dir.copy();
   this.len = 5;
   
   this.reset = function(){
      this.direction = this.originalDirection.copy();
      this.count = 0;
   }
   
   this.next = function(){
	  var rand = p5.Vector.random2D();
      rand.setMag(0.3);
	  this.direction.add(rand); 
      this.direction.normalize();
      var newDir = p5.Vector.mult(this.direction, this.len);
      var newPos = p5.Vector.add(this.position, newDir);
      var nextBranch = new Branch(this, newPos, this.direction.copy()); 
      return nextBranch;
   }
   
   this.draw = function(){
     if(this.parent != null){
       line(this.position.x, this.position.y, this.parent.position.x, this.parent.position.y);
     }
   }
}