<?php
/**
 * Created by PhpStorm.
 * User: cucme
 * Date: 2016/7/4
 * Time: 10:21
 */

namespace Web\Controller;


use Think\MyPage;

class NewsController extends HomeController
{
    function index(){
        $map['is_show']=1;
        $newsModel=M('custom_reply_news');
        $total=$newsModel->where($map)->count();
        $Page=new MyPage($total,12);
        $show=$Page->show();

        $dataList=$newsModel->where($map)->field('id,title,cover,cTime')->order('cTime desc')->limit($Page->firstRow.','.$Page->listRows)->select();

        foreach ($dataList as $index => $item) {
            $dataList[$index]['cover']=get_picture_url($item['cover']);
        }
        $this->assign('page',$show);
        $this->assign('dataList',$dataList);
        $this->display();
    }


    function info(){
        $id=I('get.id');
        $map['id']=$id;
        $newsModel=M('custom_reply_news');
        $nowInfo=$newsModel->where($map)->find();

        $map['id']=array('GT',$id);
        $maxInfo=$newsModel->where($map)->field('id,title')->limit(1)->find();
        $map['id']=array('LT',$id);
        $minInfo=$newsModel->where($map)->order('cTime desc')->field('id,title')->limit(1)->find();
        $this->assign('maxInfo',$maxInfo);
        $this->assign('minInfo',$minInfo);
        $this->assign('info',$nowInfo);
        $this->display();

    }
}