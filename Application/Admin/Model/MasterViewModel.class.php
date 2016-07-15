<?php
/**
 * Created by PhpStorm.
 * User: cucme
 * Date: 2016/7/13
 * Time: 10:43
 */

namespace Admin\Model;


use Think\Model\ViewModel;

class MasterViewModel extends ViewModel
{
    public $viewFields = array(
        'Master'=>array('id','master','mobile','templeid','idNum','idCard','templeCard','templeNum','auth','alipay','wxpay','bankpay','bankaddress'),
        'Temple'=>array('temple','auth'=>'templeAuth', '_on'=>'Master.templeid=Temple.id'),
        );
}