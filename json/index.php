<?php
	# configs
	header('Content-Type: text/plain');
	header('Pragma:no-cache');
	header('Cache-Control:no-cache');
	require_once('../inc/errLogger.php');
	# functions
	function addMsg($x = NULL, $y = NULL, $msg = NULL)
	{
		# random position if not specified
		if (!(is_numeric($x)
		&& is_numeric($y)
		&& $x < 100
		&& $x >= 0
		&& $y < 371
		&& $y >=0))
		{
			srand();
			$x = rand(0, 100);
			$y = rand(0, 371);
		}
		# 0 < message <= 30
		if (!strlen($msg) > 0)
			return false;
		if (strlen($msg) > 30)
			return JSONGen('Erreur : Message trop long! 30 caractères max.');
		# insert into DB
		require_once('../inc/db.php');
		$mysql = new dbg();
		$mysql -> dbg();
		$msg = mysql_real_escape_string($msg);
		$query = sprintf("INSERT INTO clickme VALUES (%d, %d, '%s', '', now(), '%s')", $x, $y, $msg, $_SERVER['REMOTE_ADDR']);
		$mysql -> query($query);
		if (mysql_affected_rows() < 1)
			return JSONGen('Erreur MySQL. Contacter l administrateur pour plus d informations.');
		JSONGen($msg, $x, $y, mysql_insert_id());
		mysql_close();
	}
	function JSONGen($msg, $x = NULL, $y = NULL, $id = NULL)
	{
		if (!empty($_POST))
		{
			header("Location:{$_SERVER['HTTP_HOST']} . /?focus=clickMe");
			return true;
		}
		# if xy values not used, $msg must be an error
		if (!$x)
		{
			printf("{fn:function(){oClickMe.fnConfirm();},nX:-1,nY:-1,sMsg:'%s'}", addslashes($msg));
			return false;
		}
		else
		{
			printf("{fn:function(){oClickMe.fnConfirm();},nId:%d,nX:%d,nY:%d,sMsg:'%s'}", $id, $x, $y, $msg);
			return true;
		}
	}
	function updateData($last)
	{
		$last = sprintf('%d',$last);
		if (!empty($last))
		{
			# get data from db
			require_once('../inc/db.php');
			$mysql = new dbg();
			$mysql -> dbg();
			$query = "SELECT id,x,y,message,TIME_TO_SEC(TIMEDIFF(`date`, NOW())) * -1 FROM `clickme` WHERE `id` > $last AND TIME_TO_SEC(TIMEDIFF(`date`, NOW())) * -1 < 86400";
			$result = $mysql -> query($query);
			$results = array();
			while ($row = $mysql -> row($result))
				$results[] = array($row[0], $row[1], $row[2], $row[3], $row[4]);
			mysql_close();
			JSONUpdateGen($results);
		}
	}
	function JSONUpdateGen($data)
	{
		if (count($data) > 0)
		{
			print('{fn:function(){oClickMe.fnUpdateConfirm();},oMsg:[');
			$buffer = NULL;
			for ($n = 0; $data[$n]; $n++)
				$buffer .= sprintf("{nId:%d,nX:%d,nY:%d,sMsg:'%s',nSince:%d},", $data[$n][0], $data[$n][1], $data[$n][2], addslashes($data[$n][3]), 100 - round(($data[$n][4] / 86400) * 100));
			print(substr($buffer, 0, -1));
			print(']}');
		}
	}
	function checkIpAdd($address)
	{
		require_once('../inc/db.php');
		$mysql = new dbg();
		$mysql -> dbg();
		$query = "SELECT TIME_TO_SEC(TIMEDIFF(`date`, NOW())) * -1 FROM `clickme` WHERE `nick` = '$address' ORDER BY `date` DESC LIMIT 0,1";
		$result = $mysql -> query($query);
		$time = $mysql -> result($result);
		if (empty($time) || $time > 15)
		{
			return true;
		}
		else
			JSONGen('Oops ! Moins vite !');
	}
	# script
	if ($_GET['f'] == 'add' && checkIpAdd($_SERVER['REMOTE_ADDR']))
	{
		addMsg($_GET['x'], $_GET['y'], trim($_GET['msg']));
	}
	else if ($_GET['f'] == 'update' && is_numeric($_GET['last']))
	{
		updateData($_GET['last']);
	}
?>