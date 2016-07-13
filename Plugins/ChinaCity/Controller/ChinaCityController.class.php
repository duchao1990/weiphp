<?php
// +----------------------------------------------------------------------
// | i友街 [ 新生代贵州网购社区 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2014 http://www.iyo9.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: i友街 <iyo9@iyo9.com> <http://www.iyo9.com>
// +----------------------------------------------------------------------
// 

/**
 * 中国省市区三级联动插件
 * @author 安心
 */

namespace Plugins\ChinaCity\Controller;
use Home\Controller\AddonsController;

class ChinaCityController extends AddonsController{

	//获取中国省份信息
	public function getProvince(){

		if (IS_AJAX){
			$pid = I('pid');  //默认的省份id

			// if( !empty($pid) ){
			// 	$selectid = $pid;
			// }
			$map['level'] = 1;
			$map['upid'] = 0;
			$order = 'id ASC';
			$list = M('district')->where($map)->order($order)->select();
			$this->ajaxReturn($list);
		}
	}

	//获取城市信息
	public function getCity(){
		if (IS_AJAX){
			$cid = I('cid');  //默认的城市id
			$pid = I('pid');  //传过来的省份id

			// if( !empty($cid) ){
			// 	$map['id'] = $cid;
			// }
			$map['level'] = 2;
			$map['upid'] = $pid;

			$order = 'id ASC';
			$list = M('district')->where($map)->order($order)->select();

			$this->ajaxReturn($list);
		}
	}

	//获取区县市信息
	public function getDistrict(){
		if (IS_AJAX){
			$did = I('did');  //默认的城市id
			$cid = I('cid');  //传过来的城市id

			// if( !empty($did) ){
			// 	$map['id'] = $did;
			// }
			$map['level'] = 3;
			$map['upid'] = $cid;

			$order = 'id ASC';
			$list = M('district')->where($map)->order($order)->select();
			$this->ajaxReturn($list);
		}
	}

	//获取乡镇信息
	public function getCommunity(){
		if (IS_AJAX){
			$coid = I('coid');  //默认的乡镇id
			$did = I('did');  //传过来的区县市id

			$where['city_id'] = $coid;

			if( !empty($coid) ){
				$map['id'] = $coid;
			}
			$map['level'] = 4;
			$map['upid'] = $did;

			$order = 'id ASC';
			$list = M('district')->where($map)->order($order)->select();

			$this->ajaxReturn($list);
		}
	}

	public function getTemple()
	{
		$type=I('post.t');
		$id=I('id');
		$where[$type]=$id;
		$temple=M('temple')->where($where)->field('id,temple')->select();
		$this->ajaxReturn($temple);
	}
}