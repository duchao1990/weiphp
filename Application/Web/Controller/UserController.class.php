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
 * 用户控制器
 * 包括用户中心，用户登录及注册
 */
class UserController extends Controller{

	/* 用户中心首页 */
	public function index(){
		
	}

	/* 注册页面 */
	public function register(){
		if(IS_POST){ //注册用户
			$salt=salt();
			$userData=array(
				'mobile'=>I('post.mobile'),
				'master'=>I('post.master'),
				'templeid'=>I('post.selectTe'),
				'salt'=>$salt,
				'pwd'=>createPwd(I('post.mobile'),$salt)
			);
			$masterid=M('master')->add($userData);

			if ($masterid){
				session('masterid',$masterid);
				$this->success('提交成功,请提交认证资料',U('Enter/verify'));
			}else{
				$this->error('提交失败');
			}
		} else { //显示注册表单
			$this->display();
		}
	}
	function regTemple(){
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
						session('masterid',$masterid);
						$this->success('登记成功,请上传认证资料',U('Enter/verify'));
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
	/* 登录页面 */
	public function login(){
		if(IS_POST){ //登录验证

			$mobile=I('post.mobile');
			$pwd=I('post.password');
			/* 调用UC登录接口登录 */
			$user = M('master');
			$info=$user->where('mobile='.$mobile)->field('id,pwd,salt,templeid')->find();
			if ($info['pwd']===createPwd($pwd,$info['salt'])){
				session('masterid',$info['id']);
				session('templeid',$info['templeid']);
				$this->success('登录成功！',U('Plat/index'));
			}else{
				$this->error('密码错误');
			}
			
		} else { //显示登录表单
			$this->display();
		}
	}

	/* 退出登录 */
	public function logout(){
		if(is_login()){
			D('Member')->logout();
			$this->success('退出成功！', U('User/login'));
		} else {
			$this->redirect('User/login');
		}
	}

	public function verifyMobile(){
		$mobile=I('get.mobile',0,'intval');
		$uid=M('master')->where('mobile='.$mobile)->getField('id');
		if ($uid){
			$this->ajaxReturn(array('valid'=>false));
		}else{
			$this->ajaxReturn(array('valid'=>true));
		}
	}
	public function userMobile(){
		$mobile=I('get.mobile',0,'intval');
		$uid=M('master')->where('mobile='.$mobile)->getField('id');
		if ($uid){
			$this->ajaxReturn(array('valid'=>true));
		}else{
			$this->ajaxReturn(array('valid'=>false));
		}
	}
	/**
	 * 获取用户注册错误信息
	 * @param  integer $code 错误编码
	 * @return string        错误信息
	 */
	private function showRegError($code = 0){
		switch ($code) {
			case -1:  $error = '用户名长度必须在16个字符以内！'; break;
			case -2:  $error = '用户名被禁止注册！'; break;
			case -3:  $error = '用户名被占用！'; break;
			case -4:  $error = '密码长度必须在6-30个字符之间！'; break;
			case -5:  $error = '邮箱格式不正确！'; break;
			case -6:  $error = '邮箱长度必须在1-32个字符之间！'; break;
			case -7:  $error = '邮箱被禁止注册！'; break;
			case -8:  $error = '邮箱被占用！'; break;
			case -9:  $error = '手机格式不正确！'; break;
			case -10: $error = '手机被禁止注册！'; break;
			case -11: $error = '手机号被占用！'; break;
			default:  $error = '未知错误';
		}
		return $error;
	}


    /**
     * 修改密码提交
     * @author huajie <banhuajie@163.com>
     */
    public function profile(){
		if ( !is_login() ) {
			$this->error( '您还没有登陆',U('User/login') );
		}
        if ( IS_POST ) {
            //获取参数
            $uid        =   is_login();
            $password   =   I('post.old');
            $repassword = I('post.repassword');
            $data['password'] = I('post.password');
            empty($password) && $this->error('请输入原密码');
            empty($data['password']) && $this->error('请输入新密码');
            empty($repassword) && $this->error('请输入确认密码');

            if($data['password'] !== $repassword){
                $this->error('您输入的新密码与确认密码不一致');
            }

            $Api = new UserApi();
            $res = $Api->updateInfo($uid, $password, $data);
            if($res['status']){
                $this->success('修改密码成功！');
            }else{
                $this->error($res['info']);
            }
        }else{
            $this->display();
        }
    }

}
