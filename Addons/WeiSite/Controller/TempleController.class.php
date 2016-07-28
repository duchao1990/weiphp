<?php
/**
 * Created by PhpStorm.
 * User: cucme
 * Date: 2016/7/20
 * Time: 11:06
 */

namespace Addons\WeiSite\Controller;


class TempleController extends BaseController
{
	//入驻的大师
    function templeUser(){
			$where['auth']=1;
			$info=D('MasterView')->where($where)->limit(24)->select();
			foreach ($info as $index => $item) {
				$info[$index]['cover']=get_picture_url($item['cover']);
			}

			$msg=array('code'=>1,'allmaster'=>$info);

			exit(json_encode($msg));
    }

	function getProvince(){
		$where['level']=1;
		$where['upid']=0;

		$provinceList=M('district')->where($where)->select();
		$msg=array('code'=>1,'provinceList'=>$provinceList);
		exit(json_encode($msg));
	}

	function getCity(){
		$where['level']=2;
		$where['upid']=I('get.upid');

		$cityList=M('district')->where($where)->select();
		$msg=array('code'=>1,'cityList'=>$cityList);
		exit(json_encode($msg));
	}

	function getDistrict(){
		$where['level']=3;
		$where['upid']=I('get.upid');

		$districtList=M('district')->where($where)->select();
		$msg=array('code'=>1,'districtList'=>$districtList);
		exit(json_encode($msg));
	}

	public function getTempleOfMaster()
	{
		$province=I('get.province');
		$city=I('get.city');
		$district=I('get.district');

		if ($province) {
			$where['province']=$province;
		}
		if ($city) {
			$where['city']=$city;
		}
		if ($district) {
			$where['district']=$district;
		}

		$templeids=M('temple')->where($where)->getField('id',true);

		$masterWhere['templeid']=array('in',$templeids);
		$masterWhere['auth']=1;

		$info=D('MasterView')->where($masterWhere)->select();
			foreach ($info as $index => $item) {
				$info[$index]['cover']=get_picture_url($item['cover']);
			}
		$msg=array('code'=>1,'allmaster'=>$info);

		exit(json_encode($msg));
	}

	public function intro()
	{
		    $m ['masterid'] =I('get.masterid');
		    $mpa['id']=I('get.masterid');
		    
			$master=M('templeinfo')->where($m)->find();
			$master['cover']=get_picture_url($siyuan['cover']);
			$master['master']=M('master')->where($mpa)->getField('master');
			exit(json_encode(array('intro'=>$master)));

	}



	public function newsList()
	{
		$page=I('get.page',0,'intval')+1;
		$map ['cate_id'] = I ( 'get.cid');
		$map['author']=I('get.masterid');
		$map ['token'] ='gh_b0fd347506da';
		$map['is_show']=1;

        $newsM=M('custom_reply_news');
        $count=$newsM->where($map)->count();
        $totalpage=ceil($count/6);
        $list=$newsM->where($map)->field('id,cover,title,intro')->order('sort desc,cTime desc')->page($page.',6')->select();
        if ($list){
            foreach ($list as $key => $cate) {
                $list[$key]['cover']=get_picture_url($cate['cover']);
            }
        }
        //是否加载更多
        if($page>=$totalpage){
            $more=false;
        }else{
            $more=true;
        }
        if($list){
            $msg=array('code'=>1,'list'=>$list,'page'=>$page,'more'=>$more);
        }else{
            $msg=array('code'=>0,'msg'=>'没有结果','more'=>$more);
        }
        exit(json_encode($msg));
	}

	public	function detail() {
	
			$map ['id'] = I ( 'get.id');
			
			

			$res=M ( 'custom_reply_news' )->where ( $map )->setInc ( 'view_count' );
			$info = M ( 'custom_reply_news' )->where ( $map )->field('title,content,author,cTime,view_count')->find ();

			if(is_numeric($info['author'])){
				$where['id']=$info['author'];
				$info['author']=M('master')->where($where)->getField('master');
			}
			exit(json_encode(array('info'=>$info)));
	}
}