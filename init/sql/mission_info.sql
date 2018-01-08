CREATE TABLE   IF NOT EXISTS  `mission_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mail_from` varchar(255) DEFAULT NULL,
  `mail_to` varchar(255) DEFAULT NULL,
  `cc` varchar(255) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `text` longtext DEFAULT NULL,
  `html` longtext DEFAULT NULL,
  `attachment` varchar(255) DEFAULT NULL,
  `send_time` varchar(20) DEFAULT NULL,
  `create_time` varchar(20) DEFAULT NULL,
  `modified_time` varchar(20) DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `mission_info` set mail_from='15601752941@example.com', mail_to='yangfan@kedacom.com', cc='yangfan@kedacom.com', subject='这是测试', text='这是一封测试邮件', html='<h1>这是测试</h1>' ;
