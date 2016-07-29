<?php
/**
 * Created by PhpStorm.
 * User: duchao
 * Date: 2016/6/19
 * Time: 20:16
 */

namespace Addons\Shop\Controller;
use Home\Controller\AddonsController;

use Think\KdApiSerch;
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');
class ApiController extends AddonsController
{

    public $shop_id;
    public $token;
    function _initialize() {
        parent::_initialize ();
        $this->token=get_token();
        $where['token']=$this->token;
        $this->shop_id=M('shop')->where($where)->getField('id');

        // dump ( $this->shop_id );

        if (empty ( $this->shop_id )) {
            $map ['token'] = get_token ();
            $shop = M ( 'shop' )->where ( $map )->find ();
            $this->shop_id = $shop ['id'];
        }

        $cart_count = count ( D ( 'Cart' )->getMyCart ( $this->mid, true ) );
        $cart_count == 0 && $cart_count = '';
    }

    //商品分类

    function getShopIndex(){
//        // banner
        $slideshow_list = D ( 'Slideshow' )->getShopList ( $this->shop_id );
        if ($slideshow_list){
            foreach ($slideshow_list as $key => $slide) {
                $slideshow_list[$key]['img']=get_picture_url($slide['img']);
            }
        }
        // recommend_cate
        $where['shop_id']=$this->shop_id;
        $where['is_show']=1;
        $recommend_cate=M('shop_goods_category')->where($where)->order('sort desc ')->select();
        if ($recommend_cate){
            foreach ($recommend_cate as $key => $cate) {
                $recommend_cate[$key]['img']=get_picture_url($cate['icon']);
            }
        }
        // 推荐商品
        $recommend_list = D ( 'Goods' )->getRecommendList ( $this->shop_id );
        if ($recommend_list){
            foreach ($recommend_list as $key => $cate) {
                $recommend_list[$key]['cover']=get_picture_url($cate['cover']);
            }
        }

        echo json_encode(array('slide'=>$slideshow_list,'cate'=>$recommend_cate,'list'=>$recommend_list));
    }


    function getGoodsList(){
        $page=I('get.page',0,'intval')+1;
        $map['category_id']=I('get.cateid');
        $map['is_show']=1;
        $map['shop_id']=$this->shop_id;

        $goodsM=M('shop_goods');
        $count=$goodsM->where($map)->count();
        $totalpage=ceil($count/6);
        $list=$goodsM->where($map)->field('id,cover,title,price')->order('is_recommend desc,show_time desc,rank desc')->page($page.',6')->select();
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
        echo json_encode($msg);
    }

    function getGoodsInfo(){
        $id = I ( 'get.goods_id',0,'intval' );
        $goods = D ( 'Goods' )->getInfo ( $id );

        if ($goods) {
            $msg=array('code'=>1,'goods'=>$goods);
        } else {
            $msg=array('code'=>0,'msg'=>'商品已经下架');
        }
        
       echo json_encode($msg);
    }
    function addToCart(){
        $goods ['goods_id'] = I ( 'goods_id' );
        $info = D ( 'goods' )->getInfo ( $goods ['goods_id'] );
        $goods ['price'] = $info ['price'];
        $goods ['shop_id'] = $info ['shop_id'];

        $goods ['uid'] = $this->mid;
        $goods ['num'] = I ( 'buyCount' );

        $res=D('Cart')->addToCart($goods);
        if($res){
            $msg=array('code'=>1,'msg'=>'恭请单添加成功');
        }else{
            $msg=array('code'=>0,'msg'=>'恭请单添加失败');
        }

        echo json_encode($msg);
    }

    public function getMyCart()
    {
        $list = D ( 'Cart' )->getMyCart ( $this->mid, true );
        $buyCount=0;
        $dao = D ( 'goods' );
        foreach ( $list as &$v ) {
            $v ['goods_data'] = $dao->getInfo ( $v ['goods_id'] );
            $buyCount+=$v['num']*$v['price'];
        }

        if($list){
            $msg=array('code'=>1,'list'=>$list,'buyCount'=>$buyCount);
        }else{
            $msg=array('code'=>0,'msg'=>'恭请单是空的,赶快去恭请吧!');
        }

        echo json_encode($msg);
    }

    function delCart() {
        $ids = I ( 'ids' );
        echo D ( 'Cart' )->delCart ( $ids );
    }

