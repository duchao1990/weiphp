<?php
/**
 * Created by PhpStorm.
 * User: cucme
 * Date: 2016/6/23
 * Time: 16:23
 */

namespace Addons\Shop\Controller;

use Home\Controller\AddonsController;

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');
class UserController extends AddonsController
{
    function getUserInfo(){

        $uInfo=get_userinfo($this->mid);

        echo json_encode(array('nickname'=>$uInfo['nickname'],'headimgurl'=>$uInfo['headimgurl'],'score'=>$uInfo['score']));
    }
}