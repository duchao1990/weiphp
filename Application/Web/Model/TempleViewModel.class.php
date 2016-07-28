<?php
/**
 * Created by PhpStorm.
 * User: cucme
 * Date: 2016/7/13
 * Time: 17:09
 */

namespace Web\Model;


use Think\Model\ViewModel;

class MasterOrderViewModel extends ViewModel
{
    public $viewFields = array(
        'Temple'=>array('id','temple','total_price','masterid','pay_status'),
        'Templeinfo'=>array('nickname','_on'=>'Shop_order.uid=User.uid'),
    );
}