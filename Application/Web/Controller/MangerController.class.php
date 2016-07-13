<?php
/**
 * Created by PhpStorm.
 * User: cucme
 * Date: 2016/7/12
 * Time: 08:47
 */

namespace Web\Controller;



class MangerController extends HomeController
{
    //寺庙管理页面发布
    function index(){
            $this->display();
    }

    function masterAuth(){
        if (IS_POST){
            $materCard=array(
                'templeCard'=>I('post.templeCard'),
                'templeNum'=>I('post.templeNum'),
                'idNum'=>I('post.idNum'),
                'idCard'=>I('post.idCard'),
                'auth'=>2
            );
            $map['id']=$this->masterid;
           $res= M('master')->where($map)->save($materCard);
            if ($res){
                $this->success('信息添加成功,请等待',U('Enter/verify'));
            }else{
                $this->error('信息添加失败,可能是信息和原来一样');
            }
        }else{
            $this->display();
        }
    }
    function templeAuth(){
        if (IS_POST){
            $templeCard=array(
                'huodongCard'=>I('post.huodongCard'),
                'huodongNum'=>I('post.huodongNum'),
                'zuzhiCard'=>I('post.zuzhiCard'),
                'zuzhiNum'=>I('post.zuzhiNum'),
                'kaihuCard'=>I('post.kaihuCard'),
                'kaihuNum'=>I('post.kaihuNum'),
                'auth'=>2
            );
            $map['id']=$this->templeid;
            $res= M('temple')->where($map)->save($templeCard);
            if ($res){
                $this->success('信息添加成功,请等待',U('Enter/verify'));
            }else{
                $this->error('信息添加失败,可能是信息和原来一样');
            }
        }else{
            $this->display();
        }
    }

}