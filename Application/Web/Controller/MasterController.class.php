<?php
/**
 * Created by PhpStorm.
 * User: cucme
 * Date: 2016/7/15
 * Time: 09:53
 */

namespace Web\Controller;


class MasterController extends WebController
{
    function lists(){
        $where['templeid']=$this->templeid;
        $list=M('master')->where($where)->select();
        dump($list);
        die;
        $this->assign('list',$list);
        $this->display();
    }
}