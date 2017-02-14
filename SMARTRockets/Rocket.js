function Rocket(dna) {
  this.pos = G_STARTPOINT.copy();
  this.vel = createVector();
  this.acc = createVector();

  this.dna = dna || new DNA();

  this.fitness = 0;

  this.completed = false;
  this.crashed = false;
  this.completedAt = 0;

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.update = function() {

    var d = dist(this.pos.x, this.pos.y, G_TARGET.x, G_TARGET.y);
    if (d < 10 && !this.completed) {
      this.completed = true;
      this.pos = G_TARGET.copy();
      this.completedAt = G_COUNT;
    }
    
    //check if out of bounds
    if(this.pos.x < 0 || this.pos.x > width){
       this.crashed = true; 
    }
    if(this.pos.y < 0 || this.pos.y > height){
       this.crashed = true; 
    }
    
    //check if crashed in any obstacles
    for(var i = 0; i < G_OBSTACLES.length; i+=2){
        var xmin = G_OBSTACLES[i].x;
        var xmax = G_OBSTACLES[i].x + G_OBSTACLES[i+1].x;
        var ymin = G_OBSTACLES[i].y;
        var ymax = G_OBSTACLES[i].y + G_OBSTACLES[i+1].y;
        if(this.pos.x >= xmin && this.pos.x <= xmax && this.pos.y >= ymin && this.pos.y <= ymax){
           this.crashed = true;
           break;
        }
    }

    if (!this.completed && !this.crashed) {
      this.applyForce(this.dna.genes[G_COUNT]);
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.vel.limit(4);
    }
  }

  this.draw = function() {
    push();
    noStroke();
    fill(255, 150);
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    rectMode(CENTER);
    rect(0, 0, 25, 5);
    pop();
  }

  this.calcFitness = function() {
    var d = dist(this.pos.x, this.pos.y, G_TARGET.x, G_TARGET.y);
    this.fitness = map(d, 0, G_MAXDIST, G_MAXDIST, 0);
    if(this.completed){
      this.fitness += map(this.completedAt, 0, G_LIFESPAN, G_LIFESPAN, 0);
      this.fitness *= G_REACHED_TARGET_MULTIPLICATOR;
      
    }
    if(this.crashed){
        this.fitness /= 10;
    }
  }
}