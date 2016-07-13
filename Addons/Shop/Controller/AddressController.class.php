<?php
/**
 * Created by PhpStorm.
 * User: cucme
 * Date: 2016/6/22
 * Time: 16:44
 */

namespace Addons\Shop\Controller;


use Home\Controller\AddonsController;

class AddressController extends AddonsController
{
    // 我的收获地址
    function myAddress() {
        $list = D ( 'Address' )->getUserList ( $this->mid );

        if($list){
            $msg=array('code'=>1,'addressList'=>$list);
        }else{
            $msg=array('code'=>0,'msg'=>'你还有设置收货地址请点击添加');
        }

        echo json_encode($msg);

        /*
         * $follow_id = $this->mid;
         * $myadress = D('Addons://Shop/Address')->getMyAddress($follow_id);
         * dump($myadress);
         * $this -> assign('lists',$myadress);
         * $this -> display();
         */
    }

    function choose_address() {
        $list = D ( 'Address' )->getUserList ( $this->mid );
        // dump ( $list );
        $this->assign ( 'lists', $list );

        $this->display ();
    }
    // 添加或编辑地址
    function add_address() {
        if (IS_POST) {
            $data = I ( 'post.' );
            $data ['uid'] = $this->mid;
            $res = D ( 'Address' )->deal ( $data );
            if ($data ['from'] == 0) {
                redirect ( U ( 'myAddress', array (
                    'shop_id' => $this->shop_id
                ) ) );
            } else {
                redirect ( U ( 'choose_address', array (
                    'shop_id' => $this->shop_id
                ) ) );
            }
        }

        $id = I ( 'id' );
        if ($id) {
            $info = D ( 'Address' )->getInfo ( $id );
            $this->assign ( 'info', $info );
        }

        $this->display ();
    }

        // 地址列表
    function addresslist(){
            $uid=$this->mid;
        $madd=M('shop_address');
            $result=$madd->where('uid='.$uid)->order('is_use desc')->select();
  if ($result) {
                  foreach ($result as $key => $value) {
                    if($value['is_use']==1){
                      $result[$key]['mr']='none';
                      $result[$key]['mm']='';
                     }else{
                      $result[$key]['mr']='';
                      $result[$key]['mm']='none';
                    }
                  }    
                  $msg=array('code'=>1,'result'=>$result);
                } else {
                  $msg=array('code'=>0,'msg'=>'还没有收货地址,请添加');
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