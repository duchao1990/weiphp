<?php

namespace Addons\Shop\Model;

use Think\Model;

/**
 * Shop模型
 */
class CartModel extends Model {
	protected $tableName = 'shop_cart';

	function getMyCart($uid, $update = false) {
		$key = 'Cart_getMyCart_' . $uid;
		$sinfo = S ( $key );
		if ($sinfo === false || $update) {
			$map ['uid'] = $uid;
			$info = $this->where ( $map )->select ();
//			dump($info);
			$goodsDao = D ( 'Addons://Shop/Goods' );
			foreach ( $info as $key=>$v ) {
				$sinfo[$v['goods_id']]=$info[$key];
				unset($info[$key]);
			}
//			dump($info);
//			die;
			S ( $key, $sinfo );
		}
		
		return $sinfo;
	}
	function addToCart($goods) {
		$myList = $this->getMyCart ( $goods ['uid'] );
//		dump($myList);
//		die;
		if (isset ( $myList [$goods ['goods_id']] )) {
			$num = $myList [$goods ['goods_id']] ['num'] + $goods ['num'];
			$map ['id'] = $myList [$goods ['goods_id']] ['id'];
			$this->where ( $map )->setField ( 'num', $num );
		} else {
			$goods ['openid'] = get_openid ();
			$this->add ( $goods );
		}
		return count ( $this->getMyCart ( $goods ['uid'], true ) );
	}
	function delCart($ids) {
		$ids = array_filter ( explode ( ',', $ids ) );
		if (empty ( $ids ))
			return 0;
		
		$map ['id'] = array (
				'in',
				$ids 
		);
		return $this->where ( $map )->delete ();
	}
	function delUserCart($uid, $goods_ids) {
		$map ['goods_id'] = array ('in', $goods_ids);
		$map ['uid'] = $uid;
		$res = $this->where ( $map )->delete ();
		
		$this->getMyCart ( $uid, true );
		return $res;
	}
}
