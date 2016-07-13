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


            $this->masterid = session('masterid');
            $master = M('master')->where('id=' . $this->masterid)->field('templeid,auth')->find();
            $templeAuth = M('temple')->where('id=' . $master['auth'])->getField('auth');
            if ($master['auth'] != 1 && $templeAuth != 1) {
                $this->redirect('Enter/verify');
            }
    }
}