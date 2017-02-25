<?php
	$title = "Diastic Machine";
	$description = "A poetry generator";
?>

<html>
<head>
<meta charset="utf8">
<title><?php echo $title; ?></title>

<link rel="stylesheet" href="/libs/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" href="/libs/bootstrap/css/bootstrap-theme.min.css">

<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1, min-scale=1, max-scale=1, user-scalable=yes, minimal-ui">



<script src="/libs/jquery.min.js" type="text/javascript"></script>
<script src="/libs/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="/libs/p5.min.js" type="text/javascript"></script>
<script src="/libs/p5.dom.min.js" type="text/javascript"></script>
<script src="/libs/p5.sound.min.js" type="text/javascript"></script>
<script src="/libs/cookie.js"></script>

<script src="sketch.js"></script>

<style>
.panel {
	display:inline-block;
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
	<h1><a href="/">PrinzJuliano App Collective<br><small><?php echo $description; ?> made with p5.js</small></a></h1>
</div>

<div class="panel panel-default">
  <div class="panel-heading">
    <h3 class="panel-title">Input</h3>
  </div>
  <table class="table">
	<tr><th>Key</th><th>Value</th></tr>
	<tr><td align="center">seed</td>
		<td>
			<div class="input-group">
			<span class="input-group-btn">
        <button class="btn btn-success" id="submit" type="button">Generate</button>
      </span>
			<input id="seed" type="text" pattern="[A-Za-z]+"  title="Seed" value="Rainbow" class="form-control"></input>
			</div>
		</td></tr>
  </table>
</div><br>

</body>
</html>