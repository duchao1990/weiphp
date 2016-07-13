<?php
/**
 * Created by PhpStorm.
 * User: cucme
 * Date: 2016/6/16
 * Time: 08:39
 */

namespace Addons\WeiSite\Controller;
use Addons\WeiSite\Controller\BaseController;
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');
class PayController extends BaseController
{
    public function payOrder()
    {
        $token=get_token();
        $info=getUserInfo($this->mid,'tokens');
        $order=array(
            'orderid'=>'201606160915'.rand(100,500),
            'amount'=>1,
            'method'=>'wx_pub',
            'goodsname'=>'测试数据',
            'goodsnum'=>2,
            'open_id'=>$info[$token]
        );
       $pingpp= A("Addons://Pingpp/Pingpp");
       $charge=$pingpp->getCharge($order);

        echo json_encode($charge);
    }
}