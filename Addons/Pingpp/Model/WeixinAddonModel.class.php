<?php
        	
namespace Addons\Pingpp\Model;
use Home\Model\WeixinModel;
        	
/**
 * Pingpp的微信模型
 */
class WeixinAddonModel extends WeixinModel{
	function reply($dataArr, $keywordArr = array()) {
		$config = getAddonConfig ( 'Pingpp' ); // 获取后台插件的配置参数

	}
}
        	