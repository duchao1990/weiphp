<?php
/**
 * Created by PhpStorm.
 * User: cucme
 * Date: 2016/7/26
 * Time: 16:37
 */

namespace Web\Controller;


use Think\Controller;

class FolineController extends Controller
{

    function index(){
        $this->display();
    }

    function info(){
    	$id=I('get.id');
    	switch ($id) {
    		case '1':
    			$title="子鼠:千手观音菩萨";
    			break;
    		case '2':
    			$title="丑牛:虚空藏菩萨";
    			break;
    		case '3':
    			$title="寅虎:虚空藏菩萨";
    			break;
    		case '4':
    			$title="卯兔:文殊菩萨";
    			break;
    		case '5':
    			$title="辰龙:普贤菩萨";
    			break;
    		case '6':
    			$title="巳蛇:普贤菩萨";
    			break;
    		case '7':
    			$title="午马:大势至菩萨";
    			break;
    		case '8':
    			$title="未羊:大日如来";
    			break;
    		case '9':
    			$title="申猴:大日如来";
    			break;
    		case '10':
    			$title="酉鸡:不动尊菩萨";
    			break;
    		case '11':
    			$title="戌狗:阿弥陀佛";
    			break;
    		case '12':
    			$title="亥猪:阿弥陀佛";
    			break;
    		
    		default:
    			# code...
    			break;
    	}
    	$this->assign('title',$title);
        $this->display();
    }
}