<?php
	$title = "A* Pathfinder";
	$description = "A Pathfinder";
?>

<html>
<head>
<meta charset="utf8">
<title><?php echo $title; ?></title>

<link rel="stylesheet" href="/libs/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" href="/libs/bootstrap/css/bootstrap-theme.min.css">

<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1, min-scale=1, max-scale=1, user-scalable=no, minimal-ui">

<meta http-equiv="cache-control" content="max-age=0" />
<meta http-equiv="cache-control" content="no-cache" />
<meta http-equiv="expires" content="0" />
<meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
<meta http-equiv="pragma" content="no-cache" />

<script src="/libs/jquery.min.js" type="text/javascript"></script>
<script src="/libs/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="/libs/p5.min.js" type="text/javascript"></script>
<script src="/libs/p5.dom.min.js" type="text/javascript"></script>
<script src="/libs/p5.sound.min.js" type="text/javascript"></script>
<script src="/libs/cookie.js"></script>

<script src="sketch.js"></script>
<script src="Spot.js"></script>

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

</body>
</html>