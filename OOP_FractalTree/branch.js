function Branch(begin, end){
  this.begin = begin;
  this.end = end;
  this.finished = false;
  
   this.draw = function(){
     stroke(255);
     strokeWeight(2);
     line(begin.x, begin.y, end.x, end.y);
  }
  
  this.branch = function(angle){
    var dir = p5.Vector.sub(this.end, this.begin);
    dir.rotate(angle);
    dir.mult(2/3);
    var newEnd = p5.Vector.add(this.end, dir);
    var b = new Branch(this.end, newEnd);
    return b;
  }
}