<?php
namespace Addons\WeiSite\Controller;
use Home\Controller\AddonsController;
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');
class YuanController extends AddonsController {
    function allyuan() {
        $ninid=I('get.ninid',0,'intval');
        $minid=M('qiyuan')->Min('id');
        if ($ninid) {
            $map['id']=array('LT',$ninid);
        }
        $map['show']=1;
        $content = M('qiyuan')->where($map)->order('id desc')->limit('5')->field('id,uid,fid,yuan,addtime,view,status')->select();

        $end=end($content);
        $ninid=$end['id'];
        $user=M('user');
        foreach ($content as &$v) {
            $v['fo']=getfoname($v['fid']);
            $v['zh_sta']=$v['status']==0?"未还愿":"已还愿";
            $v['status']=boolval($v['status']);
            //$res=getutype($v['uid'],$v['cover_id']);
            $res=$user->where('uid='.$v['uid'])->field('nickname,headimgurl')->find();
            $v['nickname']=urldecode($res['nickname']);
            $v['cover']=$res['headimgurl'];

        }
        if ($minid==$ninid) {
            $more=false;
        }else{
            $more=true;
        }
        $result=array('list'=>$content,'more'=>$more,'ninid'=>$ninid,'minid'=>$minid);
        echo  json_encode($result);
    }
    function yuanList() {
        $ninid=I('get.ninid',0,'intval');
        $uid=$this->mid;
        $map['uid']=$uid;
        $minid=M('qiyuan')->where($map)->Min('id');
        if ($ninid) {
            $map['id']=array('LT',$ninid);
        }

        $content = M('qiyuan')->where($map)->order('id desc')->limit('5')->field('id,uid,fid,yuan,addtime,view,status,show')->select();
        $end=end($content);
        $ninid=$end['id'];
        $user=M('user');
        foreach ($content as &$v) {
            $v['fo']=getfoname($v['fid']);
            $v['zh_sta']=$v['status']==0?"未还愿":"已还愿";
            $v['zh_show']=$v['show']==1?'公开':'不公开';
            $v['status']=boolval($v['status']);
            $v['show']=boolval($v['show']);
            $res=$user->where('uid='.$uid)->field('nickname,headimgurl')->find();
            $v['nickname']=urldecode($res['nickname']);
            $v['cover']=$res['headimgurl'];
        }
        if ($minid==$ninid) {
            $more=false;
        }else{
            $more=true;
        }
        $result=array('list'=>$content,'more'=>$more,'ninid'=>$ninid,'minid'=>$minid);
        echo  json_encode($result);;
    }

    function qiyuan() {
        if (IS_POST) {
             $uid=$this->mid;
             $score=M('user')->where('uid='.$uid)->getField('score');
            if ($score<10) {
                $msg=array('code'=>0,'msg'=>'积分不足,请充值后再祈愿');
            }else {
                    $data=array(
                        'uid'=>$uid,
                        'yuan'=>json_val('yuan'),
                        'addtime'=>time(),
                        'fid'=>json_val('fid'),
                        'show'=>intval(json_val('ishow')),
                        'view'=>rand(100,300),
                        'ispay'=>json_val('ispay')?json_val('ispay'):0,
                    );

                        $res=M('qiyuan')->add($data);
                        $uq=M('user')->where('uid='.$uid)->setDec('score',10);
                        if($res&&$uq){
                        $msg=array('code'=>1,'msg'=>'祈愿成功,消耗10积分');   
                        }else{
                        $msg=array('code'=>0,'msg'=>'祈愿失败');   
                        }
           
            }

            echo json_encode($msg);
        }
    }
    
    
    function orderInfo($uid) {

            $shop_data['address']='河南洛阳玄奘寺';
            $shop_data['name']= '祈福牌';
            $shop_data['zipcode']='471000';
            $shop_data['phone']= '';
            $shop_data['uid']= $uid;
            $shop_data['create_time']= time();
    
    
            $order_data['uid']=$uid;
            $order_data['goods_id']=27;
            $order_data['goods_num']=1;
            $order_data['createtime']=time();
            $order_data['status']=0;
            $address_id=M('shop_address')->add($shop_data);
            $order_data['address_id']=$address_id;
            $orderstatus=M('shop_buy')->add($order_data);
            if ($orderstatus) {
                $msg=array('code'=>1,'msg'=>'祈福牌订单成功');
            }else{
                $msg=array('code'=>0,'msg'=>'祈福牌订单失败...');
            }
            return $msg;

    }
    
    
    //祝福加1记录
    function addview() {
        $yid=I('get.yid');
        $where['id']=$yid;
        $res=M('qiyuan')->where($where)->setInc('view');
        $newview=M('qiyuan')->where($where)->getfield('view');
        if ($res) {
            $msg=array('code'=>1,'msg'=>'祝福成功!','newview'=>$newview);
        }else{
            $msg=array('code'=>0,'msg'=>'祝福失败!','newview'=>$newview);
        }

        echo json_encode($msg);
    }

    function changeStatus() {
        $yid=I('get.yid');
        $where['id']=$yid;
        $res=M('qiyuan')->where($where)->save(array('status'=>1));
        if ($res) {
            $msg=array('code'=>1,'msg'=>'祝福成功!');
        }else{
            $msg=array('code'=>0,'msg'=>'祝福失败!');
        }

        echo json_encode($msg);
    }

    function getyuan() {
        $where['id']=I('get.id');
        $yuan= M('qiyuan')->where($where)->find();
        $foname=getfoname($yuan['fid']);
        $udata= $this->getuinfo($yuan['uid']);
        $title="弟子".$udata['nickname']."礼佛【".getfoname($yuan['fid'])."】许愿:";
        $imgurl="http://".$_SERVER['SERVER_NAME']."/Uploads/Avatar/foxiang/".$yuan['fid'].".jpg";

        echo json_encode(array('title'=>$title,'imgurl'=>$imgurl));
    }
    public  function getdesc(){
      $desc= M('shop')->where('id=27')->getField('goods_detail');
      echo json_encode(array('desc'=>$desc));
    }
    public function getuinfo($uid) {
        $where['id']=$uid;
        $type=M('ucenter_member')->where($where)->getField('type');

        $cwhere['uid']=$uid;
        if ($type=='4') {
            $uinfo= M('wecinfo')->where($cwhere)->find();
        }else{
            $uinfo=M('member')->where($cwhere)->find();
        }

        $udata=array(
            'nickname'=>$uinfo['nickname'],
            'headimgurl'=>$uinfo['headimgurl']?$uinfo['headimgurl']:"http://".$_SERVER['SERVER_NAME']."/Public/images/default_avatar_128_128.jpg",
        );
        return $udata;
    }
}