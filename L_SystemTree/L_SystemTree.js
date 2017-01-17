var sentence = "X";
var rules = [];
rules[0] = {
  a: "X",
  b: "F-[[X]+X]+F[+FX]-X+X", //F-[[X]+X]+F[+FX]-X
}
rules[1] = {
  a: "F",
  b: "F[X]F",
}

var len = 10;

function setup() {
  var c = createCanvas(800, 800);
  c.parent("frame");
  
  var button = createButton("Generate");
  button.parent("buttonHead");
  button.mousePressed(buttonClick);
  
  background(51);
}

function drawTree(){
  for(var i = 0; i < sentence.length; i++){
     var instruction = sentence.charAt(i);
     switch(instruction){
      case '+':
        rotate(PI/6);
        break;
      case '-':
        rotate(-PI/6);
        break;
      case '[':
        push();
        break;
      case ']':
        pop();
        break;
      case 'F':
        stroke(255, 255, 255, 100);
        line(0, 0, 0, -len);
        translate(0, -len);
        break;
     }
  }
}

function buttonClick(){
 generate(); 
 document.getElementById('sentence').innerHTML = sentence;
}

function generate(){
  var newSentence = "";
  for(var i = 0; i < sentence.length; i++){
    var character = sentence.charAt(i);
    
    var found = false;
    for(var j = 0; j < rules.length; j++){
      if(rules[j].a == character){
         newSentence += rules[j].b;
         found = true;
         break;
      }
    }
    if(!found)
      newSentence += character;
    
  }
  sentence = newSentence;
  
  resetMatrix();
  translate(width/2, height);
  drawTree();
}