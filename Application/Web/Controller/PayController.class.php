<?php
/**
 * Created by PhpStorm.
 * User: cucme
 * Date: 2016/7/25
 * Time: 16:17
 */

namespace Web\Controller;



use Think\Controller;
use Pingpp\Charge;
use Pingpp\Pingpp;
vendor("pingpp.init");
class PayController extends Controller
{

    public function goPay()
    {

        $token='gh_b0fd347506da';
        $where['token']=$token;
        $config=M('public')->where($where)->getField('addon_config');
        $channel=I('get.method');
        $config=json_decode($config,true);
        $payconfig=$config['Pingpp'];
        $paySet=$this->getPingSet($token);

        $orderWhere['order_number']=I('get.order_number');
    	$orderinfo=M('shop_order')->where($orderWhere)->field('order_number,total_price')->find();

        //$extra 在使用某些渠道的时候，需要填入相应的参数，其它渠道则是 array() .具体见以下代码或者官网中的文档。其他渠道时可以传空值也可以不传。
        $extra = array();

        $redirect_url = U('paySuccess');
        switch ($channel) {
            case 'alipay_pc_direct':
                $extra = array(
                    'success_url' => $redirect_url,
                );
                break;

            case 'alipay_wap':
                $extra = array(
                    'success_url' => $redirect_url,
                    'cancel_url' => $redirect_url
                );
                break;
            case 'wx_pub_qr':

                $extra = array(
                    'product_id' => $orderinfo['order_number'],
                );
                break;
        }
        Pingpp::setApiKey($paySet['pingsk']);
        try {

            $assign =array(
                    'order_no'  => $orderinfo['order_number'],
                    'amount'    => $orderinfo['total_price']*100,
                    'currency'  => 'cny',
                    'channel'   => $channel,
                    'app'       => array('id' => $paySet['pingid']),
                    'client_ip' => $_SERVER['REMOTE_ADDR'],
                    'subject'   => '功德随喜',
                    'body'      => '功德随喜',
                    'extra'     =>$extra
                );

            $ch = Charge::create($assign);
            $this->assign('data', $ch);

            if ($channel == 'wx_pub_qr') {
                $savepath = '.' . __ROOT__ . "/Uploads/Picture/QRcode";

                $path =qrcode($ch->credential->wx_pub_qr, $orderinfo['order_number'] . '.png', $savepath, false, 6);
                $this->assign('qr', $path);
                $this->assign('data',$assign);
                $this->display('qrcode');
                exit;
            }


            $this->display();
            //echo $ch;
        } catch (\Pingpp\Error\Base $e) {
            // header('Status: ' . $e->getHttpStatus());
            // $this->error($e->getHttpBody(), U('pingxx/index/index'));
            //echo($e->getHttpBody());
        }
    }
    public function createOrder(){
        //一元等于10功德值
        $map['shop_id']=1;
        $map['title']='功德';
        $name=I('post.name')?('post.name'):'天天佛志愿者';
        $money=I('post.money',10,'float');
        $templeid=I('post.templeid',0,'intval');
        $goods=M('shop_goods')->where($map)->find();
        $goods['cover']=get_picture_url($goods['cover']);
        $goods['num']=number_format($money/$goods['price'],2);
        $order_number=str_replace('.','', microtime(true));
        $orderdata=array(
            'address_id'=>0,
            'remark'=>'无备注',
            'order_number'=>$order_number,
            'cTime'=>NOW_TIME,
            'pay_status'=>0,
            'total_price'=>$money,
            'goods_datas'=>json_encode(array($goods)),
            'shop_id'=>1,
            'templeid'=>$templeid
        );
        // dump($orderdata);
        // die();
        $id = D ( 'Addons://Shop/Order' )->add ( $orderdata );
        if($id){
            $assingOrder=array(
                'money'=>$money,
                'order_number'=>$order_number,
                );
            $this->assign('orderdata',$assingOrder);
            $this->display();
        }

    }

    public function getCharge($orderinfo)
    {
        $token='gh_b0fd347506da';
        $where['token']=$token;
        $config=M('public')->where($where)->getField('addon_config');
        $config=json_decode($config,true);
        $payconfig=$config['Pingpp'];
        $paySet=$this->getPingSet($token);
        if($payconfig[$orderinfo['method']]==1){

            if($orderinfo['method']='alipay_pc_direct'){
                $info=getUserInfo($this->mid,'tokens');
                $extra=array('success_url'=>U('paySuccess'));
            }else{
                $extra=array();
            }
            Pingpp::setApiKey($paySet['pingsk']);
            $subject=$orderinfo['subject'];
            $body=date('Y-m-d H:i:s',time()).'购买'.$orderinfo['subject'];
            $ch= Charge::create(
                array(
                    'order_no'  => $orderinfo['orderid'],
                    'amount'    => $orderinfo['amount']*100,
                    'currency'  => 'cny',
                    'channel'   => $orderinfo['method'],
                    'app'       => array('id' => $paySet['pingid']),
                    'client_ip' => $_SERVER['REMOTE_ADDR'],
                    'subject'   => $subject,
                    'body'      => $body,
                    'extra'     =>$extra
                )
            );

            if($ch){
                $msg=array('code'=>1,'charge'=>$ch);
            }else{
                $msg=array('code'=>0,'msg'=>$ch);
            }
        }else{
            $msg=array('code'=>0,'msg'=>'该支付方式已经被关闭');
        }


        return $msg;
    }

    public function getPingSet($id, $update = false, $data = array()){
        $key = 'Ping_getInfo_' . $id;
        $info = S ( $key );
        $boolinfo=boolval($info);
        if ( $boolinfo== false || $update) {
            if (!empty ( $data )){
                $info=$data;
            }else{
                $where['token']=$id;
                $info=M('pingpp_set')->where($where)->field('pingsk,pingid')->find();
            }
            S ( $key, $info );
        }

        return $info;
    }

    public function paySuccess()
    {
    	echo "支付成功";
    }
}