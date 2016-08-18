
CREATE TABLE `clickme` (
  `x` int(11) NOT NULL,
  `y` int(11) NOT NULL,
  `message` varchar(30) NOT NULL,
  `id` int(10) UNSIGNED NOT NULL,
  `date` datetime NOT NULL,
  `ip` varchar(15) NOT NULL
) CHARSET=utf8;

ALTER TABLE `clickme`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `clickme`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
