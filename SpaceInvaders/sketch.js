var ship;
var expl_anim;
var enemies = [];
var bullets = [];
var lasers = [];
var score = 0
var highscore = 0
var edgeCount = 0
var overInsertCoin = false

var mobile = getCookie("mobileInput")==='true'
var mobileH = (mobile)?200:0;

var mother = null
var drawMother = false
var spawnedMother = false
var spawnMother = false

var nextLevel = true

var player_img;

var level = 0

function setup(){
	var canvas = createCanvas(800, 600+mobileH)
	canvas.parent("frame")
	frameRate(60)
	
	player_img = loadImage("assets/Player.png")
	
	
	//load highscore
	highscore = parseInt(getCookie("highscore")) || 0;
	if(highscore === 0)
		setCookie("highscore", "0", 365, "/SpaceInvaders")
	
	//setup all the animations
	alienSetup()
	explosionSetup()
	setupMothership()
	setupLaser()
	
	//show score
	$('#score').text("Score: " + score)
	$('#highscore').text("Highscore: " + highscore)
	
	resetGame()
}

function resetGame(){
	enemies = []
	bullets = []
	lasers = []
	edgeCount = 0
	mother = null
	drawMother = null
	spawnedMother = false
	spawnMother = false
	ship = new Ship(player_img)
	
	//create two rows each of identical aliens
	for(var x = 0; x < 10; x++){
		for(var y = 0; y < 2; y++){
			enemies.push(new alien(alien1_frames, x*60+50, y*50+50))
		}
	}
	
	for(var x = 0; x < 10; x++){
		for(var y = 0; y < 2; y++){
			enemies.push(new alien(alien2_frames, x*60+50, y*50+150))
		}
	}
	
	nextL()
}

function nextL(){
	if(nextLevel)
	{
		nextLevel = false
		level++;
		setTimeout(nextL, 5000)
	}
	else{
		nextLevel = true
	}
}

function draw(){
	if(!nextLevel)
	{
		background('black')
		textSize(32);
		fill(255, 255, 255)
		textFont("Atari")
		text("Level: " + level, 200, (height-mobileH)/2-100)
		return
	}
	
	if(!ship.toDelete){
		background(0)
		
		ship.move()
		ship.draw()
		
		if(!ship.isHit){
			
			//intersection code for bullets
			for(var i = 0; i < bullets.length; i++){
				bullets[i].draw()
				bullets[i].move()
				for(var j = 0; j < enemies.length; j++){
					if(bullets[i].hits(enemies[j])){
						enemies[j].die()
						bullets[i].hit()
						
						//add some points
						score += 100 * level
						
						//update highscore
						if(score > highscore)
						{
							highscore = score
							setCookie("highscore", highscore, 365, "/SpaceInvaders")
							$('#highscore').text("Highscore: " + highscore)
						}
						
						//update score
						$('#score').text("Score: " + score)
						break;
					}
				}
				//check if a mothership is there and if it was hit
				if(spawnedMother && (mother!=null) && !bullets[i].toDelete && bullets[i].hits(mother)){
					mother.die()
					bullets[i].hit()
					score += 1000 * level
					
					//update highscore
					if(score > highscore)
					{
						highscore = score
						setCookie("highscore", highscore, 365, "/SpaceInavders")
						$('#highscore').text("Highscore: " + highscore)
					}
					
					//update score
						$('#score').text("Score: " + score)
				}
				
			}
			
			
			
			//remove bullets that hit or are off screen
			for(var i = bullets.length-1; i >= 0; i--){
				if(bullets[i].toDelete || bullets[i].y + bullets[i].r < 0)
				{
					bullets.splice(i, 1)
				}
			}
			
			//spawn mothership if needed
			if(!spawnedMother && spawnMother && (mother == null)){
				mother = new mothership()
				drawMother = true
				spawnedMother = true
				console.log("All hail the mother!")
			}
			
			//all the mothership logic
			if(drawMother)
			{
				mother.move()
				mother.draw()
				
				if(mother.toDelete || mother.testForEdge()){
					mother = null
					drawMother = false
					console.log("Mothership escaped!")
				}
			}
			
			//test for edges and draw them
			var edge = false
			for(var i = 0; i < enemies.length; i++)
			{
				enemies[i].move()
				enemies[i].draw()
				
				
				if(enemies[i].testForEdge()){
					edge = true
				}
			}
			
			//if one is on the edge shift them down
			if(edge)
			{
				edgeCount++;
				for(var i = 0; i < enemies.length; i++){
					enemies[i].shiftDown()
				}
			}
			
			//if the edgecount is 5, spawn mothership
			if(edgeCount===5 && !spawnedMother)
			{
				spawnMother = true
				console.log("Incomming Mothership!")
			}
			
			//remove aliens that died
			for(var i = enemies.length-1; i >= 0; i--){
				if(enemies[i].toDelete)
					enemies.splice(i, 1)
			}

			//spawn lasers by chance
			for(var i = 0; i < enemies.length; i++)
			{
				var rand = Math.random()*100
				if(rand < .05)
				{
					lasers.push(new laser(enemies[i].x, enemies[i].y, 5))
				}
			}

			//render all lasers
			for(var i = 0; i < lasers.length; i++)
			{
				lasers[i].move()
				lasers[i].draw()
				if(lasers[i].hits(ship.xpos, ship.ypos, ship.img.width, ship.img.height)){
					lasers[i].hit()
					ship.die()
					break
				}
			}

			//remove all lasers that are of bounds or did hit
			for(var i = lasers.length-1; i >= 0; i--)
			{
				if(lasers[i].y+lasers[i].anim.getHeight() > height-mobileH || lasers[i].toDelete)
					lasers.splice(i, 1)
			}
			
			//check if any of the aliens is on player level
			for(var i = 0; i < enemies.length; i++){
				if(enemies[i].intersects(ship.xpos, height-mobileH-ship.img.height, ship.img.width, ship.img.height)){
					ship.die()
					break;
				}
			}
			
			//check if no enemies are beeing on screen, since we always splice it's no problem to assume the last one will be on number 0
			if(enemies[0] == null && mother == null){
				resetGame()
			}
		}//ship.hit
	}
	else
	{
		//End screen
		background('red')
		strokeWeight(1);
		textSize(32);
		fill(255, 255, 255)
		textFont("Atari")
		text("Game Over", 200, (height-mobileH)/2-100)
		
		textSize(24);
		fill(255, 255, 255)
		textFont("Atari")
		text("Points: " + score, 200, (height-mobileH)/2-25)
		
		textSize(24);
		fill(255, 255, 255)
		textFont("Atari")
		text("Highscore: " + highscore, 200, (height-mobileH)/2+25)
		
		textSize(32);
		fill(255, 255, 255)
		textFont("Pixel")
		text("Refresh the page to play again!", 100, (height-mobileH) - 32)

		var distance = dist(mouseX, mouseY, width/2, (height-mobileH)/2+100)

		if(distance < 50)
			overInsertCoin = true
		else
			overInsertCoin = false

		push()
		strokeWeight(5)
		ellipseMode(CENTER);
		stroke(0);
		
		if(overInsertCoin == true)
		{
			fill(100);
		    cursor(HAND);
		} else {
		    fill(200); 
		    cursor(ARROW); 
		}
		ellipse(width/2, (height-mobileH)/2+100, 100, 100);
		text("Insert Coin", width/2-100, (height-mobileH)/2+200)
		pop()
		
	}
	
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
		rect(100, height-mobileH/2, 100, 100) //left
		rect(250, height-mobileH/2, 100, 100) //right
		rectMode(CORNER)
		rect(400, height-mobileH/2-50, (width-450), 100)
		pop()
		
		push()
		stroke("black")
		strokeWeight(5)
		line(100, height-mobileH/2-40, 60, height-mobileH/2)
		line(100, height-mobileH/2+40, 60, height-mobileH/2)
		line(250, height-mobileH/2-40, 290, height-mobileH/2)
		line(250, height-mobileH/2+40, 290, height-mobileH/2)
		pop()
	}
}

