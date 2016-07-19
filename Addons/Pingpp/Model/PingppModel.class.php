<?php

namespace Addons\Pingpp\Model;
use Think\Model;

/**
 * Pingpp模型
 */
class PingppModel extends Model{
    protected $tableName = 'pingpp_order';

    public function addCharge($charge,$refunds)
    {

        $charge['amount'] = $charge['amount'] / 100;
        $data['charge_id'] = $charge['id'];
        $data['channel'] = $charge['channel'];
        $data['order_no'] = $charge['order_no'];
        $data['charge'] = json_encode($charge);
        $data['created'] = $charge['created'];
        $data['amount'] = $charge['amount'];
        $data['refunds'] = json_encode($refunds);
        $result = $this->add($data);
        if (!$result) {
            return false;
        }else{
            return $data['order_no'];
        }

    }




}
