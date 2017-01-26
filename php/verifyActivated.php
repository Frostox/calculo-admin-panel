<?php

	require 'dbase.php';
	$input = json_decode(file_get_contents('php://input'));
	
	$uid = $input->uid;
	$obj = new CreateTableDemo();
	$var = $obj->checkActivated($uid);
	

	header('Content-Type: application/json');
	echo json_encode($var);

?>
