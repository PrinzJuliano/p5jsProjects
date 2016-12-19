var cols, rows, newW, newH, newCW;
var w = 40;
var shouldDraw = true;

var infoVisible = true;

var grid = [];

var stack = [];

var current;

var done = false;
var canvas;

function setup(){
	canvas = createCanvas(400, 400);
	canvas.parent("frame");
	
	//frameRate(60);
	
	cols = Math.floor(width/w);
	rows = Math.floor(height/w);
	
	for(var j = 0; j < rows; j++)
	{
		for(var i = 0; i < cols; i++){
			var cell = new Cell(i, j);
			grid.push(cell);
		}
	}
	
	current = grid[0];
	checkAll();
}


function removeWalls(a, b)
{
	var x = a.i - b.i
	var y = a.j - b.j
	
	if(x === 1)
	{
		//left right 
		a.walls[3] = false;
		b.walls[1] = false;
	}
	else if(x === -1)
	{
		//right left
		a.walls[1] = false;
		b.walls[3] = false;
	}
	else if(y === 1)
	{
		//top bottom
		a.walls[0] = false;
		b.walls[2] = false;
	}
	else if(y === -1)
	{
		//bottom top
		a.walls[2] = false;
		b.walls[0] = false;
	}
}

function draw(){
	background(51);
	if(shouldDraw && !done || done){
		for(var i = 0; i < grid.length; i++){
			grid[i].draw();
		}
	
	
		current.visited = true;
		if(!done)
			current.highlight();
		
		//1.
		var next  = current.checkNeighbors();
		if(next){
			
			next.visited = true;
			
			//2. 
			stack.push(current);
			
			//3.
			removeWalls(current, next);
			
			//4.
			current = next;
		}
		else if(stack.length > 0){
			current = stack.pop();
		}
		else {
			done = true;
			noLoop();
		}
	}
	else {
		solve();
	}
}

function solve(){
	while(!done){
		current.visited = true;
		if(!done)
			
		//1.
		var next  = current.checkNeighbors();
		if(next){
				
			next.visited = true;
				
			//2. 
			stack.push(current);
				
			//3.
			removeWalls(current, next);
				
			//4.
			current = next;
		}
		else if(stack.length > 0){
			current = stack.pop();
		}
		else {
			done = true;
		}
	}
}

function index(i, j)
{
	if(i < 0 || j < 0 || i > cols-1 ||j > rows - 1 )
	{
		return -1;
	}
	return i + j * cols;
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

function checkAll(){
	newW = parseInt($('#widthSelect').val()) || 400;
	newH = parseInt($('#heightSelect').val()) || 400;
	newCW = parseInt($('#cellWidthSelect').val()) || 40;
	shouldDraw = $('#drawSelect').prop('checked');
	
	//labels
	$('#widthSelectLabel').text("Width: " + newW);
	$('#heightSelectLabel').text("Height: " + newH);
	$('#cellWidthSelectLabel').text("Cell Width: " + newCW);
}

function applySettings(){
	checkAll();
	
	resizeCanvas(newW, newH);
	w = newCW;
	cols = Math.floor(newW/newCW);
	rows = Math.floor(newH/newCW);
	done = false;
	
	grid = [];
	stack = [];
	
	for(var j = 0; j < rows; j++)
	{
		for(var i = 0; i < cols; i++){
			var cell = new Cell(i, j);
			grid.push(cell);
		}
	}
	
	current = grid[0];
	
	loop();
}

function downloadCanvas(link, canvasId, filename) {
    link.href = document.getElementById(canvasId).toDataURL();
    link.download = filename;
}

$(document).ready(function(){
	document.getElementById('download').addEventListener('click', function() {
		downloadCanvas(this, canvas.id(), 'maze.png');
	}, false);
});

