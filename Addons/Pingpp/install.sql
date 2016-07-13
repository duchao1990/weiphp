CREATE TABLE `wp_pingpp_set` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`token` VARCHAR(255) NOT NULL,
	`pingsk` VARCHAR(255) NOT NULL,
	`pingid` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`id`)
)
COLLATE='utf8_general_ci'ENGINE=MyISAM;

INSERT INTO `wp_model` (`name`, `title`, `extend`, `relation`, `need_pk`, `field_sort`, `field_group`, `attribute_list`, `template_list`, `template_add`, `template_edit`, `list_grid`, `list_row`, `search_key`, `search_list`, `create_time`, `update_time`, `status`, `engine_type`, `addon`) VALUES ('pingpp_set', 'ping++ 配置设置', 0, '', 1, '["pingsk","pingid"]', '1:基础', NULL, '', '', '', 'pingsk:ping++ (Secret Key)pingid:应用ID值', 10, 'pingid:输入应用id', '', 1465875141, 1465875141, 1, 'MyISAM', 'Pingpp');
INSERT INTO `wp_attribute` (`name`,`title`,`field`,`type`,`value`,`remark`,`is_show`,`extra`,`model_id`,`is_must`,`status`,`update_time`,`create_time`,`validate_rule`,`validate_time`,`error_info`,`validate_type`,`auto_rule`,`auto_time`,`auto_type`) VALUES ('pingsk','ping++ (Secret Key)','varchar(255) NOT NULL','string','','','1','','0','0','1','1439976366','1420596373','','3','','','','3','function');
INSERT INTO `wp_attribute` (`name`,`title`,`field`,`type`,`value`,`remark`,`is_show`,`extra`,`model_id`,`is_must`,`status`,`update_time`,`create_time`,`validate_rule`,`validate_time`,`error_info`,`validate_type`,`auto_rule`,`auto_time`,`auto_type`) VALUES ('pingid','应用ID值','varchar(100) NOT NULL','string','','','1','','0','0','1','1420596415','1420596415','','3','','','','3','function');
INSERT INTO `wp_attribute` (`name`,`title`,`field`,`type`,`value`,`remark`,`is_show`,`extra`,`model_id`,`is_must`,`status`,`update_time`,`create_time`,`validate_rule`,`validate_time`,`error_info`,`validate_type`,`auto_rule`,`auto_time`,`auto_type`) VALUES ('token','token','varchar(255) NULL','string','','','0','','0','0','1','1436436415','1436436415','','3','','regex','','3','function');

