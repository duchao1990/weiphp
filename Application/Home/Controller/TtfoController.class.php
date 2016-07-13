<?php
/**
 * Created by PhpStorm.
 * User: cucme
 * Date: 2016/6/29
 * Time: 15:28
 */

namespace Home\Controller;


use Think\Controller;

class TtfoController extends Controller
{
    public function index(){

        $this->display('Index/index');
    }
}