				</div>
			</div>
		</div>
		<div id="footer">
			&copy; 2008 - Otherwise.ch,
			<a href="https://validator.w3.org/check?uri=referer">
				xHTML 1 Valid
			</a>,
			<a href="https://jigsaw.w3.org/css-validator/check/referer">
				CSS 2.1 Valid
			</a>,
			<em>tentatively</em> Accessible,
			<cite>
				Jim Fecit
			</cite>.
		</div>
		<div id="gadgets">
			<?php
				$output = '';
				for ($n = 0; !empty($styles[$n]); $n++)
					$output .= '<li id="'. substr($styles[$n], 0, -4) .'">' . "\n\t\t\t\t\t" . '<a href="?CSS='. $styles[$n] .'">'. "\n\t\t\t\t\t\t$styles[$n]\n\t\t\t\t\t</a>\n\t\t\t\t</li>\n\t\t\t\t"; // Generate list
				$output = "<ul id=\"styles\">\n\t\t\t\t$output\n\t\t\t</ul>\n";
				echo $output;
?>
		</div>
	</body>
</html>