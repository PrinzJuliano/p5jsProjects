/**
 * @author PrinzJuliano
 */

var ship;
var asteroids = [];
var lasers = [];

var score = 0;
var stage = 1;
var newH;

var bgColor;

var inGame = true;
var shownModal = false;

var fontAtari, fontPixel;

function preload(){
	console.log("Loading assets");
	
	fontPixel = loadFont("/fonts/VCR_OSD_MONO_1.001.ttf");
	fontAtari = loadFont("/fonts/old.TTF");
}

function reset(){
	ship = new Ship();
	asteroids = [];
	lasers = [];
	//score = 0;
	//stage = 1;
	inGame = true;
	showModal = false;
	generateNew();
}

function setup() {
	console.log("Setting up game!");
	createCanvas(windowWidth, windowHeight);

	bgColor = color(15, 1, 9);

	reset();
	
	smooth();
}

function generateNew(){
	var amount = floor(random(3, 5)+random(1, 3)*stage);
	
	for (var i = 0; i < amount; i++)
		asteroids.push(new Asteroid());
}

function draw() {
	if (inGame) {
		background(bgColor);
		
		noStroke();
		fill(255);
		textSize(24);
		textFont(fontPixel);
		textAlign(LEFT);
		text("Stage: " + stage + " Score: " + score, 0, height);

		for (var i = asteroids.length - 1; i >= 0; i--) {

			asteroids[i].update();
			asteroids[i].draw();

			if (ship.hits(asteroids[i])) {
				inGame = false;

			}
		}

		for (var i = lasers.length - 1; i >= 0; i--) {
			var remove = false;
			lasers[i].update();
			lasers[i].draw();

			if (lasers[i].edges())
				lasers.splice(i, 1)
			else {

				for (var j = asteroids.length - 1; j >= 0; j--) {
					if (lasers[i].hits(asteroids[j])) {

						score++;
						lasers.splice(i, 1);
						if (asteroids[j].r * 0.5 > 8) {
							var newAsteroids = asteroids[j].breakup();
							asteroids = asteroids.concat(newAsteroids);
						} else {
							score += 10;
						}
						asteroids.splice(j, 1);
						break;
					}
				}
			}

		}

		ship.draw();
		ship.update();
		
		
		//check if every asteroid is gone
		if(asteroids.length === 0){
			if(score > getMinimumScoreForStage(stage) && score <= getMaximumScoreForStage(stage)){
				stage++;
				generateNew();
			}
			else{
				
				score = -9;
				inGame = false;
				alert("You filthy cheater!");
			}
		}
		
	} else {
		background(bgColor);
		
		//translate(width/2, height/2);
		
		noStroke();
		fill(255);
		textFont(fontAtari);
		textSize(24);
		textAlign(CENTER);
		
		var textTopFive = "Top 5:\n";
		for(var i = 0; i < topFive.length; i++)
			textTopFive+=topFive[i].score + ": " + topFive[i].username + "\n";
		
		var displayText = "Game Over!\nFinal Score: " + score + "\n\n" + textTopFive;
		
		var dim = fontAtari.textBounds("A", width/4, height/2);
		
		text(displayText, width/4, height/2-(floor(dim.h)*4), width/2, height/4);
		
		newH = height/2-(floor(dim.h)*4)+height/4+15;

		
		if(mouseX >= width/2-width/8 && mouseX <= width/2-width/8+width/4 && mouseY >= newH && mouseY <= newH+height/4-15)
			fill(255);
		else
			fill(255, 100);
		rect(width/2-width/8, newH, width/4, height/4-15);
		
		fill(0);
		textSize(64);
		text("Play new Game", width/2-width/8, newH, width/4, height/4-15);
		

		if(!shownModal)
		{
			showUploadModal();
			shownModal = true;
		}
	}

}

function mousePressed(){
	if(shownModal)
	{
		if(mouseX >= width/2-width/8 && mouseX <= width/2-width/8+width/4 && mouseY >= newH && mouseY <= newH+height/4-15)
		{
			reset();
		}
	}
}

function keyPressed() {
	if (key.toLowerCase() == 'd' || keyCode == RIGHT_ARROW) {
		ship.setRotation(0.1);
	} else if (key.toLowerCase() == 'a' || keyCode == LEFT_ARROW) {
		ship.setRotation(-0.1);
	} else if (key.toLowerCase() == 'w' || keyCode == UP_ARROW) {
		ship.boosting(true);
	} else if (key == ' ') {
		lasers.push(new Laser(ship.pos, ship.heading, ship.vel));
	}
}

function keyReleased() {
	if (key.toLowerCase() == 'd' || keyCode == RIGHT_ARROW
			|| key.toLowerCase() == 'a' || keyCode == LEFT_ARROW) {
		ship.rotation = 0;
	}
	if (key.toLowerCase() == 'w' || keyCode == UP_ARROW) {
		ship.boosting(false);
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

