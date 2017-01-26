<?php

	require 'dbase.php';
	$input = json_decode(file_get_contents('php://input'));
	
	$uid = $input->uid;
	$pkey = $input->pkey;

	$obj = new CreateTableDemo();

	$verified = $obj->checkProductKey($uid, $pkey);

	header('Content-Type: application/json');
	$var->res = false;
	if($verified === true){
		$var->res = true;
		echo json_encode($var);
	} else {
		echo json_encode($var);
	}
	

?>