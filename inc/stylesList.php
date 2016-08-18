			<?php
				$output = '';
				for ($n = 0; !empty($styles[$n]); $n++)
					$output .= '<li id="'. substr($styles[$n], 0, -4) .'">' . "\n\t\t\t\t\t" . '<a href="?CSS='. $styles[$n] .'">'. "\n\t\t\t\t\t\t$styles[$n]\n\t\t\t\t\t</a>\n\t\t\t\t</li>\n\t\t\t\t"; // Generate list
				$output = "<ul id=\"styles\">\n\t\t\t\t$output\n\t\t\t</ul>\n";
				echo $output;
?>