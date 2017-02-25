<?php
$title = "Asteroids";
$description = "The classic Arcade Game";
?>

<html>
<head>
<meta charset="utf8">
<title><?php echo $title; ?></title>

<link rel="stylesheet" href="/libs/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet"
	href="/libs/bootstrap/css/bootstrap-theme.min.css">

<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport"
	content="width=device-width, initial-scale=1, min-scale=1, max-scale=1, user-scalable=yes, minimal-ui">

<meta http-equiv="cache-control" content="max-age=0" />
<meta http-equiv="cache-control" content="no-cache" />
<meta http-equiv="expires" content="0" />
<meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
<meta http-equiv="pragma" content="no-cache" />

<script src="https://www.gstatic.com/firebasejs/3.6.10/firebase.js"></script>

<script src="/libs/jquery.min.js" type="text/javascript"></script>
<script src="/libs/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="/libs/p5.min.js" type="text/javascript"></script>
<script src="/libs/p5.dom.min.js" type="text/javascript"></script>
<script src="/libs/p5.sound.min.js" type="text/javascript"></script>
<script src="/libs/cookie.js"></script>

<script src="sketch.js"></script>
<script src="ship.js"></script>
<script src="asteroid.js"></script>
<script src="laser.js"></script>
<script src="DataHandler.js"></script>

<style>
.panel {
	display: inline-block;
}

body {
	overflow-x: hidden;
}
</style>
</head>
<body>

	<!-- modal -->
	<div class="modal fade" tabindex="-1" role="dialog" id="modalUsername">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">Enter you name</h4>
				</div>
				<div class="modal-body">
					<form>
						<div class="form-group" id="usernameInputGroup">
							<label for="inputUsername">Username:</label> <input
								type="text" class="form-control" id="inputUsername"
								placeholder="Name . . .">
						</div>
						
						<div class="form-group">
							<label for="fixedScore">Score:</label> <input type="number" class="form-control" id="fixedScore" disabled></input>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					<button type="button" class="btn btn-default" onclick="signInWithGoogle()">Sign in with Google</button>
					<button type="button" class="btn btn-primary" data-toggle="tooltip"
						data-placement="top" title="Publish the score!" onclick="signInAnonymously()">Upload</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
	<!-- /.modal -->

	<div class="page-header" style="padding-left: 5px">
		<h1>
			<a href="/">PrinzJuliano App Collective<br> <small><?php echo $description; ?> made with p5.js</small></a>
		</h1>
	</div>


</body>
</html>