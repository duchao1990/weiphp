<?php
/**
 * Created by PhpStorm.
 * User: cucme
 * Date: 2016/6/24
 * Time: 17:40
 */

namespace Home\Controller;


use Think\Controller;

class WebHooksController extends Controller
{
    public function callBack()
    {

        $event = json_decode(file_get_contents("php://input"), true);

        //  file_put_contents('aaa.txt',file_get_contents("php://input"));
        // 对异步通知做处理
        if (!isset($event['type'])) {
            header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad Request');
            exit("fail");
        }
        switch ($event['type']) {
            case "charge.succeeded"://支付成功
            {
                $res= $this->addCharge($event['data']['object'],$event['data']['refunds']);
                if($res){
                    $map['order_number']=$res;
                   $info=M('shop_order')->where($map)->field('uid,goods_datas,is_gongde')->find();

                    $goods=json_decode($info['goods_datas'],true);
                    $title=$goods['title'];
                    if($info['is_gongde']==1){
                        $result= M('shop_order')->where($map)->save(array('pay_status'=>1,'status_code'=>4));
                        if($result){
                            M('user')->where('uid='.$info['uid'])->setInc('score',$goods['num']*50);
                        }
                    }else{
                        $result= M('shop_order')->where($map)->save(array('pay_status'=>1,'status_code'=>1));
                    }

                }
                header($_SERVER['SERVER_PROTOCOL'] . ' 200 OK');
                break;
            }
            case "refund.succeeded"://退款成功
            {
                header($_SERVER['SERVER_PROTOCOL'] . ' 200 OK');
                break;
            }
            // 开发者在此处加入对退款异步通知的处理代码

            case "red_envelope.sent"://红包发送成功
            {
                header($_SERVER['SERVER_PROTOCOL'] . ' 200 OK');
                break;
            }

            case "red_envelope.received"://红包接受成功
            {
                header($_SERVER['SERVER_PROTOCOL'] . ' 200 OK');
                break;
            }

            case "summary.daily.available"://红包接受成功
            {
                header($_SERVER['SERVER_PROTOCOL'] . ' 200 OK');
                break;
            }

            case "summary.weekly.available"://红包接受成功
            {
                header($_SERVER['SERVER_PROTOCOL'] . ' 200 OK');
                break;
            }

            case "summary.monthly.available"://红包接受成功
            {
                header($_SERVER['SERVER_PROTOCOL'] . ' 200 OK');
                break;
            }

            default:
                header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad Request');
                break;
        }
    }

    public function addCharge($charge,$refunds)
    {
       $poM= M('pingpp_order');
        $charge['amount'] = $charge['amount']/100;
        $data['charge_id'] = $charge['id'];
        $data['channel'] = $charge['channel'];
        $data['order_no'] = $charge['order_no'];
        $data['charge'] = json_encode($charge);
        $data['created'] = $charge['created'];
        $data['amount'] = $charge['amount'];
        $data['refunds'] = json_encode($refunds);
        $result = $poM->add($data);
        if (!$result) {
            return false;
        }else{
            return $data['order_no'];
        }

    }

}