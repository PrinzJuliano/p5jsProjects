var world;
var didClick = false;
var addVertexToRail = false;
var railID;
var vertexID;
var clickedSymbol;

var currentRail = 0;

var rails = [];

function setup() {
  createCanvas(800, 600, P2D);

  world = new World();
}

function draw() {
  background(42);

  world.update();

  for (var i = 0; i < rails.length; i++) {
    stroke(rails[i].color);
    strokeWeight(3);
    noFill();
    beginShape();
    for (var j = 0; j < rails[i].vert.length; j++) {
      vertex(rails[i].vert[j].x, rails[i].vert[j].y);
      if (addVertexToRail && i == railID && j == vertexID) {
        vertex(mouseX, mouseY);
      }
    }
    endShape();
  }

  world.draw();

  if (clickedSymbol) {
    push();
    fill(255, 0, 255);
    noStroke();
    ellipse(mouseX, mouseY, 10, 10);
    stroke(0);
    strokeWeight(1);
    line(mouseX, mouseY, clickedSymbol.pos.x, clickedSymbol.pos.y);
    pop();
  }
}

function addRail(v1, v2, col) {

  //create rail
  var rail = {};
  rail.color = col;
  rail.vert = [];
  rail.vert.push(v1.pos.copy());
  rail.vert.push(v2.pos.copy());

  rails.push(rail);
}

function mouseDragged() {
  if (clickedSymbol != null) {
    var endClicked = null;
    for (var i = 0; i < world.stations.length; i++) {
      var d = dist(mouseX, mouseY, world.stations[i].pos.x, world.stations[i].pos.y);
      if (d < world.stations[i].symbol.size) {
        endClicked = world.stations[i];
        
        addRail(clickedSymbol, endClicked, color(255, 0, 255));
        clickedSymbol = endClicked;
        endClicked = null;
        return;
      }
    }
  }
}

function mousePressed() {
  if (mouseButton == LEFT) {
    didClick = true;
    clickedSymbol = null;
    //check which symbol has been clicked
    for (var i = 0; i < world.stations.length; i++) {
      var d = dist(mouseX, mouseY, world.stations[i].pos.x, world.stations[i].pos.y);
      if (d < world.stations[i].symbol.size) {
        clickedSymbol = world.stations[i];
        return;
      }
    }

    //nothing was clicked, check for line operations
    for (var i = 0; i < rails.length; i++) {
      for (var j = 0; j < rails[i].vert.length-1; j++) {
        var d = distToSegment(createVector(mouseX, mouseY), rails[i].vert[j], rails[i].vert[j+1]);
        if (d < 3) {
          addVertexToRail = true;
          railID = i;
          vertexID = j;
        }
      }
    }
  } else if (mouseButton == CENTER) {
    world.stations.push(new Station(null, mouseX, mouseY));
  }

  return false;
}

function mouseReleased() {
  if (mouseButton == LEFT) {
    didClick = false;

    if (clickedSymbol != null) {
      var endClicked = null;
      for (var i = 0; i < world.stations.length; i++) {
        var d = dist(mouseX, mouseY, world.stations[i].pos.x, world.stations[i].pos.y);
        if (d < world.stations[i].symbol.size) {
          endClicked = world.stations[i];

          addRail(clickedSymbol, endClicked, color(random(100, 255)));

          break;
        }
      }

      clickedSymbol = null;
      endClicked = null;
      addVertexToRail = false;
    } 
    if (addVertexToRail) {
      addVertexToRail = false;
      rails[railID].vert.splice(vertexID+1, 0, createVector(mouseX, mouseY));
    }
  }

  return false;
}

function keyPressed() {
  if (key === 'T') {
    for (var i = 0; i < rails.length; i++) {
      var start = rails[i].vert[0];
      var end = rails[i].vert[rails[i].vert.length-1];

      rails[i].vert = [];
      rails[i].vert.push(start);
      rails[i].vert.push(end);
    }
  }
}