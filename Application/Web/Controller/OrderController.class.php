<?php
/**
 * Created by PhpStorm.
 * User: cucme
 * Date: 2016/7/22
 * Time: 10:00
 */

namespace Web\Controller;


class OrderController extends WebController
{
    public function index()
    {
    	$where['masterid']=$this->masterid;
    	$where['pay_status']=1;
    	$shopOrModel=M('shop_order');
    	$sumMoney=$shopOrModel->where($where)->sum('total_price');
        $this->assign('sumMoney',$sumMoney);
        $this->display();
    }

    public function indexAjax()
    {
        $offset=I('get.offset');
        $limit=I('get.limit');
        $order=I('get.sort').' '.I('get.order');
        $where['masterid']=$this->masterid;
        $where['pay_status']=1;
        //$list=M('shop_order')->where($where)->field('uid,cTime,total_price')->select();
        $list=D('MasterOrderView')->where($where)->order($order)->limit($offset,$limit)->select();

        if ($list) {
	        foreach ($list as $index => $item) {
	            $list[$index]['nickname']=userUnicode($item['nickname']);
	            $list[$index]['cTime']=date("Y:m:d H:i:s",$item['cTime']);
	        }
        	die(json_encode($list));
        }


    }
}