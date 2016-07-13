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

/**
 * 前台首页控制器
 * 主要获取首页聚合数据
 */
class IndexController extends Controller {

	//系统首页
    public function index(){

//        $category = D('Category')->getTree();
//        $lists    = D('Document')->lists(null);
//
//        $this->assign('category',$category);//栏目
//        $this->assign('lists',$lists);//列表
//        $this->assign('page',D('Document')->page);//分页

                 
        $this->display();
    }
    //寺院管理
    function enter(){
        $this->display();
    }

    //根据添加表单的信息进入不同的页面
    function addForm(){
        if (IS_AJAX){
            $templeData=array(
                'temple'=>I('post.temple'),
                'province'=>I('post.province'),
                'city'=>I('post.city'),
                'district'=>I('post.district'),
                'authNum'=>date('YmdHis')
            );
            $salt=salt();
            $templeModel=M('temple');
            $templeId=$templeModel->add($templeData);
            if ($templeId){
                $userData=array(
                    'mobile'=>I('post.mobile'),
                    'master'=>I('post.master'),
                    'templeid'=>$templeId,
                    'salt'=>$salt,
                    'pwd'=>createPwd(I('post.mobile'),$salt)
                );
                $masterid=M('master')->add($userData);
                if ($masterid){
                    $map['id']=intval($templeId);
                    $res=$templeModel->where($map)->save(array('masterid'=>$masterid));
                    if ($res){

                        $this->success('登记成功,请上传认证资料',U('auth'));
                    }else{
                        $this->error('寺院更新失败,请联系客服');
                    }
                }else{
                    $this->error('用户登记失败,请联系客服');
                }
            }else{
                $this->error('寺院登记失败,请联系客服');
            }
        }else{
            $this->display();
        }

    }
}