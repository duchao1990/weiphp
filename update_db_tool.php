<?php
if (! defined ( 'IN_WEIPHP_ADMIN' )) {
	echo '该文件不能直接通过地址访问执行，请进入: 后台》系统》在线升级 的页面里点击“升级数据库”按钮即可';
	exit ();
}
set_time_limit ( 0 );
$prefix = C ( 'DB_PREFIX' );

$config_map ['name'] = 'SYSTEM_UPDATRE_VERSION';


// 更新本地版本号
$res = M ( 'config' )->where ( $config_map )->setField ( 'value', 20160615 );
S ( 'DB_CONFIG_DATA', null );

$this->success ( '操作完成' );