    function confirmOrder() {
        // 订单信息
        if (IS_POST) {
            $dao = D ( 'Goods' );
            $goods_ids = json_val('goods_ids');
            $numArr=json_val('goodsCount');
            $total_price=0;
            if ($goods_ids) {
                foreach ( $goods_ids as $k=>$id ) {
                    $goods = $dao->getInfo ( $id );
                    $goods ['num'] = $numArr [$k];
                    $list [] = $goods;
                    $total_price += $goods ['num'] * $goods ['price'];
                }
            } else {
                $id = I ( 'post.goods_id' );
                $goods = $dao->getInfo ( $id );
                $goods ['num'] = I ( 'post.buyCount' );
                $list [] = $goods;

                $total_price = $goods ['num'] * $goods ['price'];
            }

            $data ['lists'] = $list;
            $data ['total_price'] = $total_price;

            // 收货地址
            if (isset ( $_GET ['address_id'] )) {
                $address = D ( 'Address' )->getInfo ( I ( 'get.address_id' ) );
            } else {
                $address = D ( 'Address' )->getMyAddress ( $this->mid );
            }

            $orderdata=array(
                'address_id'=>$address['id'],
                'remark'=>'无备注',
                'uid'=>$this->mid,
                'order_number'=>$this->mid.date( 'YmdHis' ),
                'cTime'=>NOW_TIME,
                'openid'=>get_openid(),
                'pay_status'=>0,
                'total_price'=>$total_price,
                'goods_datas'=>json_encode ($list),
                'shop_id'=>$this->shop_id


            );
            $id = D ( 'Addons://Shop/Order' )->add ( $orderdata );
            if($id){
                $goods_ids = getSubByKey (  $data ['lists'], 'id' );
                $res= D ( 'Cart' )->delUserCart ( $this->mid, $goods_ids );
            }
            echo json_encode(array('code'=>1,'orderId'=>$id));

        }

    }
    function getWpOrder(){
        $id=I('get.orderId',0,'intval');
        $result=D('Order')->payOrderList('',$id);

        $address = D ( 'Address' )->getInfo ( $result['address_id'] );


        if($result){
            $msg=array('code'=>1,'payGoods'=>json_decode($result['goods_datas'],true),'address'=>$address,'total_price'=>$result['total_price']);
        }else{
            $msg=array('code'=>0,'msg'=>'没有找到待支付的订单');
        }

        echo json_encode($msg);
    }
    // 生成订单
    function orderToPay() {

            $subject='';
            $data ['address_id'] = I('get.address_id');
            $id=I('get.orderid',0,'intval');
            $result=D('Order')->payOrderList('',$id);

            if($result){
                $payGoods=json_decode($result['goods_datas'],true);
                foreach ( $payGoods as $key => $value) {
                    $subject.=$value['title'].' x '.$value['num'];
                }
                $order=array(
                    'orderid'=>$result ['order_number'],
                    'amount'=>$result ['total_price'],
                    'method'=>'wx_pub',
                    'subject'=>$subject,
                );
                $pingpp= A("Addons://Pingpp/Pingpp");
                $charge=$pingpp->getCharge($order);
                $msg=$charge;
                session('charge',$charge['charge']);
            }else{
               $msg=array('code'=>0,'msg'=>'无效订单');
            }

            echo json_encode($msg);
    }

    function payOk(){

        $map['order_number']=I('get.order_number');
        $updata=array();
        if($map['order_number']){
            if(I('get.charge_id')){

                $updata['charge']=I('get.charge_id');
                $updata['pay_status']=1;

                $res=M('shop_cart')->where($map)->save($updata);
                if($res){
                    $msg=array('code'=>1,'msg'=>'订单状态设置成功');
                }else{
                    $msg=array('code'=>1,'msg'=>'订单状态设置失败,请联系客服');
                }
            }else{
                $msg=array('code'=>0,'msg'=>'无效支付返回码');
            }
        }else{
            $msg=array('code'=>0,'msg'=>'未找到该订单号');
        }

    }
    function orderList(){
        $params['uid']=$this->mid;
        if(I('pay_status')){
            $params['pay_status']=I('pay_status');
        }
        if(I('status_code')){
            $params['status_code']=I('status_code');
        }
        $params['is_gongde']=0;

        $result=D('Order')->payOrderList($params);
         if (I('pay_status') || I('status_code')) {
             $buyList=$result;
         } else {
             foreach ($result as $key => $value) {
                 $value['goods_datas']=json_decode($value['goods_datas'],true);
                 if ($value['status_code']==0) {
                     $buyList['nopayList'][]=$value;
                 } else if($value['status_code']==2 ||$value['status_code']==1) {
                     $buyList['willList'][]=$value;
                 }else if($value['status_code']==3) {
                     $buyList['senedList'][]=$value;
                 }else if($value['status_code']==4) {
                     $buyList['redList'][]=$value;
                 }
                
             }
         }
        //dump($buyList['redList']);
        if($result){
            $msg=array('code'=>1,'buyList'=>$buyList,);
        }else{
            $msg=array('code'=>0,'msg'=>'没有找到待支付的订单');
        }

        echo json_encode($msg);
    }

