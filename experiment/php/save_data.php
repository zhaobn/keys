<?php

	// Create a database connection
	$mysqli = mysqli_connect("localhost","eco_mdb_root","KZrQupBmNL", "eco_mdb1");

	if (mysqli_connect_errno($mysqli)) {
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}


	$date = date('Y-m-d');
	$exp = 'shape-pilot';

	// Get values passed from JS
	$data = json_decode(file_get_contents('php://input'), true);
	$subject = $data['subject'];
	$trial = $data['trials'];
	$extra = $data['states'];

	//Create a query
	$query = "INSERT INTO bnz_shape (date,exp,subject,trial,extra) VALUES ('{$date}','{$exp}','{$subject}','{$trial}','{$extra}')";

	//Do it
	mysqli_query($mysqli, $query);

	//Close connection
	mysqli_close($mysqli);

?>
