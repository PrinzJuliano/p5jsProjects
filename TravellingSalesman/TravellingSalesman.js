//TODO MAKE THIS AN EVOLUTIONARY EVALUATION WITH DNA AND MUTATIONS
var cities = [];
var totalCities = 5;

var recordDistance;
var bestEver;

var showProcess = true;

function setup() {
  createCanvas(400, 300);
  rectMode(CENTER);
  smooth(8);
  for (var i = 0; i < totalCities; i++) {
    var v = createVector(random(width), random(height)); 
    cities[i] = v;
  }

  recordDistance = calcDistance(cities);
  bestEver = cities.slice();
}

function draw() {
  background(0);
  for (var i = 0; i < cities.length; i++) {
    stroke(255);
    strokeWeight(1);
    fill(255);
    ellipse(cities[i].x, cities[i].y, 8, 8);
  }

  if (showProcess) {
    stroke(255);
    strokeWeight(1);
    noFill();
    beginShape();
    for (var i = 0; i < cities.length; i++) {
      vertex(cities[i].x, cities[i].y);
    }
    endShape();
  }

  stroke(0, 255, 128);
  strokeWeight(4);
  noFill();
  beginShape();
  for (var i = 0; i < bestEver.length; i++) {
    vertex(bestEver[i].x, bestEver[i].y);
  }
  endShape();

  var i = floor(random(cities.length));
  var j = floor(random(cities.length));
  swap(cities, i, j);

  var d = calcDistance(cities);
  if (d < recordDistance) {
    recordDistance = d;
    bestEver = cities.slice();
    console.log(recordDistance);
  }
}

function swap(arr, i, j) {
  var prevI = arr[i];

  arr[i] = arr[j];
  arr[j] = prevI;

  return arr;
}

function calcDistance(points) {
  var sum = 0;
  for (var i = 0; i < points.length-1; i++) {
    var d = p5.Vector.dist(points[i], points[i+1]);
    sum+= d;
  }
  return sum;
}