<?php

	require 'dbase.php';
	$input = json_decode(file_get_contents('php://input'));

	$adminUid = $input->adminUid;
	$uid = $input->uid;
	
	$uid = $input->uid;
	$obj = new CreateTableDemo();
	$result = $obj->getProductKey($adminUid, $uid);
	header('Content-Type: application/json');
	$var->result='';

	if($result !== false){
		$var->result=$result;
		echo json_encode($var);
	}
	else echo json_encode($var);

?>