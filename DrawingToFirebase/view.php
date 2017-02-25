<?php
	$description = "View stuff that other made!";
	$title = "P5 Firebase Viewer";
?>

<html>
<head>
<meta charset="utf8">
<title><?php echo $title; ?></title>

<link rel="stylesheet" href="/libs/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" href="/libs/bootstrap/css/bootstrap-theme.min.css">

<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1, min-scale=1, max-scale=1, user-scalable=no, minimal-ui">



<script src="/libs/jquery.min.js" type="text/javascript"></script>
<script src="/libs/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="/libs/p5.min.js" type="text/javascript"></script>
<script src="/libs/p5.dom.min.js" type="text/javascript"></script>
<script src="/libs/p5.sound.min.js" type="text/javascript"></script>
<script src="/libs/cookie.js"></script>

<!-- CDN's -->
<script src="https://www.gstatic.com/firebasejs/3.6.9/firebase.js"></script>

<script>
var database;
var c = 1;

var drawings = [];
	function setup(){
		var config = {
			apiKey: "AIzaSyDLfc1br9fblumlX-VAvqjZW_7P4_i2JMQ",
			authDomain: "drawing-to-firebase.firebaseapp.com",
			databaseURL: "https://drawing-to-firebase.firebaseio.com",
			storageBucket: "drawing-to-firebase.appspot.com",
			messagingSenderId: "556434947945"
		};
		firebase.initializeApp(config);

		createCanvas(800, 420);
		background(0);

		database = firebase.database();

		var ref = database.ref("drawings");

		ref.on("value", gotData, errData);

		
	}

	function gotData(data){
		var drawingsdata = data.val();
		var keys = Object.keys(drawingsdata);

		for(var i = 0; i < keys.length; i++)
		{
			var key = keys[i];
			var ref = database.ref("drawings/" + key);

			ref.on("value", drawPic);

		}
	}

	function errData(err)
	{
		console.log(err);
	}

	function drawPic(data){
		var drawing = data.val();
		resizeCanvas(800, 420*floor(c/2));
		c++;

		var x = 0;
		var y = 420*(floor(c/2)-1);	

		if(c%2 == 0)
		{
			x = 0;
		} else {
			x = 400;
		}

		//draw
		var dc = {
			x: x,
			y: y,
			drawing: drawing.drawing,
			name: drawing.name
		}
		drawings.push(dc);
	}

	function draw(){
		background(0);

		for(var n = 0; n < drawings.length; n++)
		{
			push();

			stroke(255);
			strokeWeight(4);
			noFill();

			var drawing = drawings[n].drawing;
			translate(drawings[n].x, drawings[n].y);
	
			for(var i = 0; i < drawing.length; i++)
			{
				beginShape();
				for(var j = 0; j < drawing[i].length; j++){
					vertex(drawing[i][j].x, drawing[i][j].y);
				}
				endShape();
			}
			fill(255);
			noStroke();
			text("By: " + drawings[n].name, 0, 400);
			pop();
		}
	}

</script>

<style>
.panel {
}
body {
	 overflow-x: hidden;
	 padding-left: 5px;
	 padding-right:5px;
}
</style>
</head>
<body>

<div class="page-header">
	<h1><a href="/">PrinzJuliano App Collective<br><small><?php echo $description; ?> made with Javascript</small></a></h1>
</div>

<a href="index.php">Back to the drawer</a>
<hr />


</body>
</html>