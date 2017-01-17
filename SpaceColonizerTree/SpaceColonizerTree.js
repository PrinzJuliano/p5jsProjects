var tree;
var max_dist = 100;
var min_dist = 10;

function setup() {
  createCanvas(800, 800);
  colorMode(RGB);
  tree = new Tree();
  
}

function draw() {
  background(0);
  
  tree.draw();
  tree.grow();
}