<?php
	function generate(){
		$tokens = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

		$segment_chars = 5;
		$num_segments = 4;
		$key_string = '';

		for ($i = 0; $i < $num_segments; $i++) {

			$segment = '';

			for ($j = 0; $j < $segment_chars; $j++) {
				$segment .= $tokens[rand(0, 35)];
			}

			$key_string .= $segment;

			if ($i < ($num_segments - 1)) {
				$key_string .= '-';
			}

		}

		return $key_string;
	}

	require 'dbase.php';
	$input = json_decode(file_get_contents('php://input'));
	
	$uid = $input->uid;
	$pkey = generate();
	
	$obj = new CreateTableDemo();
	$resp = $obj->createNewUser($uid, $pkey);

	header('Content-Type: application/json');
	$var->res = false;
	if($resp===true){
		$var->res = true;
		echo json_encode($var);
	} else {
		echo json_encode($var);
	}

	


?>
