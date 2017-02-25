/**
 * 
 */

// STRING MODIFICATION
String.prototype.isEmpty = function() {
	return (this.length === 0 || !this.trim());
};

// FIREBASE
var config = {
	apiKey : "AIzaSyA7XpcRzD5-uGV7CRLJfkqv2jgHKEhAbPU",
	authDomain : "asteroids-9a2f7.firebaseapp.com",
	databaseURL : "https://asteroids-9a2f7.firebaseio.com",
	storageBucket : "asteroids-9a2f7.appspot.com",
	messagingSenderId : "1064662498644"
};

var uid;
var isAnonymous;
var topFive = [];

firebase.initializeApp(config);

var database = firebase.database();
var ref = database.ref("scores");

console.log("Eastablished connection to Database");

firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
	    // User is signed in.
	    isAnonymous = user.isAnonymous;
	    uid = user.uid;
	    
	    console.log("Logged in with", (isAnonymous?"anonymous Account":"Google Account"), "; uid", uid);
	    
	  } else {
		  console.log("User logged out");
	  }
	});



// MODAL & UPLOAD HANDLING
function showUploadModal() {
	//ANTI HACKER STUFF
	if (score > 0) {
		if(score > getMaximumScoreForStage(stage))
		{
			inGame = false;
			score = -9;
			alert("Sorry but this is not possible due to our algorithms!");
		} else {
			var options = {
				"show" : true,
			};
	
			$('#fixedScore').val(score);
			$('#modalUsername').modal(options);
		}
	}
}

function signInAnonymously(){
	var username = $('#inputUsername').val();
	if (validateData(username)) {
		// sign in
		firebase.auth().signInAnonymously().then(function(){
			uploadScore(username);
		
		}).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log(errorCode, errorMessage);
		});
	}
}

function uploadScore(username) {
	

	$('#modalUsername').modal('hide');
	console.log("Uploaded data for "+username+"!");
	
	var data = {
			"username": username,
			"score": score,
			"stage": stage,
			"token": firebase.auth().currentUser.uid,
			"anonymous": firebase.auth().currentUser.isAnonymous
	}
	
	ref.push(data).then(function(){
		firebase.auth().signOut();
	});
	
	
}

function signInWithGoogle(){
	console.log("Trying to log in with Google");
	var provider = new firebase.auth.GoogleAuthProvider();
	provider.addScope('https://www.googleapis.com/auth/plus.login');
	provider.setCustomParameters({
		  'login_hint': 'user@example.com'
		});
	
	firebase.auth().signInWithPopup(provider).then(function(result) {
		  // This gives you a Google Access Token. You can use it to access
			// the Google API.
		  var token = result.credential.accessToken;
		  // The signed-in user info.
		  var user = result.user;
		  
		  console.log("Successfully retrieved token", token, user);

		  uploadScore(user.email);
		}).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  // The email of the user's account used.
		  var email = error.email;
		  // The firebase.auth.AuthCredential type that was used.
		  var credential = error.credential;
		  
		  console.log(errorCode, errorMessage, email, credential);
		});
	
}

function validateData(name) {
	if (name.isEmpty()) {
		$('#usernameInputGroup').addClass("has-error");
		alert("You need a valid username!");
		return false;
	}

	return true;
}

function checkFor(pos, data){
	if(topFive[pos] == undefined)
	{
		topFive[pos] = data;
		return true;
	}else {
		if(topFive[pos].score < data.score)
		{
			topFive.splice(pos, 0, data);
			topFive.splice(topFive.length-1, 1);
			return true;
		}else {
			return false;
		}
	}
}

function getMaximumScoreForStage(st)
{
	if(st <= 0)
		return 0;
	return (4+2*st)*77+getMaximumScoreForStage(st-1);
}

function getMinimumScoreForStage(st)
{
	if(st <= 0)
		return 0;
	return (3+st)*13+getMinimumScoreForStage(st-1);
}

// All the initialization for jquery
$(document).ready(function() {
	$('[data-toggle="tooltip"]').tooltip();
	
	// read the top 5
	ref.on("value", function(data){
		
		console.log("Got Data from the DB!");
		
		//reset top five
		topFive = [];
		for(var i = 0; i < 5; i++)
			topFive[i] = {"username": "<Slot Free>", "score": -1};
		
		var allValues = data.val();
		
		for(var key in allValues){
			for(var i = 0; i < 5; i++){
				if(checkFor(i, allValues[key]))
					break;
			}
		}
	});
});