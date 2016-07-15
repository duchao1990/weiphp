<?php
/**
 * Created by PhpStorm.
 * User: cucme
 * Date: 2016/7/12
 * Time: 11:09
 */

namespace Web\Controller;


class WebController extends HomeController
{
    protected function _initialize()
    {
        $config = api('Config/lists');
        C($config); //添加配置

        if (!C('WEB_SITE_CLOSE')) {
            $this->error('站点已经关闭，请稍后访问~');
        }

        if (session('masterid')) {
            $this->masterid = session('masterid');
            $this->templeid	= session('templeid');
            $master = M('master')->where('id=' . $this->masterid)->field('templeid,auth')->find();
            $templeAuth = M('temple')->where('id=' . $master['auth'])->getField('auth');
            if ($master['auth'] != 1 && $templeAuth != 1) {
                $this->redirect('Enter/verify');
            }
        } else {
            $this->error('您还没有登录，请先登录！', U('User/login'));
        }


    }
}