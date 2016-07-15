<?php
/**
 * Created by PhpStorm.
 * User: cucme
 * Date: 2016/6/30
 * Time: 10:39
 */

namespace Web\Controller;

class EnterController extends HomeController
{

    //资质审核结果
    function verify(){
        $master = M('master')->where('id=' . $this->masterid)->field('id,master,templeid,auth,idCard,idNum,templeCard,templeNum')->find();
        $temple = M('temple')->where('id=' . $master['templeid'])->field('id,huodongCard,huodongNum,zuzhiCard,zuzhiNum,kaihuCard,kaihuNum,authNum,auth')->find();
        $this->assign('master', $master);
        $this->assign('temple', $temple);
        $this->display();
    }


}