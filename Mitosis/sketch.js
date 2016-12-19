var cells = [];
var infoVisible = true

var chanceToGrow = 25;
var amountToGrowMax = 1;
var minRadius = 80;
var chanceToSplit = 50;
var chanceToDie = 5;


//FPS Stuff
var fps = {	
	startTime : 0,	
	frameNumber : 0,	
	getFPS : function(){		
		this.frameNumber++;		
		var d = new Date().getTime(),			
		currentTime = ( d - this.startTime ) / 1000,			
		result = Math.floor( ( this.frameNumber / currentTime ) );		
		if( currentTime > 1 ){			
			this.startTime = new Date().getTime();			
			this.frameNumber = 0;		
		}		
		return result;	
	}	
};

function setup(){
	var canvas = createCanvas(windowWidth, windowHeight);
	canvas.parent("frame");
}

function draw(){
	background('#e2e2e2');
	for(var i = cells.length-1; i >= 0; i--){
		
		cells[i].move();
		cells[i].draw();
		
		//by chance grow bigger
		var chance = random(0, 100);
		if(chance <= chanceToGrow)
		{
			cells[i].r+=random(0, amountToGrowMax);
		}
		
		//if the radius is bigger than 80 by chance devide
		if(cells[i].r > minRadius)
		{
			var chance = random(0, 100);
			if(chance <= chanceToSplit)
			{
				cells.push(cells[i].mitosis());
				cells.push(cells[i].mitosis());
				cells.splice(i, 1);
			}
		}
		
		//by chance, die
		var chance = random(0, 1000)/10;
		if(chance <= chanceToDie/100)
		{
			cells.splice(i, 1);
		}
	}
	
	$('#population').text("Population: " + (cells.length || 0));
	textSize(24);
	text("Population: " + cells.length, 10, 20);
}

function mousePressed(){
	if (mouseButton == LEFT && mouseY > 0)
		cells.push(new Cell(createVector(mouseX, mouseY), 20, null));
}

function touchStarted(){
	if(touches[0].y > 0)
		cells.push(new Cell(createVector(touches[0].x, touches[0].y), 20, null));
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
}

function fpsTick(){	
	var refreshr = 120;
	setTimeout( fpsTick, 1000 / refreshr );	
	var actualfps = (refreshr / 60) * fps.getFPS();
	$('#fpscounter').text("FPS: " + actualfps);
	if(actualfps>=60)
		$('#fps-list-item').removeClass().addClass("list-group-item list-group-item-success")
	else if(actualfps>=30)
		$('#fps-list-item').removeClass().addClass("list-group-item list-group-item-warning")
	else
		$('#fps-list-item').removeClass().addClass("list-group-item list-group-item-danger")
		
}

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

function killAll(){
	cells = [];
}

function splitAll(){
	for(var i = cells.length-1; i >= 0; i--){
		cells.push(cells[i].mitosis());
		cells.push(cells[i].mitosis());
		cells.splice(i, 1);
	}
}

function checkAll(){
	chanceToGrow = $('#chanceToGrow').val();
	amountToGrowMax = $('#amountToGrowMax').val();
	chanceToSplit = $('#chanceToSplit').val();
	minRadius = $('#minRadius').val();
	chanceToDie = $('#chanceToDie').val();
	
	//update the labels
	$('#' + 'chanceToGrow'		+'Label').text("Chance to grow: 		" + chanceToGrow + "%");
	$('#' + 'amountToGrowMax'	+'Label').text("Amount to max. grow: 	" + amountToGrowMax);
	$('#' + 'chanceToSplit'		+'Label').text("Chance to split: 		" + chanceToSplit + "%");
	$('#' + 'minRadius'			+'Label').text("Min. Radius to split: 	" + minRadius);
	$('#' + 'chanceToDie'		+'Label').text("Chance to die: 			" + chanceToDie + "%");
}

function resetSettings(){
	$('#chanceToGrow').val(25);
	$('#amountToGrowMax').val(1);
	$('#chanceToSplit').val(50);
	$('#minRadius').val(80);
	$('#chanceToDie').val(5);
	
	checkAll();
}

function saveSettings(){
	setCookie("chanceToGrow", chanceToGrow, 365, "/Mitosis/");
	setCookie("amountToGrowMax", amountToGrowMax, 365, "/Mitosis/");
	setCookie("chanceToSplit", chanceToSplit, 365, "/Mitosis/");
	setCookie("minRadius", minRadius, 365, "/Mitosis/");
	setCookie("chanceToDie", chanceToDie, 365, "/Mitosis/");
}

function loadSettings(){
	var tchanceToGrow = getCookie("chanceToGrow") 		|| 25;
	var tamountToGrowMax = getCookie("amountToGrowMax") || 1;
	var tchanceToSplit = getCookie("chanceToSplit") 	|| 50;
	var tminRadius = getCookie("minRadius") 			|| 80;
	var tchanceToDie = getCookie("chanceToDie") 		|| 25;
	
	$('#chanceToGrow').val(tchanceToGrow);
	$('#amountToGrowMax').val(tamountToGrowMax);
	$('#chanceToSplit').val(tchanceToSplit);
	$('#minRadius').val(tminRadius);
	$('#chanceToDie').val(tchanceToDie);
	
	checkAll();
}

function fullsc(){
	var fs = fullscreen();
    fullscreen(!fs);
}

function keyPressed(){
	if(key === 'K')
	{
		killAll();
	}
	
	if(key === 'S')
	{
		splitAll();
	}
	
	if(key === 'F')
	{
		fullsc();
	}
}

$(document).ready(function(){
	loadSettings()
});
	
