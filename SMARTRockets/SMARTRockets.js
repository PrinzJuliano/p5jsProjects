//SETTINGS
var   G_AMOUNT_OF_ROCKETS = 500;
var   G_LIFESPAN = 200;
var   G_COUNT = 0;
var   G_TARGET;
var   G_MAXDIST;
var   G_STARTPOINT;
var   G_MUTATION_RATE = 3; //1%
var   G_MAX_FORCE = 0.2;
var   G_REACHED_TARGET_MULTIPLICATOR = 10;

//OBSTACLES
var   G_OBSTACLES = [];

//Objects
var   population;
var   frameR;
var   lifeP;
var   gen1P;
var   gen2P;

function setup() {
  frameR = createP('');
  lifeP = createP('');

  createCanvas(400, 300);

  G_TARGET = createVector(width/2, 30);
  G_STARTPOINT = createVector(width/2, height);
  
  G_MAXDIST = dist(G_TARGET.x, G_TARGET.y, G_STARTPOINT.x, G_STARTPOINT.y);
  
  createObstacle(50, 10, width-100, 10);
  createObstacle(60, 10, 10, 50);
  createObstacle(width-70, 10, 10, 50);
  
  createObstacle(70, 60, 10, 50);
  createObstacle(width-80, 60, 10, 50);
  
  createObstacle(150, 110, 180, 10);
  

  population = new Population();
  gen1P = createP('');
  gen2P = createP('');
  
  //state the facts
  createP("Amount of rockets: " + G_AMOUNT_OF_ROCKETS);
  createP("Lifespan: " + G_LIFESPAN);
  createP("Mutation Rate: " + G_MUTATION_RATE + "%");
  createP("Vector Force Multiplicator: " + G_MAX_FORCE);
  createP("Maximum Fitness: " + (G_MAXDIST+G_LIFESPAN));
}

function createObstacle(x, y, w, h){
   G_OBSTACLES.push(createVector(x, y));
   G_OBSTACLES.push(createVector(w, h));
}

function draw() {

  background(42);

  population.run();

  noStroke();
  fill(255);
  ellipse(G_TARGET.x, G_TARGET.y, 16, 16);
  
  push();
  stroke(255);
  for(var i = 0; i < G_OBSTACLES.length; i+=2){
     rect(G_OBSTACLES[i].x, G_OBSTACLES[i].y, G_OBSTACLES[i+1].x, G_OBSTACLES[i+1].y);
  }
  pop();

  if (G_COUNT >= G_LIFESPAN) {
    population.evaluate();
    population.selection();
    G_COUNT = 0;
  }

  G_COUNT++;
  lifeP.html('life ticks: ' + G_COUNT);

  frameR.html('FPS: ' + floor(frameRate()));
}