    function getSendInfo()
    {
        $map['id'] = I('get.orderId');
        $info = M('shop_order')->where($map)->field('send_code,send_number')->find();
        if ($info) {
            $kdInfo['OrderCode']='';
            $kdInfo['ShipperCode']=$info['send_code'];
            $kdInfo['LogisticCode']=$info['send_number'];
            $kdJson=json_encode($kdInfo);
            $kuiDi =new KdApiSerch();
            $sendInfo = $kuiDi->getOrderTracesByJson($kdJson);
            $sendInfo=json_decode($sendInfo,true);
            if($sendInfo['Traces']){
                $msg=array('code'=>1,'postLine'=>array_reverse($sendInfo['Traces']));
            }else{
                $msg = array('code' => 0, 'msg' => $sendInfo['Reason']);
            }

        } else {
            $msg = array('code' => 0, 'msg' => '不存在改信息');
        }

        echo json_encode($msg);
    }


    function queryOrder(){
        $map['id'] = I('get.orderId');
        $res = M('shop_order')->where($map)->save(array('status_code'=>4));
        if($res){
            $msg=array('code'=>1,'msg'=>'确认成功');
        }else{
            $msg=array('code'=>0,'msg'=>'确认失败');
        }

        echo json_encode($msg);
    }

    function chargeInte(){
        //一元等于10功德值
        $map['shop_id']=$this->shop_id;
        $map['title']='功德';
        $money=I('get.money',0,'float');
        $masterid=I('get.masterid',0,'intval');
        $goods=M('shop_goods')->where($map)->find();
        $goods['cover']=get_picture_url($goods['cover']);
        $goods['num']=number_format($money/$goods['price'],2);
        //$goods['num']=ceil(0.1/$goods['price']);
        $orderdata=array(
            'address_id'=>0,
            'remark'=>'无备注',
            'uid'=>$this->mid,
            'order_number'=>$this->mid.date( 'YmdHis' ),
            'cTime'=>NOW_TIME,
            'openid'=>get_openid(),
            'pay_status'=>0,
            'total_price'=>$money,
            'goods_datas'=>json_encode(array($goods)),
            'shop_id'=>$this->shop_id,
            'is_gongde'=>1,
            'masterid'=>$masterid
        );
        $id = D ( 'Addons://Shop/Order' )->add ( $orderdata );
        if($id){

        $subject=功德.' x '.$goods['num'];

        $order=array(
            'orderid'=>$orderdata['order_number'],
            'amount'=>$money,
            'method'=>'wx_pub',
            'subject'=>$subject,
        );

        $pingpp= A("Addons://Pingpp/Pingpp");
        $charge=$pingpp->getCharge($order);
            echo json_encode($charge);
        }else{
            echo array('code'=>1,'msg'=>'订单添加失败');
        }


    }

    function getInte(){
        $uid=$this->mid;
        $userM=M('user');
       $score= $userM->where('uid='.$uid)->getField('score');
        $payList= M('shop_order')->where('pay_status=1')->order('cTime desc')->limit(20)->field('uid,total_price')->select();

       foreach ($payList as $key => $value) {
           $info=$userM->where('uid='.$value['uid'])->field('nickname,headimgurl')->find();
           $info[nickname]=urldecode($info['nickname']);
           $payList[$key]['uinfo']=$info;
       }
        echo json_encode(array('code'=>1,'score'=>$score,'payList'=>$payList));
    }

}