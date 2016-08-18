<?php
	include('config.php');
	class dbg
	{
		function dbg($db_host = DB_HOST, $db_nick = DB_USER,
			$db_pass = DB_PASS, $db_name = DB_NAME)
		{
			$this->link = @mysql_connect($db_host,$db_nick,$db_pass);
			if ($this->link)
			{
				if (@mysql_select_db($db_name,$this->link))
					return $this->link;
			}
		}
		function query($query)
		{
			$this->result = @mysql_query($query,$this->link);
			if ($this->result)
				return $this->result;
			else
				return false;
		}
		function assoc($id = 0)
		{
			if ($id)
				return @mysql_fetch_assoc($id);
			else
				return false;
		}
		function row($id = 0)
		{
			if ($id)
				return @mysql_fetch_row($id);
			else
				return false;
		}
		function result($id = 0, $row = 0)
		{
			if ($id)
				return @mysql_result($id,$row);
			else
				return false;
		}
		function n_rows($id = 0)
		{
			if ($id)
				return @mysql_num_rows($id);
			else
				return false;
		}
	}
?>
