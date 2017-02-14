var tree = [];
var walkers = [];
var total = 1000;
var iterations = 200;
var hyp;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB);
  smooth(8);
  hyp = sqrt((width/2)*(width/2)+(height/2)*(height/2));

    tree.push(new Walker(width/2, height/2, true));
  for (var i = 0; i < total; i++) {
    walkers[i] = new Walker();
  }
}

function draw() {
  background(0);

  for (var i = 0; i < tree.length; i++) {
    //distance from center to outside
    var d = dist(tree[i].pos.x, tree[i].pos.y, width/2, height/2)/hyp;
    var col = map(d, 0, 1, 0, 360);
    tree[i].draw(col%360);
  }
  for (var i = 0; i < walkers.length; i++) {
    walkers[i].draw();
  }

  for (var n = 0; n < iterations; n++) {
    for (var i = 0; i < walkers.length; i++) {
      walkers[i].walk();


      if (walkers[i].checkStuck(tree)) {
        tree.push(walkers[i]);
        walkers.splice(i, 1);
      }
    }
  }

  //while (walkers.length < total) {
  //  walkers.push(new Walker());
  //}

  if (walkers.length == 0) {
    console.log("done");
  } else {
    console.log(round(frameRate()));
  }
}

function distSq(a, b) {
  var dx = b.x - a.x;
  var dy = b.y - a.y;
  return dx * dx + dy * dy;
}