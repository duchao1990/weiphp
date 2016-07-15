<?php
/**
 * Created by PhpStorm.
 * User: cucme
 * Date: 2016/7/13
 * Time: 17:09
 */

namespace Admin\Model;


use Think\Model\ViewModel;

class TempleViewModel extends ViewModel
{
    public $viewFields = array(
        'Temple'=>array('id','temple','province','city','district','masterid','huodongCard','huodongNum','zuzhiCard','zuzhiNum','kaihuCard','kaihuNum','authNum','auth','verifyContent',),
        'Master'=>array('master','mobile','auth'=>'masterAuth','_on'=>'Temple.masterid=Master.id'),
    );
}