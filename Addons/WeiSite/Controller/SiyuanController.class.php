<?php

namespace Addons\WeiSite\Controller;


header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');
class SiyuanController extends BaseController{
	
	// 寺院介绍
	function intro() {
            $m ['token'] = get_token ();
            $m ['title'] ='寺院介绍';
			$siyuan=M('custom_reply_news')->where($m)->find();
			$siyuan['cover']=get_cover_url($siyuan['cover']);

			echo json_encode(array('intro'=>$siyuan));
			
	}

	function templeUser(){
		$map['token']=get_token();
		$map['title']='大师';
		$gid=M('auth_group')->where($map)->getField('id');

		if($gid){
			$agcmap['group_id']=$gid;
			$uids=M('auth_group_access')->where($agcmap)->getField('uid',true);
			if($uids){
				$infoM=M('custom_reply_news');
				$infoMap['cate_id']=0;
				$usermap['uid']=array('in',$uids);
				$temUser=M('user')->where($usermap)->field('uid,headimgurl,nickname')->select();
				foreach ($temUser as $key => $value) {
					$infoMap['sort']=$value['uid'];
					$temUser[$key]['infoid']=$infoM->where($infoMap)->getField('id');
					$temUser[$key]['nickname']=trim(urldecode($value['nickname']),'"');
				}
				$msg=array('code'=>1,'temUser'=>$temUser);
			}else{
				$msg=array('code'=>0,'msg'=>'没有入驻的大师');
			}
		}else{
			$msg=array('code'=>0,'msg'=>'没有该分组');
		}

		echo json_encode($msg);
	}

	//根据分类名得到分类ID
	function cateid(){
			$map1 ['token'] = get_token ();
			$map1 ['title']='新闻';
			$cate1=M('weisite_category')->where($map1)->getField('id');
			$map2 ['token'] = get_token ();
			$map2 ['title']='感悟';
			$cate2=M('weisite_category')->where($map2)->getField('id');
			$map3 ['token'] = get_token ();
			$map3 ['title']='义工';
			$cate3=M('weisite_category')->where($map3)->getField('id');
			$map4 ['token'] = get_token ();
			$map4 ['title']='活动';
			$cate4=M('weisite_category')->where($map4)->getField('id');
			$map5 ['token'] = get_token ();
			$map5 ['title']='功德';
			$cate5=M('weisite_category')->where($map5)->getField('id');
//			$map5 ['title']='活动';
//			$cate5=M('weisite_category')->where($map5)->getField('id');
			$result=array('cate1'=>$cate1,'cate2'=>$cate2,'cate3'=>$cate3,'cate4'=>$cate4,'cate5'=>$cate5);
			echo json_encode($result);
	}
	//分类
	function cate(){
			$map ['token'] = get_token ();
			$map ['pid'] = 0;
			$cate=M('weisite_category')->where($map)->select();
			echo json_encode($cate);
	}
	// 列表
	function lists(){
			$map ['cate_id'] = I ( 'get.id');
			$map ['token'] = get_token ();
			$map['is_show']=1;
			$ninid=I('get.ninid');
			$minid=M('custom_reply_news')->where($map)->Min('id');
		    if($ninid){
                 $map['id']=array('LT',$ninid);
		    }
           $list=M('custom_reply_news')->where($map)->limit(5)->order('sort asc,cTime desc')->select();
           $end=end($list);
           $ninid=$end['id'];
			foreach ($list as &$val) {
			    $val['coverpath']=get_cover_url($val['cover']);
			} 
			if($minid==$ninid){
                $more=false;
			}else{
                $more=true;
			}
			unset($val);
			$result=array('list'=>$list,'more'=>$more,'ninid'=>$ninid,'minid'=>$minid);
			echo json_encode($result);
	}
	function ganlists(){
		$map2 ['title']='感悟';
		$map2 ['token'] = get_token ();
		$cate2=M('weisite_category')->where($map2)->getField('id');
		$map ['token'] = get_token ();
		$map ['cate_id']=$cate2;
		$map['is_show']=1;
		$map ['uid'] = 12584;
		$ninid=I('get.ninid');
		$minid=M('custom_reply_news')->where($map)->Min('id');
//		dump($map);
//		die;
		if($ninid){
			$map['id']=array('LT',$ninid);
		}
//		dump($map);
		$list=M('custom_reply_news')->where($map)->limit(5)->order('sort asc,cTime desc')->select();
//dump($list);
		if($list){
			$end=end($list);
			$ninid=$end['id'];
			foreach ($list as &$val) {
				$val['coverpath']=get_cover_url($val['cover']);
			}
			if($minid==$ninid){
				$more=false;
			}else{
				$more=true;
			}
			unset($val);
			$result=array('list'=>$list,'more'=>$more,'ninid'=>$ninid,'minid'=>$minid);
		}else{
			$list=array();
		}

		echo json_encode($result);
	}
	// 详情
	function detail() {
	
			$map ['id'] = I ( 'get.id');
			$info = M ( 'custom_reply_news' )->where ( $map )->find ();

			M ( 'custom_reply_news' )->where ( $map )->setInc ( 'view_count' );
            $info['coverpath']=get_cover_url($info['cover']);
			if((!$info['author']) && $info['fabuer']){
				$name=M('user')->where('uid='.$info['fabuer'])->getField('nickname');
				$info['author']=urldecode($name);
			}else{
				$info['author']='志愿者';
			}
			echo json_encode($info);
	}

	function addView() {
	        $where['id']=I('get.id');
	        $res=M('custom_reply_news')->where($where)->setInc('view_count');
	        if ($res) {
	            $code=array('msg'=>'点赞成功！','status'=>1);
	        }else {
	            $code=array('msg'=>'点赞失败！','status'=>0);
	        }

	        echo json_encode($code);
	    }
	
}
