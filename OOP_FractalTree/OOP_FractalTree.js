var tree = [];
var len = 200;
var btn;

function setup() {
  btn = createButton("Split");
  btn.mousePressed(click);
  btn.parent("btn");
  btn.class("btn btn-default");
  
  var canvas = createCanvas(800, 800);
  canvas.parent("frame");
  
  var a = createVector(width/2, height);
  var b = createVector(width/2, height-len);
  tree[0] = new Branch(a, b);
}

function draw() {
  background(21);
  for(var i = 0; i < tree.length; i++){
     tree[i].draw(); 
  }
}

function click(){
  for(var i = tree.length-1; i >= 0; i--){
    if(!tree[i].finished){
      tree[i].finsihed = true;
      tree.push(tree[i].branch(PI/4));
      tree.push(tree[i].branch(-PI/4));
    }
  }
}