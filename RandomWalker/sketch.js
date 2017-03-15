var pos;

var steps = 9;
var pointSize = 10;

var hue = 1;

function setup() {
    createCanvas(windowWidth, windowHeight);
    pos = createVector(width/2, height/2);
	background(0);
	colorMode(HSB, 360, 100, 100, 255);
	
	pointSize = (windowWidth + windowHeight) / 128;
	steps = pointSize * 2 / 3;
	
	hue = 1;
}
function draw() {
    
    //stroke(hue, 100, 100, 10);
	
	noStroke();
	fill(hue, 100, 100, 10)
    //strokeWeight(pointSize);
    //point(x, y);
	
	rect(pos.x, pos.y, pointSize, pointSize);
    var r = floor(random(4));
    switch (r) {
        case 0:
            {
                pos.x -= steps;
            }
            break;
        case 1:
            {
                pos.x += steps;
            }
            break;
        case 2:
            {
                pos.y -= steps;
            }
            break;
        case 3:
            {
                pos.y += steps;
            }
            break;
    }
	
	pos.x = constrain(pos.x, 0, width);
	pos.y = constrain(pos.y, 0, height);
	
	hue++;
	if(hue > 360)
		hue = 0;
}

function windowResized(){
	
	resizeCanvas(windowWidth, windowHeight);
	background(0);
}