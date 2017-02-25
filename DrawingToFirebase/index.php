<?php
	$description = "Draw stuff to firebase";
	$title = "Drawing to firebase";
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

<script src="sketch.js"></script>

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

<a href="view.php">View the images others drew</a><br>

<!-- LOGIN MODAL -->
<div class="modal fade" tabindex="-1" role="dialog" id="login-modal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Firebase requires Authentication</h4>
      </div>
      <div class="modal-body">
      	<div class="panel panel-default">
	      	<div class="panel-body">
	      		<a href="view.php">View the images others drew</a><br>
	      	</div>
      	</div>
        <div class="row">
        	<div class="col-md-offset-1 col-md-10">
	        	<div class="panel panel-primary" >
	        		<div class="panel-heading">
	        			<h3 class="panel-title">Login</h3>
	        		</div>
				  <div class="panel-body">
				    <form action="#">
					  <div class="form-group">
					    <label for="loginEmailIn">Email address</label>
					    <input type="email" class="form-control" id="loginEmailIn" placeholder="Email">
					  </div>
					  <div class="form-group">
					    <label for="loginPasswordIn">Password</label>
					    <input type="password" class="form-control" id="loginPasswordIn" placeholder="Password">
					  </div>
					  <button type="submit" class="btn btn-default" onclick="signin()">Submit</button>
					  <button type="submit" class="btn btn-danger" onclick="resetEmail()">Reset Password</button>
					</form>
				  </div>
				</div>
			</div>

			<div class="col-md-offset-1 col-md-10">
				<div class="panel panel-success">
					<div class="panel-heading">
	        			<h3 class="panel-title">Signup</h3>
	        		</div>
				  <div class="panel-body">
				    <form action="#">
					  <div class="form-group">
					    <label for="signupEmailIn">Email address</label>
					    <input type="email" class="form-control" id="signupEmailIn" placeholder="Email">
					  </div>

					  <div class="form-group">
					    <label for="signupPasswordIn">Password</label>
					    <input type="password" class="form-control" id="signupPasswordIn" placeholder="Password">
					  </div>
					  <div class="form-group">
					    <label for="signupPasswordRepeatIn">Repeat password</label>
					    <input type="password" class="form-control" id="signupPasswordRepeatIn" placeholder="Password">
					  </div>
					  <button type="submit" class="btn btn-default" onclick="signup()">Submit</button>
					</form>
				  </div>
				</div>
			</div>
        </div>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<h3 class="alert alert-success">Logged in as <span class="label label-default" id="username"></span></h3>

<div class="btn-group" role="group" aria-label="...">
  <button type="button" class="btn btn-warning" id="undoButton" style="border-bottom-left-radius: 0px"><span class="glyphicon glyphicon-chevron-left"></span> Undo</button>
  <button type="button" class="btn btn-danger" id="clearAllButton"><span class="glyphicon glyphicon-erase"></span> Clear</button>
  <button type="button" class="btn btn-success" id="saveButton" style=""><span class=" glyphicon glyphicon-floppy-disk"></span> Save</button>
  <button type="button" class="btn btn-primary" id="logoutButton" style="border-bottom-right-radius: 0px"> Logout</button>
</div>

<div id="canvasContainer"></div>

</div>