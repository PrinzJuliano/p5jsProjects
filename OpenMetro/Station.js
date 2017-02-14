function Station(type, x, y) {
  this.pos = createVector(x || random(width), y || random(height));

  //set the symbolic representation of the station

  this.symbol = new Symbol(type);
  this.strokeColor = color(0);
  this.fillColor = color(255);

  this.draw = function() {
    push();
    fill(this.fillColor);
    stroke(this.strokeColor);
    strokeWeight(2);
    translate(this.pos.x, this.pos.y);
    this.symbol.draw();
    
    pop();
  }
  
  this.destroy = function(){
    
  }

  this.update = function() {
  }
}