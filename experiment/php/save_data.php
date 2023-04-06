<?php

	// Create a database connection
	$mysqli = mysqli_connect("localhost","eco_mdb_root","KZrQupBmNL", "eco_mdb1");

	if (mysqli_connect_errno($mysqli)) {
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}

	// Get values passed from JS
	$date = date('Y-m-d');
	$exp = 'shape0-pilot';
	$condition=$_POST['subject']['condition'];
	$subject = $_POST['subject'];
	$trial = $_POST['trials'];
	$extra=$_POST['states'];

	//Create a query
	$query = "INSERT INTO bnz_shape (date,exp,condition,subject,trial,extra) VALUES ('{$date}', '{$exp}','{$condition}','{$subject}','{$trial}','{$extra}'";

	//Do it
	mysqli_query($mysqli, $query);

	//Close connection
	mysqli_close($mysqli);

?>
