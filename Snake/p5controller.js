var s;
var scl = 20; //scale
var food;
var highscore = parseInt(getCookie("highscore")) || 0;
var mobile = getCookie("mobileInput")=='true'
var mobileH = (mobile?400:0)
var infoVisible = true;
function setup(){
	var canvas = createCanvas(600, 600+mobileH)
	canvas.parent("frame")
	s = new Snake()
	frameRate(10)
	food = pickLocation()
}

function pickLocation(){
	var cols = floor(width/scl)
	var rows = floor((height-mobileH)/scl)
	
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
	
	if(mobile)
	{
		push()
		stroke("white")
		strokeWeight(5)
		line(0, height-mobileH, width, height-mobileH)
		pop()
		
		push()
		fill(255,255,255)
		rectMode(CENTER)
		rect(width/2, height-mobileH/2-100, 100, 100) //up
		rect(width/2-100, height-mobileH/2, 100, 100) //left
		rect(width/2+100, height-mobileH/2, 100, 100) //right
		rect(width/2, height-mobileH/2+100, 100, 100) //down
		pop()
	}
}

function keyPressed(){
	if(keyCode === UP_ARROW)
	{
		s.dir(0, -1)
		return false;
	} else if(keyCode === DOWN_ARROW)
	{
		s.dir(0, 1)
		return false;
	} else if(keyCode === RIGHT_ARROW)
	{
		s.dir(1, 0)
		return false;
	} else if(keyCode === LEFT_ARROW)
	{
		s.dir(-1, 0)
		return false;
	}
	
}

function mousePressed(){
	if(mobile)
	{
		if(mouseX >= width/2-50 && mouseX <= width/2+50 && mouseY >= height-mobileH/2-150 && mouseY <= height-mobileH/2-50)
			s.dir(0, -1)
		if(mouseX >= width/2-50 && mouseX <= width/2+50 && mouseY >= height-mobileH/2+50 && mouseY <= height-mobileH/2+150)
			s.dir(0, 1)
		if(mouseX >= width/2-150 && mouseX <= width/2-50 && mouseY >= height-mobileH/2-50 && mouseY <= height-mobileH/2+50)
			s.dir(-1, 0)
		if(mouseX >= width/2+50 && mouseX <= width/2+150 && mouseY >= height-mobileH/2-50 && mouseY <= height-mobileH/2+50)
			s.dir(1, 0)
	}
}

function touchStarted(){
	if(mobile){
		if(touches[0].x >= width/2-50 && touches[0].x <= width/2+50 && touches[0].y >= height-mobileH/2-150 && touches[0].y <= height-mobileH/2-50)
			s.dir(0, -1)
		if(touches[0].x >= width/2-50 && touches[0].x <= width/2+50 && touches[0].y >= height-mobileH/2+50 && touches[0].y <= height-mobileH/2+150)
			s.dir(0, 1)
		if(touches[0].x >= width/2-150 && touches[0].x <= width/2-50 && touches[0].y >= height-mobileH/2-50 && touches[0].y <= height-mobileH/2+50)
			s.dir(-1, 0)
		if(touches[0].x >= width/2+50 && touches[0].x <= width/2+150 && touches[0].y >= height-mobileH/2-50 && touches[0].y <= height-mobileH/2+50)
			s.dir(1, 0)
	}
}

$(document).ready(function(){
	$('#mobile').prop('checked', mobile)
});

function toggleInformation(btn){
	if(infoVisible)
	{
		$('#informationList').css("display", "none");
		$(btn).html('<span class="glyphicon glyphicon-resize-full"></span>');
	}
	else {
		$('#informationList').css("display", "block");
		$(btn).html('<span class="glyphicon glyphicon-resize-small"></span>');
	}
	
	infoVisible = !infoVisible
}

