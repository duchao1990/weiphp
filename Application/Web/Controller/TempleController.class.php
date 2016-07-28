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

class TempleController extends WebController
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
    
    function addTempleInfo(){
        if (IS_POST){
            $temInfoModel=M('templeinfo');
            $where['templeid']=$this->templeid;
            $is_have=$temInfoModel->where($where)->find();
            $data=array(
                'cover'=>I('post.newsCover'),
                'content'=>I('post.content'),
                'templeid'=>$this->templeid
            );

            if ($is_have){
                $res=$temInfoModel->where($where)->save($data);
            }else{
                $res=M('templeinfo')->add($data);
            }
            if ($res){
                $this->success('添加成功',U('Plat/index'));
            }else{
                $this->error('添加失败');
            }
        }else{
            $where['templeid']=$this->templeid;
            $info=M('templeinfo')->where($where)->find();
            $this->assign('data',$info);
            $this->assign('title','寺院介绍');
            $this->display('add');
        }
    }


    function addMasterInfo(){
        if (IS_POST){
            $temInfoModel=M('templeinfo');
            $where['masterid']=$this->masterid;
            $is_have=$temInfoModel->where($where)->find();
            $data=array(
                'cover'=>I('post.newsCover'),
                'content'=>I('post.content'),
                'masterid'=>$this->masterid
            );
            if ($is_have){
                $res=$temInfoModel->where($where)->save($data);
            }else{
                $res=M('templeinfo')->add($data);
            }

            if ($res){
                $this->success('添加成功',U('Plat/index'));
            }else{
                $this->error('添加失败');
            }
        }else{
            $where['masterid']=$this->masterid;
            $info=M('templeinfo')->where($where)->find();
            $this->assign('data',$info);
            $this->assign('title','法师介绍');
            $this->display('add');
        }
    }
}