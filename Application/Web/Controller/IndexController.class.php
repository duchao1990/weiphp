<?php
// +----------------------------------------------------------------------
// | OneThink [ WE CAN DO IT JUST THINK IT ]
// +----------------------------------------------------------------------
// | Copyright (c) 2013 http://www.onethink.cn All rights reserved.
// +----------------------------------------------------------------------
// | Author: 麦当苗儿 <zuojiazi@vip.qq.com> <http://www.zjzit.cn>
// +----------------------------------------------------------------------

namespace Web\Controller;
use Think\Controller;
use Think\MyPage;
/**
 * 前台首页控制器
 * 主要获取首页聚合数据
 */
class IndexController extends Controller {

	//系统首页
    public function index(){
        $this->display();
    }
    //寺院管理
    function enter(){
        $this->display();
    }

    //根据添加表单的信息进入不同的页面
    function allView(){
        $keyword=I('keyword');

        if($keyword){
            $map['temple']=array('like',"%$keyword%");
        }
        $map['auth']=1;
        $TempleModel=M('Temple');
        $timodel=M('templeinfo');
        $total=$TempleModel->where($map)->count();
        $Page=new MyPage($total,12);
        $show=$Page->show();
        $dataList= $TempleModel->where($map)->limit($Page->firstRow.','.$Page->listRows)->field('id,temple,auth')->select();
        foreach ($dataList as $key => $value) {
            $where['templeid']=$value['id'];
            $dataList[$key]['cover']=$timodel->where($where)->getField('cover');
        }

        $this->assign('page',$show);
        $this->assign('dataList',$dataList);
        $this->display();
    }
}