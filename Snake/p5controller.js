var s;
var scl = 20; //scale
var food;
var highscore = parseInt(getCookie("highscore")) || 0;
var point;
var point2;

function setup(){
	var canvas = createCanvas(600, 600)
	canvas.parent("frame")
	s = new Snake()
	frameRate(10)
	food = pickLocation()
	touch1 = touch2 = createVector(0, 0)
	point = createVector(0,0)
	point2 = createVector(0,0)
}

function pickLocation(){
	var cols = floor(width/scl)
	var rows = floor(height/scl)
	
	var v = createVector(floor(random(cols)), floor(random(rows)))
	v.mult(scl)
	return v
}

function draw(){
	background('#424242')
	s.death()
	s.update()
	s.draw()
	
	if(s.eat(food)){
		food = pickLocation()
		frameRate(10+s.total)
	}
	
	fill(255, 0, 100)
	rect(food.x, food.y, scl, scl)
	
	$('#highscore').text("Highscore: " + ((highscore > s.total)?highscore:s.total));
	if(s.total > highscore){
		setCookie("highscore", s.total, 300, "/Snake")
		highscore = s.total
	}
	$('#currentScore').text("Your score: " + s.total);
}

function keyPressed(){
	if(keyCode === UP_ARROW)
	{
		s.dir(0, -1)
	} else if(keyCode === DOWN_ARROW)
	{
		s.dir(0, 1)
	} else if(keyCode === RIGHT_ARROW)
	{
		s.dir(1, 0)
	} else if(keyCode === LEFT_ARROW)
	{
		s.dir(-1, 0)
	}
}
function touchStarted(){
	point = point2 = touches[0]
	dir = [0,0]
}
function touchMoved(){
	point2 = touches[0]
}
function touchEnded(){
	dir = calc()
	s.dir(dir[0], dir[1])
}
function mousePressed(){
	point = createVector(mouseX, mouseY)
	point2 = createVector(mouseX, mouseY)
	dir = [0,0]
}
function mouseDragged(){
	point2 = createVector(mouseX, mouseY)
}
function mouseReleased(){
	dir = calc()
	if(!(dir[0] === 0 && dir[1] === 0))
		s.dir(dir[0], dir[1])
}

function calc(){
	var distanceX = point.x - point2.x
	var distanceY = point.y - point2.y
	
	if(Math.abs(distanceX) > Math.abs(distanceY)){
		if(distanceX > 0)
			return [-1, 0] //left
		else
			return [1, 0] //right
	}
	if(Math.abs(distanceX) < Math.abs(distanceY)){
		if(distanceY > 0)
			return [0, -1] // down
		else
			return [0, 1] //up
	}
	
	return [0,0]
}



