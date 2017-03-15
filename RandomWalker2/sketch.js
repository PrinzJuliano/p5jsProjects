var pos;

var steps = 25;
var pointSize = 4;

var hue = 1;

var prev;

var points = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    pos = createVector(width/2, height/2);
	prev = pos.copy();
	background(0);
	colorMode(HSB, 360, 100, 100, 255);
	
	//pointSize = (windowWidth + windowHeight) / 128;
	//steps = pointSize * 2 / 3;
	
	hue = 1;
	
	smooth();
	background(0);
}
function draw() {
	
    stroke(hue, 100, 100);
	prev.set(pos);
	
    
	var step = p5.Vector.random2D();
	
	
	var r = random(100);
	if(r < 1)
	{
		step.mult(random(steps, steps*3));
	} else {
		step.setMag(steps/4);
	}
	
	pos.add(step);
	
	pos.x = constrain(pos.x, 0, width);
	pos.y = constrain(pos.y, 0, height);
	
	//stroke(255);
	noFill();
	strokeWeight(pointSize);
    line(pos.x, pos.y, prev.x, prev.y);
	
	hue++;
	if(hue > 360)
		hue = 0;
}

function windowResized(){
	
	resizeCanvas(windowWidth, windowHeight);
	background(0);
}
