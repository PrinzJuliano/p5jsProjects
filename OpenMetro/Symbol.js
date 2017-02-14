function Symbol(type){
  this.type = type || floor(random(3)); 
  this.size = 10;
  
  this.draw = function(){
     push();
     if(this.type === 0) {
        rect(-this.size/2, -this.size/2, this.size, this.size);
     } else if(this.type === 1) {
        rotate(radians(45));
        
        rect(-this.size/2, -this.size/2, this.size, this.size);
     } else if(this.type === 2) {
         ellipse(0, 0, this.size, this.size);
     }
     pop();
  }
}