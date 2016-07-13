<?php

namespace Addons\WeiSite\Controller;
use Home\Controller\AddonsController;
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');
class MyaddressController extends AddonsController {

	// 地址列表
	function addresslist(){
		    $uid=$this->mid;
        $madd=M('shop_address');
		    $result=$madd->where('uid='.$uid)->order('is_use desc')->select();
  if ($result) {
                 if($result['is_use']==1){
                  $mr='none'; 
                 }else{$mr='block';}
                  $msg=array('code'=>1,'result'=>$result,'mr'=>$mr);
                } else {
                  $msg=array('code'=>0,'msg'=>'没有地址列表,请添加');
                }
		echo json_encode($msg);
	}

   //添加
   function adds(){
   	   $madd=M('shop_address'); 
      $data ['uid'] = $this->mid;
      $data['truename']=I('get.truename');
      $data['mobile'] = I('get.mobile');
      $data['city'] = I('get.city');
      $data['address'] = I('get.address');
      $data['is_use'] = 0;
      $re=$madd->add($data);
       if ($re) {
                  $msg=array('code'=>1,'msg'=>'添加成功!');
                } else {
                  $msg=array('code'=>0,'msg'=>'添加失败!');
                }

        echo json_encode($msg);
   }
   //删除
   function del(){
   	$shad=M('shop_address');
    $id=I('get.id')?I('get.id'):0;
     $re=$shad->delete($id);
	     if($re){
          $msg=array('code'=>1,'msg'=>'删除成功!');
	    }else{
          $msg=array('code'=>0,'msg'=>'删除失败!');
	    }
       echo json_encode($msg);
   }
  //设置默认
   function setmoren(){
    $uid=$this->mid;
    $shad=M('shop_address');
    $id=I('get.id')?I('get.id'):0;
    $wh['is_use']=0;
    $where['uid']=$uid;
    $where['is_use']=1;
    $sa=$shad->where($where)->save($wh);
    $data['is_use']=1;
    $re=$shad->where('id='.$id)->save($data);
       if($re){
              $msg=array('code'=>1,'msg'=>'设置成功!');
          }else{
              $msg=array('code'=>0,'msg'=>'设置失败!');
          }
       echo json_encode($msg);
   }

}
