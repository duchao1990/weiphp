<?php
/**
 * Created by PhpStorm.
 * User: cucme
 * Date: 2016/6/30
 * Time: 09:48
 */

namespace Web\Controller;


use Think\Controller;
use Think\MyPage;

class TempleController extends Controller
{
    function index(){
        $keyword=I('keyword');

        if($keyword){
            $map['public']=array('like',"%$keyword%");
        }
        $map['is_die']=0;
        $pubModel=M('Temple');
        $total=$pubModel->where($map)->count();

        $Page=new MyPage($total,12);
        $show=$Page->show();
        $dataList=  $pubModel->where($map)->limit($Page->firstRow.','.$Page->listRows)->find();
            foreach ($dataList as $index => $item) {
                $item=json_decode($item,true);
                $item['WeiSite']['cover']=get_picture_url($item['WeiSite']['cover']);
                $item['WeiSite']['id']=$index;
                $dataList[$index]=$item['WeiSite'];

            }

        $this->assign('page',$show);
        $this->assign('dataList',$dataList);
        $this->display();
    }
    
    function add(){
        if (IS_POST){
            
        }else{
            $this->display();
        }
    }

}