<?php
	# Disable error reporting for production installations
	// error_reporting(0);

	# Load configuration file
	include('./inc/config.php');

	/* Loads the right file to display the requested page. It returns false if
	 * the file corresponding to the file to show do not exist */
	function pageGen($page = 'Applications/clickMe')
	{
		if (ereg('^([[:alnum:]]|/)+$', $page)
		&& file_exists("./pages/$page.inc"))
		{
			include('./inc/header.php');
			include("./pages/$page.inc");
			include('./inc/footer.php');
		}
		else return false;
	}

	# The requested page is typically sent using the "focus" GET parameter.
	# If this parameter is not set, the default behaviour is to display the
	# ClickMe application.
	if (isset($_GET['focus']))
		pageGen($_GET['focus']);
	else pageGen();
?>