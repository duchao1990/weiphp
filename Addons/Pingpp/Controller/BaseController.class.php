<?php
/**
 * Created by PhpStorm.
 * User: cucme
 * Date: 2016/6/15
 * Time: 10:28
 */

namespace Addons\Pingpp\Controller;


use Home\Controller\AddonsController;

class BaseController extends AddonsController
{
    var $config;
    function _initialize() {
        parent::_initialize ();

        $controller = strtolower ( _CONTROLLER );
        $action = strtolower ( _ACTION );

        $res ['title'] = '支付配置';
        $res ['url'] = addons_url ( 'Pingpp://Pingpp/lists' ,array('mdm'=>I('mdm')));
        $res ['class'] = $action == 'lists' ? 'current' : '';
        $nav [] = $res;

        $res ['title'] = '功能配置';
        $res ['url'] = addons_url ( 'Pingpp://Pingpp/config' ,array('mdm'=>I('mdm')));
        $res ['class'] = $action == 'config' ? 'current' : '';
        $nav [] = $res;

        $this->assign ( 'nav', $nav );

        $config = getAddonConfig ( 'Pingpp' );
//        dump($config);
        $config ['cover_url'] = get_cover_url ( $config ['cover'] );
        $config ['background'] = get_cover_url ( $config ['background'] );
        $this->config = $config;
        $this->assign ( 'config', $config );

        // 定义模板常量
        $act = strtolower ( _ACTION );
        $temp = $config ['template_' . $act];
        $act = ucfirst ( $act );

        define ( 'CUSTOM_TEMPLATE_PATH', ONETHINK_ADDON_PATH . 'Pingpp/View/default/Template' );
    }
}