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

class SyuanController extends Controller
{
    function index(){
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
    
    function info(){
        $where['id']=I('get.id');
        $where['auth']=1;
        $temple=M('temple')->where($where)->field('id,temple,province,city,district')->find();
        $map['templeid']=I('get.id');
        $info=M('templeinfo')->where($map)->field('cover,content')->find();
        $temple['cover']=$info['cover'];
        $temple['content']=$info['content'];
        $this->assign('temple',$temple);
        $this->display();
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