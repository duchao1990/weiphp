<?php

namespace Addons\Pingpp;
use Common\Controller\Addon;

/**
 * Pingpp支付插件插件
 * @author 安心
 */

    class PingppAddon extends Addon{

        public $info = array(
            'name'=>'Pingpp',
            'title'=>'Pingpp支付插件',
            'description'=>'集合支付Pingpp使用',
            'status'=>1,
            'author'=>'安心',
            'version'=>'0.1',
            'has_adminlist'=>1
        );

	public function install() {
		$install_sql = './Addons/Pingpp/install.sql';
		if (file_exists ( $install_sql )) {
			execute_sql_file ( $install_sql );
		}
		return true;
	}
	public function uninstall() {
		$uninstall_sql = './Addons/Pingpp/uninstall.sql';
		if (file_exists ( $uninstall_sql )) {
			execute_sql_file ( $uninstall_sql );
		}
		return true;
	}

        //实现的weixin钩子方法
        public function weixin($param){

        }

    }