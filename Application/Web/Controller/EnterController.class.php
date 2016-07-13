<?php
/**
 * Created by PhpStorm.
 * User: cucme
 * Date: 2016/6/30
 * Time: 10:39
 */

namespace Web\Controller;

class EnterController extends HomeController
{

    //资质审核结果
    function verify(){
        $master = M('master')->where('id=' . $this->masterid)->field('id,master,templeid,auth,idCard,idNum,templeCard,templeNum')->find();
        $temple = M('temple')->where('id=' . $master['templeid'])->field('id,huodongCard,huodongNum,zuzhiCard,zuzhiNum,kaihuCard,kaihuNum,authNum,auth')->find();
        $this->assign('master', $master);
        $this->assign('temple', $temple);
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