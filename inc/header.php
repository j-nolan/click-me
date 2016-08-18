<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="fr" lang="fr">
	<head>
		<title>
			Otherwise.ch
		</title>
		<link rel="stylesheet" type="text/css" media="screen" href="./styles/default.css" />
		<?php
			$CSS = $_COOKIE['phpStyle']; // Style is in Cookie?
			if (!empty($_GET['CSS'])) // Style is in url?
				$CSS = $_GET['CSS'];
			if (empty($CSS)
			|| !file_exists('./styles/' . $CSS)
			|| !ereg('^([[:alnum:]]|\.)+$', $CSS)) // Style is no good?
				$CSS = 'blue.css'; // Default
			$dir = opendir('./styles');
			$styles = array();
			$output = '';
			for ($n = 0; $file = readdir($dir); $n++) // list all CSS in /styles
			{
				if (is_file('./styles/' . $file)
				&& $file != 'default.css')
				{
					$styles[$n] = $file;
					if ($CSS == $file)
						$a = '';
					else
						$a = 'alternate '; // alternate stylesheet if not chosen
					$output .= '<link rel="'. $a .'stylesheet" type="text/css" media="screen" href="./styles/'. $file .'" title="'. $file .'" />' . "\n\t\t";
				}
				else
					$n--;
			}
			closedir($dir);
			setcookie('phpStyle', $CSS, time() + 3600 * 24 * 365);
			echo $output;
?>
<script type="text/javascript" src="./scripts/objects.js"></script>
		<script type="text/javascript" src="./scripts/prototypes.js"></script>
		<script type="text/javascript" src="./scripts/scripts.js"></script>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
		<meta name="Author" content="Jim N." />
		<meta name="Description" content="Otherwise: l'alternative. Bienvenue dans la communaut&eacute;!" />
		<meta name="keywords" content="communaut&eacute;, interactif, interactive, xhtml valid, respect standards" />
		<meta name="expires" content="never" />
		<meta name="language" content="fr" />
	</head>
	<body>
		<div id="xml">
			<div id="content">
				<div id="header">
				</div>
				<div id="mainContent">