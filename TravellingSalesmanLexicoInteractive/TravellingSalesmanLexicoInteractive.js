var cities = [];
//var totalCities = 8;

var order = [];

var totalPermutations;
var count = 0;

var recordDistance;
var bestEver;

var done = false;
var begin = false;

function setup() {
  createCanvas(400, 300);
  rectMode(CENTER);
  smooth(8);
  imageSmoothingEnabled = true;
}

function initAll() {
  resizeCanvas(400, 600);
  
  for(var i = 0; i < cities.length; i++)
  {
     order[i] = i;
  }
  
  recordDistance = calcDistance(cities, order);
  console.log("Initial: ", recordDistance);
  bestEver = order.slice();

  totalPermutations = factorial(cities.length); 
  begin = true;
}

function draw() {
  background(0);
  if (begin) {
    for (var i = 0; i < cities.length; i++) {
      stroke(255);
      strokeWeight(1);
      fill(255);
      ellipse(cities[i].x, cities[i].y, 8, 8);
    }

    stroke(0, 255, 128);
    strokeWeight(4);
    noFill();
    beginShape();
    for (var i = 0; i < order.length; i++) {
      var n = bestEver[i];
      vertex(cities[n].x, cities[n].y);
    }
    endShape();

    if (!done) {
      push();
      translate(0, height/2);
      stroke(255);
      strokeWeight(1);
      noFill();
      beginShape();
      for (var i = 0; i < order.length; i++) {
        var n = order[i];
        vertex(cities[n].x, cities[n].y);
      }
      endShape();
      pop();

      var d = calcDistance(cities, order);
      if (d < recordDistance) {
        recordDistance = d;
        bestEver = order.slice();
      }

      nextOrder();
    }

    var percent = floor(count / totalPermutations * 10000)/100;
    stroke(20, 255, 255);
    strokeWeight(1);
    fill(255);
    textSize(20);
    text(percent + "% completed", 20, height - 20);
  } else {
    for (var i = 0; i < cities.length; i++) {
      stroke(255);
      strokeWeight(1);
      fill(255);
      ellipse(cities[i].x, cities[i].y, 8, 8);
    }
  }
}

function mousePressed() {
  //check if a city is already present
  if (!begin) {
    var found = false;
    for (var i = cities.length - 1; i > 0; i--) {
      var d = dist(mouseX, mouseY, cities[i].x, cities[i].y);
      if (d <= 8) {
        cities.splice(i, 1);
        found = true;
      }
    }

    if (!found) {
      cities.push(createVector(mouseX, mouseY));
    }
  }
}

function keyPressed() {
  if (keyCode == ENTER && !begin) {
    noLoop();
    initAll();
    loop();
  }
}

function swap(arr, i, j) {
  var temp = arr[i];

  arr[i] = arr[j];
  arr[j] = temp;
}

function calcDistance(points, order) {
  var sum = 0;
  for (var i = 0; i < order.length-1; i++) {
    var cityAIndex = order[i];
    var cityA = points[cityAIndex];
    var cityBIndex = order[i+1];
    var cityB = points[cityBIndex];

    var d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
    sum += d;
  }
  return sum;
}

function nextOrder() {
  //Find the largest I which holds true to p[i] < p[i+1]
  var largestI = -1;

  for (var i = 0; i < order.length-1; i++) {
    if (order[i] < order[i+1]) {
      largestI = i;
    }
  }

  if (largestI === -1) {
    console.log("done");
    var so = "";
    for (var i = 0; i < bestEver.length; i++)
      so+=bestEver[i] + " ";
    so.trim();
    console.log("Best Order:", so, "with max distance:", recordDistance);
    done = true;
  }


  //Find the largest J which is smaller then p[largetI]
  var largestJ = -1;
  for (var j = 0; j < order.length; j++) {
    if (order[largestI] < order[j]) {
      largestJ = j;
    }
  }

  //SWAP I and J
  swap(order, largestI, largestJ);

  //REVERSE
  var endArray = order.splice(largestI + 1);
  endArray.reverse();
  order = order.concat(endArray);

  count++;
}

function factorial(n) {
  if (n === 1)
    return 1;
  else if (n < 1)
    return -1;
  else {
    return n * factorial(n -1);
  }
}