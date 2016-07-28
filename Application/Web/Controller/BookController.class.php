<?php
/**
 * Created by PhpStorm.
 * User: cucme
 * Date: 2016/7/27
 * Time: 08:44
 */

namespace Web\Controller;


use Think\Controller;

class BookController  extends Controller
{
    function index(){
    	$cate=M('category')->where($where)->select();
    	$docModel=M('document');
    	$list=array();
    	foreach ($cate as $key => $value) {
    		$where['category_id']=$value['id'];
    		$list[$key]['title']=$value['title'];
    		$list[$key]['cateList']=$docModel->where($where)->field('id,title,cover_id')->select();
    	}
    	$this->assign('list',$list);
        $this->display();
    }

    function info(){
    	$where['id']=I('get.id');
    	$doc=M('document_article')->where($where)->find();
    	// dump($doc);
    	// die;
    	$this->assign('info',$doc);
        $this->display();
    }

}