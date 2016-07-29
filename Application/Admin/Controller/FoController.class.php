<?php
/**
 * Created by PhpStorm.
 * User: cucme
 * Date: 2016/7/29
 * Time: 10:00
 */

namespace Admin\Controller;


class FoController extends AdminController
{
    //佛像管理
    function index(){

        $this->display();
    }

    function indexAjax(){
        $where['cate']=array('in','1,2');
        $list=M('gongfo')->where($where)->select();
        $this->ajaxReturn($list);
    }

    function foAdd(){
        if (IS_POST){
            $infoid=I('post.id');
            $data=array(
                'cate'=>I('post.cate'),
                'title'=>I('post.title'),
                'cover'=>I('post.cover'),
                'img'=>I('post.img'),
                'description'=>I('post.description'),
                'display'=>I('post.display'),
                'cTime'=>time()
                );
            $gFModel=M('gongfo');
            if ($infoid) {
                $where['id']=$infoid;
               $res=$gFModel->where($where)->save($data); 
            }else{
                $res=$gFModel->add($data);
            }
           if ($res) {
               $this->success('操作成功',U('index'));
           }else{
            $this->error('操作失败');
           }
        }else{
            $this->display();
        }
    }
}