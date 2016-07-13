<?php

namespace Addons\Pingpp\Controller;
use Home\Controller\AddonsController;
use Pingpp\Charge;
use Pingpp\Pingpp;

vendor('pingpp.init');

class PingppController extends BaseController{
    protected $model;
    public function __construct() {
        parent::__construct ();
        $this->model = M ( 'Model' )->getByName ( 'pingpp_set' );
        $this->model || $this->error ( '模型不存在！' );
        $this->assign ( 'model', $this->model );
    }

    public function lists() {
        $normal_tips='注意：请在微信公众号配置 微信支付授权目录（http://域名/WxpayAPI/）。 <br/>1.打开微信公众平台,点击侧栏‘微信支付’ <br/>2.在微信支付里的 ‘开发配置’ 添加 ‘支付授权目录’';
        $this->assign('normal_tips',$normal_tips);
        $token = get_token ();

        // 获取模型信息
        $payid = M ( "pingpp_set" )->where ( array (
            "token" => $token
        ) )->field ( 'id' )->find ();
        $id = 0;
        if (! empty ( $payid )) {
            $id = $payid ["id"];
        }

        if (IS_POST) {
            $isadd = I ( 'get.isadd', 0, 'intval' );
            $Model = D ( parse_name ( get_table_name ( $this->model ['id'] ), 1 ) );
            if ($isadd == 1) {
                // 自动补充token
                $_POST ['token'] = $token;

                // 获取模型的字段信息
                $Model = $this->checkAttr ( $Model, $this->model ['id'] );
                if ($Model->create () && $Model->add ()) {
                    $this->success ( '保存成功！',U('lists'));

                } else {
                    $this->error ( $Model->getError () );
                }
            } else {
                $Model = $this->checkAttr ( $Model, $this->model ['id'] );
                if ($Model->create () && $Model->save ()) {
                    $this->success ( '保存成功！',U('lists'));
                } else {
                    $this->error ( $Model->getError () );
                }
            }
        } else {
            $fields = get_model_attribute ( $this->model ['id'] );
            // 获取数据
            $data = M ( get_table_name ( $this->model ['id'] ) )->find ( $id );
            $this->assign ( 'fields', $fields );
            $isadd = 0;
            if (empty ( $data )) {
                $isadd = 1;
            }
            $this->assign('isadd',$isadd);
            $this->assign ( 'data', $data );
            $this->meta_title = '编辑' . $this->model ['title'];
        }
        $this->display ('set');
    }


    public function getCharge($orderinfo)
    {
        $token=get_token();
        $payconfig=$this->config;
        if($payconfig[$orderinfo['method']]==1){

            if($orderinfo['method']='wx_pub'){
                $info=getUserInfo($this->mid,'tokens');
                $extra=array('open_id'=>$info[$token]);
            }else{
                $extra=array();
            }
            Pingpp::setApiKey($payconfig['pingsk']);
            $subject=$orderinfo['subject'];
            $body=date('Y-m-d H:i:s',time()).'购买'.$orderinfo['subject'];
            $ch= Charge::create(
                array(
                    'order_no'  => $orderinfo['orderid'],
                    'amount'    => $orderinfo['amount']*100,
                    'currency'  => 'cny',
                    'channel'   => $orderinfo['method'],
                    'app'       => array('id' => $payconfig['pingID']),
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


}