UPDATE `wp_attribute` SET model_id= (SELECT MAX(id) FROM `wp_model`) WHERE model_id=0;
CREATE TABLE `wp_pingpp_order` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`paytype` VARCHAR(255) NOT NULL,
	`ordername` VARCHAR(255) NOT NULL,
	`orderid` INT(11) NOT NULL,
	`price` DECIMAL(10,2) NOT NULL,
	`goodsnum` INT(11) NOT NULL,
	`goodsid` INT(11) NOT NULL,
	`uid` INT(11) NOT NULL,
	`createtime` INT(11) NULL DEFAULT NULL COMMENT '创建订单时间',
	`paytime` INT(11) NULL DEFAULT NULL COMMENT '支付时间',
	`payok` TINYINT(1) NOT NULL DEFAULT '0' COMMENT '是否支付成功',
	PRIMARY KEY (`id`)
)
COLLATE='utf8_general_ci'ENGINE=MyISAM;
INSERT INTO `wp_model` (`name`,`title`,`extend`,`relation`,`need_pk`,`field_sort`,`field_group`,`attribute_list`,`template_list`,`template_add`,`template_edit`,`list_grid`,`list_row`,`search_key`,`search_list`,`create_time`,`update_time`,`status`,`engine_type`,`addon`) VALUES ('pingpp_order','订单支付记录','0','','1','["ordername","orderid","price","goodsnum","goodsid","paytype","paytime","payok","uid"]','1:基础','','','','','','20','','','1420596259','1423534012','1','MyISAM','Pingpp');
INSERT INTO `wp_attribute` (`name`,`title`,`field`,`type`,`value`,`remark`,`is_show`,`extra`,`model_id`,`is_must`,`status`,`update_time`,`create_time`,`validate_rule`,`validate_time`,`error_info`,`validate_type`,`auto_rule`,`auto_time`,`auto_type`) VALUES ('ordername','订单名称','varchar(255) NULL','string','','','1','','0','0','1','1439976366','1420596373','','3','','regex','','3','function');
INSERT INTO `wp_attribute` (`name`,`title`,`field`,`type`,`value`,`remark`,`is_show`,`extra`,`model_id`,`is_must`,`status`,`update_time`,`create_time`,`validate_rule`,`validate_time`,`error_info`,`validate_type`,`auto_rule`,`auto_time`,`auto_type`) VALUES ('orderid','订单号','varchar(100) NOT NULL','string','','','1','','0','0','1','1420596415','1420596415','','3','','regex','','3','function');
INSERT INTO `wp_attribute` (`name`,`title`,`field`,`type`,`value`,`remark`,`is_show`,`extra`,`model_id`,`is_must`,`status`,`update_time`,`create_time`,`validate_rule`,`validate_time`,`error_info`,`validate_type`,`auto_rule`,`auto_time`,`auto_type`) VALUES ('price','价格','decimal(10,2) NULL','num','','','1','','0','0','1','1439812508','1420596472','','3','','regex','','3','function');
INSERT INTO `wp_attribute` (`name`,`title`,`field`,`type`,`value`,`remark`,`is_show`,`extra`,`model_id`,`is_must`,`status`,`update_time`,`create_time`,`validate_rule`,`validate_time`,`error_info`,`validate_type`,`auto_rule`,`auto_time`,`auto_type`) VALUES ('goodsnum','购买数量','varchar(100) NOT NULL','string','','','1','','0','0','1','1420596492','1420596492','','3','','regex','','3','function');
INSERT INTO `wp_attribute` (`name`,`title`,`field`,`type`,`value`,`remark`,`is_show`,`extra`,`model_id`,`is_must`,`status`,`update_time`,`create_time`,`validate_rule`,`validate_time`,`error_info`,`validate_type`,`auto_rule`,`auto_time`,`auto_type`) VALUES ('goodsid','商品ID','varchar(200) NOT NULL','string','','','1','','0','0','1','1420596530','1420596530','','3','','regex','','3','function');
INSERT INTO `wp_attribute` (`name`,`title`,`field`,`type`,`value`,`remark`,`is_show`,`extra`,`model_id`,`is_must`,`status`,`update_time`,`create_time`,`validate_rule`,`validate_time`,`error_info`,`validate_type`,`auto_rule`,`auto_time`,`auto_type`) VALUES ('paytype','支付方式','varchar(30) NOT NULL','string','','','1','','0','0','1','1420596929','1420596929','','3','','regex','','3','function');
INSERT INTO `wp_attribute` (`name`,`title`,`field`,`type`,`value`,`remark`,`is_show`,`extra`,`model_id`,`is_must`,`status`,`update_time`,`create_time`,`validate_rule`,`validate_time`,`error_info`,`validate_type`,`auto_rule`,`auto_time`,`auto_type`) VALUES ('payok','支付状态','tinyint(2) NOT NULL','bool','0','','1','0:未支付\r\n1:已支付\r\n2:支付失败','0','0','1','1420597026','1420597026','','3','','regex','','3','function');
INSERT INTO `wp_attribute` (`name`,`title`,`field`,`type`,`value`,`remark`,`is_show`,`extra`,`model_id`,`is_must`,`status`,`update_time`,`create_time`,`validate_rule`,`validate_time`,`error_info`,`validate_type`,`auto_rule`,`auto_time`,`auto_type`) VALUES ('paytime','支付时间','int(10) NULL','num','','','0','','0','0','1','1445253482','1445253482','','3','','regex','','3','function');
INSERT INTO `wp_attribute` (`name`,`title`,`field`,`type`,`value`,`remark`,`is_show`,`extra`,`model_id`,`is_must`,`status`,`update_time`,`create_time`,`validate_rule`,`validate_time`,`error_info`,`validate_type`,`auto_rule`,`auto_time`,`auto_type`) VALUES ('uid','用户uid','int(10) NULL','num','','','0','','0','0','1','1445255505','1445255505','','3','','regex','','3','function');
UPDATE `wp_attribute` SET model_id= (SELECT MAX(id) FROM `wp_model`) WHERE model_id=0;
