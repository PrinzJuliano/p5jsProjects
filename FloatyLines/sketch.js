const NUM_LINES = 10;

var t = 0.0;

function x1(t){
 return sin(t / 10) * 100 + sin(t/5) * 20; 
}

function y1(t){
 return cos(t / 10) * 100; 
}
function x2(t){
 return sin(t / 10) * 100 + sin(t) * 2; 
}

function y2(t){
 return cos(t / 20) * 200 + cos(t / 12) * 20; 
}

function setup(){
  createCanvas(500, 500);
  frameRate(60);
}

function draw(){
  background(21);
 stroke(128, 0, 0);
 strokeWeight(5);
 
 
 translate(width/2, height/2);
 for(var i = 0; i < NUM_LINES; i++){
   line(x1(t + i), y1(t + i), x2(t + i), y2(t + i));
 }
 t+=0.5;
}