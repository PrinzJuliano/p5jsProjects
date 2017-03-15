var Engine = Matter.Engine, World = Matter.World, Bodies = Matter.Bodies;
var engine;
var world;
var particles = [];
var flinkos = [];
var boundaries = [];
var cols = 11;
var rows = 10;
var spacing;
function setup() {
    createCanvas(600, 700);
    engine = Engine.create();
    world = engine.world;
	world.gravity.y = 5;
	
	colorMode(HSB);
	
     newParticle();
    spacing = width / cols;
	
	//Add colliders
    for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
            var x =  + i * spacing;
            var y = spacing + j * spacing;
            if (j % 2 == 1) {
                x += spacing / 2;
            }
            var p =  new Particle(x, y, 16, true);
            flinkos.push(p);
        }
    }
	
	//Add bounds
	var floorY = new Boundary(width/2, height+50, width, 100);
	boundaries.push(floorY);
	
	
	for (var i = 0; i < cols + 1; i++) {
		var x = spacing * i;
		var h = 50;
		var w = 10;
		var y = height - h / 2;
		
		var b = new Boundary(x, y, w, h);
		boundaries.push(b);
	}
}
function newParticle() {
    var p =  new Particle(300, 0, 10);
    particles.push(p);
}
function draw() {
    background(0, 0, 12);
    if (frameCount % 5 == 0) {
         newParticle();
    }
    Engine.update(engine, 1000 / frameRate());
    for (var i = particles.length - 1; i >= 0; i--) {
        particles[i].draw();
		
		if(particles[i].offScreen()){
			World.remove(world, particles[i].body);
			particles.splice(i, 1);
		}
    }
    for (var i = 0; i < flinkos.length; i++) {
        flinkos[i].draw();
    }
	for(var i = 0; i < boundaries.length; i++)
	{
		boundaries[i].draw();
	}
	
}
