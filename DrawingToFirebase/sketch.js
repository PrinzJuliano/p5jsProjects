var database;

var drawing = [];
var currentPath = [];
var isDrawing = false;
var username = "deuce";


//Some prototype magic
String.prototype.isEmpty = function() {
    return (this.length === 0 || !this.trim());
};

function setup(){
	var canvas = createCanvas(400, 400);
	canvas.mousePressed(startPath);
	canvas.mouseReleased(endPath);
	canvas.parent("canvasContainer");


	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyDLfc1br9fblumlX-VAvqjZW_7P4_i2JMQ",
		authDomain: "drawing-to-firebase.firebaseapp.com",
		databaseURL: "https://drawing-to-firebase.firebaseio.com",
		storageBucket: "drawing-to-firebase.appspot.com",
		messagingSenderId: "556434947945"
	};
	firebase.initializeApp(config);

	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
	   

		//check if the user is validated
		var user = firebase.auth().currentUser;

		if(user.emailVerified){
			

			$('#login-modal').modal({"show": false});

			username = firebase.auth().currentUser.displayName || firebase.auth().currentUser.email;
			$('#username').text(username);
		} else {
			
			user.sendEmailVerification().then(function() {
			  // Email sent.
			}, function(error) {
			  // An error happened.
			});
			alert("You have not yet verified your email!");
		}

	  } else {
	  	$('#login-modal').modal({"show": true, "backdrop": "static"});
		$('#login-modal').on('shown.bs.modal', function () {
		  $('#login-modal').focus()
		});
	  }
	});

	if(firebase.auth().currentUser){
		username = firebase.auth().currentUser.email;
		$('#username').text(username);
	} else {
		$('#username').text("No one");
	}
	



	// if(!firebase.auth().currentUser)
	// {
	// 	$('#login-modal').modal({"show": true, "backdrop": "static"});
	// 	$('#login-modal').on('shown.bs.modal', function () {
	// 	  $('#login-modal').focus()
	// 	});
	// }

	database = firebase.database();

	var saveButton = select('#saveButton');
	saveButton.mousePressed(saveDrawing);

	var undoButton = select("#undoButton");
	undoButton.mousePressed(undo);

	var clearAllButton = select('#clearAllButton');
	clearAllButton.mousePressed(clearAll);

	var logoutButton = select('#logoutButton');
	logoutButton.mousePressed(logout);

}

function startPath(){
	currentPath = [];
	drawing.push(currentPath);
	isDrawing = true;
}

function endPath(){
	isDrawing = false;
}

function draw(){
	background(0);

	if(isDrawing){
		var point = {
			x: mouseX,
			y: mouseY
		}
		currentPath.push(point)
	}

	stroke(255);
	strokeWeight(4);
	noFill();
	
	for(var i = 0; i < drawing.length; i++)
	{
		beginShape();
		for(var j = 0; j < drawing[i].length; j++){
			vertex(drawing[i][j].x, drawing[i][j].y);
		}
		endShape();
	}
	
}

function undo(){
	currentPath = [];
	drawing.splice(drawing.length-1, 1);
}

function clearAll(){
	drawing = [];
}

function saveDrawing(){
	var ref = database.ref("drawings");

	var data = {
		name: username,
		drawing: drawing
	};

	ref.push(data, function(status){
		clearAll();
	});

	
}

function signin(){
	
	//get all the data
	var email = $('#loginEmailIn').val();
	var pw = $('#loginPasswordIn').val();


	if(!email.isEmpty() && !pw.isEmpty()){

		firebase.auth().signInWithEmailAndPassword(email, pw).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  alert("Error " + errorCode + ": " + errorMessage);
		}).then(function(){
			location.reload();
		});
	}

	return false;
}

function signup(){
	var email = $('#signupEmailIn').val();
	var pw = $('#signupPasswordIn').val();
	var rep = $('#signupPasswordRepeatIn').val();

	if(!email.isEmpty() && !pw.isEmpty() && !rep.isEmpty() && pw === rep)
	{
		firebase.auth().createUserWithEmailAndPassword(email, pw).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  alert("Error " + errorCode + ": " + errorMessage);
		});

		email.text("");
		pw.text("");
		rep.text("");
	} else {
		alert("Some credentials are not correct!");
	}

	return false;
}

function logout(){
	firebase.auth().signOut().then(function() {
  		location.reload();
	}, function(error) {
	  // An error happened.
	});
}

function resetEmail(){
	var auth = firebase.auth();
	var email = $('#loginEmailIn').val();

	if(!email.isEmpty()){

		auth.sendPasswordResetEmail(email).then(function() {
		  alert("Email sent!");
		}, function(error) {
		  // An error happened.
		});
	}

}