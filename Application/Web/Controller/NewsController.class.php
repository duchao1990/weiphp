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

    function add(){
        if (IS_POST){
            $data=array(
                'cover'=>I('post.newsCover'),
                'title'=>I('post.title'),
                'keyword'=>I('post.keyword'),
                'intro'=>I('post.intro'),
                'content'=>I('post.content'),
                'cTime'=>time(),
                'token'=>'gh_b0fd347506da',
                'author'=>$this->masterid,
                'cate_id'=>I('post.cate_id',1,'intval')
            );
            if (I('post.newsid',0,'intval')!==0){
                $where['id']=I('post.newsid',0,'intval');
                $res=M('custom_reply_news')->save($data);
            }else{
                $res=M('custom_reply_news')->add($data);
            }
            if ($res){
                $this->success('发布成功',U('Plat/index'));
            }else{
                $this->error('发布失败');
            }
        }else{
            $where['id']=I('get.newsid');
            $info=M('custom_reply_news')->where($where)->find();
            $this->assign('data',$info);
            $this->display();
        }
    }

    function infoList(){
        $this->display('list');
    }
    
    function listAjax(){
        $where['author']=$this->masterid;
        $where['token']='gh_b0fd347506da';

       $newsList=M('custom_reply_news')->where($where)->field('id,title,cTime,view_count,cate_id')->select();

        if ($newsList){
            exit(json_encode($newsList));
        }
    }
}