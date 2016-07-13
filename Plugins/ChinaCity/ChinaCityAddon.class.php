<?php

namespace Plugins\ChinaCity;
use Common\Controller\Plugin;

/**
 * 中国城市列表插件
 * @author 安心
 */

    class ChinaCityAddon extends Plugin{

        public $info = array(
            'name'=>'ChinaCity',
            'title'=>'中国城市列表',
            'description'=>'这是一个临时描述',
            'status'=>1,
            'author'=>'安心',
            'version'=>'1.2',
            'has_adminlist'=>0
        );

	public function install() {
		$install_sql = './Plugins/ChinaCity/install.sql';
		if (file_exists ( $install_sql )) {
			execute_sql_file ( $install_sql );
		}
		return true;
	}
	public function uninstall() {
		$uninstall_sql = './Plugins/ChinaCity/uninstall.sql';
		if (file_exists ( $uninstall_sql )) {
			execute_sql_file ( $uninstall_sql );
		}
		return true;
	}

        //实现的J_China_City钩子方法
        public function J_China_City($param){
            $this->assign('param', $param);
            $this->display('chinacity');
        }

    }