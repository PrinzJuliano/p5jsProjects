//var poly;
var polys = [];
var angle = 60;
var delta = 10;

var deltaSlider;
var angleSlider;

function setup() {
  createCanvas(400, 400);
  smooth(16);
  background(21);

  deltaSlider = createSlider(0, 25, 10);
  deltaSlider.parent("delta");
  angleSlider = createSlider(0, 90, 60);
  angleSlider.parent("angle");

  /*
  var inc = 50;
   var poly = new Polygon();
   var startPoint = createVector(inc*1.5, 0);
   
   poly.addVertex(startPoint.x, startPoint.y);
   
   var offset = createVector(inc, 0);
   offset.rotate(radians(60));
   
   var next = p5.Vector.add(startPoint, offset);
   poly.addVertex(next.x, next.y);
   
   offset.rotate(radians(60));
   var next = p5.Vector.add(next, offset);
   poly.addVertex(next.x, next.y);
   
   offset.rotate(radians(60));
   var next = p5.Vector.add(next, offset);
   poly.addVertex(next.x, next.y);
   
   offset.rotate(radians(60));
   var next = p5.Vector.add(next, offset);
   poly.addVertex(next.x, next.y);
   
   offset.rotate(radians(60));
   var next = p5.Vector.add(next, offset);
   poly.addVertex(next.x, next.y);
   
   poly.close();
   
   polys.push(poly);
   */
   createRectPolys();
}



function createRectPolys() {
  var inc = 100;
  for (var x = 0; x < width; x+= inc) {
    for (var y = 0; y < height; y+= inc) {

      var poly = new Polygon();
      poly.addVertex(x, y);
      poly.addVertex(x + inc, y);
      poly.addVertex(x + inc, y + inc);
      poly.addVertex(x, y + inc);
      poly.close();

      polys.push(poly);
    }
  }
}

function draw() {
  background(21);
  angle = angleSlider.value();
  delta = deltaSlider.value();
  for (var i = 0; i < polys.length; i++) {
    polys[i].hankin();
    polys[i].draw();
  }
}