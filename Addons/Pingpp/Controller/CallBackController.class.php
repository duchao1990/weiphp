<?php
/**
 * Created by PhpStorm.
 * User: cucme
 * Date: 2016/6/23
 * Time: 13:03
 */

namespace Addons\Pingpp\Controller;

use Think\Controller;

class CallBackController extends Controller
{
    public function webHooks()
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
               $res= D('Pingpp')->addCharge($event['data']['object'],$event['data']['refunds']);
                if($res){
                    $map['order_number']=$res;
                   $result= M('shop_order')->where($map)->save(array('pay_status'=>1,'status_code'=>1));
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
}