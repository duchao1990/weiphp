<?php
/**
 * Created by PhpStorm.
 * User: cucme
 * Date: 2016/7/19
 * Time: 16:40
 */

namespace Addons\WeiSite\Model;


use Think\Model\ViewModel;

class MasterViewModel extends ViewModel
{
    public $viewFields = array(
        'Master'=>array('id','master','auth'),
        'Templeinfo'=>array('cover','auth'=>'templeAuth', '_on'=>'Templeinfo.masterid=Master.id'),
    );
}