<?php
/**
 * Created by PhpStorm.
 * User: cucme
 * Date: 2016/7/12
 * Time: 18:08
 */

namespace Admin\Controller;


class VerifyController extends AdminController
{
    function index(){
        $masterVM=D('MasterView');
        $map=array();
        $list=$masterVM->where($map)->select();
        $this->assign('list',$list);
        $this->display();
    }

    function masterInfo(){
        $masterid=I('get.masterid',0,'intval');
        $masterVM=D('MasterView');
        $where['id']=$masterid;

        $masterInfo=$masterVM->where($where)->find();
        $this->assign('masterInfo',$masterInfo);
        $this->display();
    }
    
    function masterVerify(){
        if (IS_POST){
            $where['id']=I('post.masterId',0,'intval');
            $data=array(
                'verifyContent'=>trim(I('post.verifyContent')),
                'auth'=>I('post.verifyIdea',0,'intval')
            );

           $res= M('master')->where($where)->save($data);
            if ($res){
                //TODO
                //进行提醒,发送短信,或者微信信息;
                $this->success('更新成功');
            }else{
                $this->error('更新失败');
            }
        }
    }

    function temple(){
        $masterVM=D('TempleView');
        $map=array();
        $list=$masterVM->where($map)->select();
        $this->assign('list',$list);
        $this->display();
    }
    function templeInfo(){
        $templeid=I('get.templeid',0,'intval');
        $TempleVM=D('TempleView');
        $where['id']=$templeid;

        $templeInfo=$TempleVM->where($where)->find();
        $this->assign('templeInfo',$templeInfo);
        $this->display();
    }

    function templeVerify(){
        if (IS_POST){
            $where['id']=I('post.templeid',0,'intval');
            $data=array(
                'verifyContent'=>trim(I('post.verifyContent')),
                'auth'=>I('post.verifyIdea',0,'intval')
            );

            $res= M('temple')->where($where)->save($data);
            if ($res){
                //TODO
                //进行提醒,发送短信,或者微信信息;
                $this->success('更新成功');
            }else{
                $this->error('更新失败');
            }
        }
    }
}