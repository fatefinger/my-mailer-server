CREATE TABLE   IF NOT EXISTS  mission_info (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mail_from` varchar(255) DEFAULT NULL,
  `mail_to` varchar(255) DEFAULT NULL,
  `mail_name` varchar(255) DEFAULT NULL,
  `cc` varchar(255) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `text` text DEFAULT NULL,
  `html` text DEFAULT NULL,
  `attachment` text DEFAULT NULL,
  `send_time` varchar(255) DEFAULT NULL,
  `create_time` varchar(255) DEFAULT NULL,
  `modified_time` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