function mousePressed(){
	if(ship.toDelete && overInsertCoin)
	{
		level = 0
		resetGame()
	}
	if(mobile)
	{
		if(mouseX >= 50 && mouseX <= 150 && mouseY >= height-mobileH/2-50 && mouseY <= height-mobileH/2+50)
			ship.setDir(-1)
		if(mouseX >= 200 && mouseX <= 300 && mouseY >= height-mobileH/2-50 && mouseY <= height-mobileH/2+50)
			ship.setDir(1)
		if(mouseX >= 400 && mouseX <= width-50 && mouseY >= height-mobileH/2-50 && mouseY <= height-mobileH/2+50 )
		{
			var bullet = new Bullet(Math.floor(ship.xpos+ship.img.width/2), height-mobileH)
			bullets.push(bullet)
		}
	}
}

function mouseReleased(){
	if(mobile)
		ship.setDir(0)
}

function touchStarted(){
	if(mobile){
		if(ship.toDelete)
		{
			if(dist(touches[0].x, touches[0].y, width/2, (height-mobileH)/2+100) < 50)
				resetGame()
		}
		
		for(var i= 0; i < touches.length; i++)
		{
			if(touches[i].x >= 50 && touches[i].x <= 150 && touches[i].y >= height-mobileH/2-50 && touches[i].y <= height-mobileH/2+50)
			ship.setDir(-1)
			if(touches[i].x >= 200 && touches[i].x <= 300 && touches[i].y >= height-mobileH/2-50 && touches[i].y <= height-mobileH/2+50)
				ship.setDir(1)
			if(touches[i].x >= 400 && touches[i].x <= width-50 && touches[i].y >= height-mobileH/2-50 && touches[i].y <= height-mobileH/2+50 )
			{
				var bullet = new Bullet(Math.floor(ship.xpos+ship.img.width/2), height-mobileH)
				bullets.push(bullet)
			}
		}
		
	}
}

function touchEnded(){
	if(mobile)
		ship.setDir(0)
}

function keyReleased(){
	if(keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW){
		ship.setDir(0)
	}
}

function keyPressed(){
	if(key === ' '){
		var bullet = new Bullet(Math.floor(ship.xpos+ship.img.width/2), height-mobileH)
		bullets.push(bullet)
		return false;
	}
	
	if(key === '1'){
		var fs = fullscreen();
		fullscreen(!fs);
	}

	if(keyCode === RIGHT_ARROW){
		ship.setDir(1)
		return false;
	}
	else if(keyCode === LEFT_ARROW)
	{
		ship.setDir(-1)
		return false;
	}
}

$(document).ready(function(){
	$('#mobile').prop("checked", mobile)
});
