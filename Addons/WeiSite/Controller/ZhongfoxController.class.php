<?php
/**
 * Created by PhpStorm.
 * User: cucme
 * Date: 2016/6/16
 * Time: 14:28
 */

namespace Addons\WeiSite\Controller;


use Think\Controller;
use Think\Curl;
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');
class zhongfoxController extends Controller
{
    function getApi(){
        $curl=new Curl();
        $ctrl=I('get.ctrl');
        $fun=I('get.fun');
        $prams=$_GET;
        $unset=array('_addons','_controller','_action','m','ctrl','fun');
        foreach ($prams as $index => $pram) {
            if(!in_array($index,$unset)){
                $str.='/'.$index.'/'.$pram;
            }
        }
       $data= $curl->getdata($ctrl,$fun,$str);
        echo $data;
    }
}