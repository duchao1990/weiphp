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
        'Master'=>array('id','master','auth','templeid'),
        'Templeinfo'=>array('cover', '_on'=>'Templeinfo.masterid=Master.id'),
        'Temple'=>array('temple','_on'=>'Master.templeid=Temple.id')
    );
}