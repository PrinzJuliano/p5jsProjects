var slider, sla, slb;

function setup() {
  createCanvas(400, 400);
  //smooth(16);
  slider = createSlider(0, 10, 1, 0.1);
  slider.parent("angle");
  sla = createSlider(0, 300, 100);
  sla.parent("r1");
  slb = createSlider(0, 300, 100);
  slb.parent("r2");
}

function sgn(a){
   return ((a < 0)? (-1) : ((a > 0)? 1 : 0)); 
}

function draw() {
  background(40);
  
  var n = slider.value();
  var a = sla.value();
  var b = slb.value();
  
  translate(width/2, height/2);  
  
  stroke(255);
  strokeWeight(2);
  noFill();
  beginShape();
  for(var angle = 0; angle < TWO_PI; angle+=0.1){
    var x = pow(abs(cos(angle)), 2 / n) * a * sgn(cos(angle));
    var y = pow(abs(sin(angle)), 2 / n) * b * sgn(sin(angle));
    vertex(x, y);
  }
  endShape(CLOSE);
}