<?php



	class CreateTableDemo {
		const DB_HOST = 'localhost';
		const DB_NAME = 'learncet_extraclass_2';
		const DB_USER = 'learncet_eclass';
		const DB_PASSWORD = 'extraclass1';

		private $conn = null;

		/**
		* Open the database connection
		*/
		public function __construct() {
			// open database connection
			$connectionString = sprintf("mysql:host=%s;dbname=%s",
			CreateTableDemo::DB_HOST,
			CreateTableDemo::DB_NAME);
			try {
			$this->conn = new PDO($connectionString,
			CreateTableDemo::DB_USER,
			CreateTableDemo::DB_PASSWORD);

			} catch (PDOException $pe) {
			die($pe->getMessage());
			}
		}

		public function __destruct() {
			// close the database connection
			$this->conn = null;
			return null;
		}

		public function createProductKeyTable() {
			try {
				$sql = "create table if not exists pkeys(uid varchar(200) primary key, activated boolean default false, start_date datetime NOT NULL, p_key varchar(25) NOT NULL);";

				if($this->conn->exec($sql) !== false)
				return true;
				return false;
			} catch(PDOException $e) {
			    die($pe->getMessage());
			}
		}


		public function createNewUser($uid, $pkey){
			$sql = "insert into pkeys(uid, start_date, p_key) values('$uid', now(), '$pkey')";
			if($this->conn->exec($sql) !== false){
				return true;
			} else {
				return false;
			}
		}

		public function checkActivated($uid){
			$sql = "select activated, start_date from pkeys where uid = '$uid'";
			$result = $this->conn->query($sql);
			$result->setFetchMode(PDO::FETCH_ASSOC);
			$tuple = $result->fetch();

			$var->activated = false;
			$var->startDate = $tuple['start_date'];
			if($tuple[activated] == 1){
				$var->activated = true;
			}

			return $var;
		}


		public function checkProductKey($uid, $pkey){
			$sql = "select uid from pkeys where uid = '$uid' and p_key = '$pkey'";
			$result = $this->conn->query($sql);
			$result->setFetchMode(PDO::FETCH_ASSOC);
			$tuple = $result->fetch();
			if($tuple['uid'] !== null){

				return true;
			} else {
				return false;
			}
		}
		public function getProductKey($adminUid, $uid){
			if(strcmp($adminUid, 'c818be9f-bdfc-474e-bf07-2199a9118542') == 0){
				$sql = "select p_key from pkeys where uid = '$uid'";
				$result = $this->conn->query($sql);
				$result->setFetchMode(PDO::FETCH_ASSOC);
				$tuple = $result->fetch();
				if($tuple['p_key'] !== null){
					return $tuple['p_key'];
				} else return false;
			} else return false;
		}

	}

?>
