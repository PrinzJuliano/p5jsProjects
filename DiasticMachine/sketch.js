var sourceText;
var words = [];

function preload(){
	
	sourceText = loadStrings('source.txt');
}

function setup(){
	noCanvas();
	
	sourceText = join(sourceText, ' ');
	words = splitTokens(sourceText, ' ,!?.[](){}/\\-_;:<>|§$%&=/*-+²³@~#\'\"')
	
	var seed = select("#seed");
	var submit = select("#submit");
	
	submit.mousePressed(function(){
		var phrase = diastic(seed.value(), words);
		createP(phrase);
	});
}

function diastic(seed, words){
	var phrase = "";
	var lastWord = 0;
	for(var i = 0; i < seed.length; i++){
		var c = seed.charAt(i);
		
		for(var j = lastWord; j < words.length; j++)
		{
			if(words[j].charAt(i) === c) {
				phrase += words[j] + " ";
				lastWord = j + 1;
				if(lastWord >= words.length)
					lastWord = 0;
				break;
			}
		}
	}
	return phrase.trim() + ".";
}