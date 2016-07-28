<?php
/**
 * Created by PhpStorm.
 * User: cucme
 * Date: 2016/7/26
 * Time: 11:49
 */

namespace Web\Controller;


use Think\Controller;
use Think\MyPage;

class GanwuController extends Controller
{
    function index(){
        $keyword=I('keyword');

        if($keyword){
            $map['temple']=array('like',"%$keyword%");
        }
        $map['is_show']=1;
        $map['cate_id']=2;
        $CrnModel=M('custom_reply_news');
        $total=$CrnModel->where($map)->count();
        $Page=new MyPage($total,12);
        $show=$Page->show();
        $dataList= $CrnModel->where($map)->limit($Page->firstRow.','.$Page->listRows)->select();
        $this->assign('page',$show);
        $this->assign('dataList',$dataList);
        $this->display();
    }

    function info(){
        $where['id']=I('get.id');
        $where['is_show']=1;
        $info=M('custom_reply_news')->where($where)->find();
        if (is_numeric($info['author'])) {
            $masterWhere['id']=$info['author'];
            $matser=M('master')->where($masterWhere)->getField('master');
            $info['author']=$matser;
        } else {
           $info['author']='天天佛官方 ';
        }
        

        $this->assign('info',$info);
        $this->display();
    }
}