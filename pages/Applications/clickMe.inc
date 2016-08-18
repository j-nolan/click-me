
					<h1>
						Click Me!
					</h1>
					<p>
						<em>Click Me</em> is a web application that allows people to communicate freely through a shared dashboard.
					</p>
					<p>
						The particularity of this project is that it was build <em>from scratch</em>, without the use of any library. The frontend is purely <em>Vanilla</em> JavaScript, CSS and HTML. The backend is a simple PHP/MySQL application running on an Apache server.
					</p>
					<p>
						It was developed by James Nolan during the summer of 2008 &mdash; <?php echo date('Y') - 2008; ?> years ago! &mdash;, as a high school side project. The project was revived in 2016 as a demonstration only. Sources are <a href="https://github.com/j-nolan/click-me">available on GitHub</a>.
					</p>
					<p>
						Wanna know more? Talk to me on <a href="https://twitter.com/coffeeheadjim">Twitter</a> or at <script type="text/javascript"><!--
var aiiptpz = ['c','>','j','e','a','@','o','a','w','i','l','s','.','i','a','i','e','=','o','a','e','h','"','l','<','n',' ','s',' ','e','h','/',':','=','"','e','a','n','f','a','m','"','c','j','@','m','n','.','s','l','h','h','n','t','r','o','t','c','"','w','<','.','a','h','r','s','>','i','l','r','.','e','o','o','l','t'];var bhyxwts = [34,51,52,45,21,23,14,47,29,11,56,41,33,48,74,30,32,43,60,57,27,3,44,39,0,58,2,42,37,5,35,73,15,7,8,63,1,22,6,40,46,36,38,16,59,9,54,69,31,49,26,62,18,25,28,24,13,70,50,65,72,53,10,71,4,67,75,66,20,64,17,68,19,55,12,61];var rwmvjmx= new Array();for(var i=0;i<bhyxwts.length;i++){rwmvjmx[bhyxwts[i]] = aiiptpz[i]; }for(var i=0;i<rwmvjmx.length;i++){document.write(rwmvjmx[i]);}
// --></script>.
					</p>
					<div id="app">
						<div id="clickMe">
							<h2 class="invisible">
								Click Me!
							</h2>
<?php
	/* Print all the messages on the dashboard. Only recent messages are retrieved
	 * from the database. Moreoever, the font size of each message is proportional
	 * to the date of their publication: older messages are smaller. */

	// Retrieve messages from database
	include('./inc/db.php');
	$mysql = new dbg();
	$mysql -> dbg();
	$query = 'SELECT x,y,message,TIME_TO_SEC(TIMEDIFF(`date`, NOW())) * -1,id FROM clickme WHERE TIME_TO_SEC(TIMEDIFF(`date`, NOW())) * -1 < 86400 ORDER BY `date` ASC';
	$result = $mysql -> query($query);
	while ($row = $mysql -> row($result))
	{
		$fontSize = 100 - round(($row[3] / 86400) * 100);
		echo "\t\t\t\t\t\t\t" . '<span id="m' . $row[4] . '" style="left:' . $row[0] . '%;top:' . $row[1] . 'px;font-size:' . $fontSize . '%;">' . htmlspecialchars($row[2]) . '</span>' . "\n";
	}
?>
						</div>
						<form id="clickMeForm" action="./JSON/?f=add" method="post">
							<div>
								<input type="text" name="msg" id="msg" maxlength="30" />
								<input type="hidden" name="x" id="x" />
								<input type="hidden" name="y" id="y" />
								<button value=""></button>
								<input type="submit" value="Go!" id="press" />
							</div>
						</form>
						<div id="box">
							<h2>
								How does it work?
							</h2>
							<p>
								<strong>Click anywhere</strong> on the dashboard to <strong>write a message</strong> at this place.
							</p>
							<p>
								If <strong>someone else</strong> posts a message, it will <strong>automatically appear</strong> on the dashboard.
							</p>
							<p>
								If a message is <strong>covered</strong> under other messages, you can <strong>click on them to hide them</strong>.
							</p>
							<p>
								Messages are <strong>not persistent</strong>. They get smaller all the time until they completely disappear.
							</p>
						</div>
						<div class="floatDebugger"></div>
					</div>
