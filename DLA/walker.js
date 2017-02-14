function Walker(x, y, st) {
  this.radius = 5;
  this.speed = 3;
  if(x != undefined && y != undefined){
     this.pos = createVector(x, y); 
  } else {
    this.pos = randomPoint();
  }

  this.stuck = st || false;

  this.walk = function() {
    var vel = p5.Vector.random2D();
    vel.mult(this.speed);
    this.pos.add(vel);
    this.pos.x = constrain(this.pos.x, 0, width);
    this.pos.y = constrain(this.pos.y, 0, height);
  }

  this.checkStuck = function(others) {
    for (var i = 0; i < others.length; i++) {
      var d  = distSq(others[i].pos, this.pos);

      if (d < this.radius * others[i].radius * 4) {
        this.stuck = true;
        return true;
      }
    }
    return false;
  }
  
  this.draw = function(col){
    noStroke();
    if(this.stuck){
       fill(col, 100, 100); 
       
    } else {
       fill(0, 0, 100); 
    }
    ellipse(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2);
  }
}

function randomPoint(){
  //var i = floor(random(4));
  
  //if(i === 0){
    var x = random(width);
    return createVector(x, 0);
  //} else if(i === 1) {
  //  var x = random(width);
  //  return createVector(x, height);
  //} else if(i === 2) {
  //  var y = random(height);
  //  return createVector(0, y);
  //} else {
  //  var y = random(height);
  //  return createVector(width, y);
  //}
}