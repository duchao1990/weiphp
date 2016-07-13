<?php
return array(
	'alipay'=>array(//配置在表单中的键名 ,这个会是config[random]
		'title'=>'支付宝手机支付',//表单的文字
		'type'=>'radio',		 //表单的类型：text、textarea、checkbox、radio、select等
		'options'=>array(		 //select 和radion、checkbox的子选项
			'1'=>'开启',		 //值=>文字
			'0'=>'关闭',
		),
		'value'=>'0',			 //表单的默认值
	),
	'alipay_wap'=>array(//配置在表单中的键名 ,这个会是config[random]
		'title'=>'支付宝手机网页支付',//表单的文字
		'type'=>'radio',		 //表单的类型：text、textarea、checkbox、radio、select等
		'options'=>array(		 //select 和radion、checkbox的子选项
			'1'=>'开启',		 //值=>文字
			'0'=>'关闭',
		),
		'value'=>'0',			 //表单的默认值
	),
	'alipay_qr'=>array(//配置在表单中的键名 ,这个会是config[random]
		'title'=>'支付宝扫码支付',//表单的文字
		'type'=>'radio',		 //表单的类型：text、textarea、checkbox、radio、select等
		'options'=>array(		 //select 和radion、checkbox的子选项
			'1'=>'开启',		 //值=>文字
			'0'=>'关闭',
		),
		'value'=>'0',			 //表单的默认值
	),
	'alipay_pc_direct'=>array(//配置在表单中的键名 ,这个会是config[random]
		'title'=>'支付宝 PC 网页支付',//表单的文字
		'type'=>'radio',		 //表单的类型：text、textarea、checkbox、radio、select等
		'options'=>array(		 //select 和radion、checkbox的子选项
			'1'=>'开启',		 //值=>文字
			'0'=>'关闭',
		),
		'value'=>'0',			 //表单的默认值
	),
	'wx'=>array(//配置在表单中的键名 ,这个会是config[random]
		'title'=>'微信支付',//表单的文字
		'type'=>'radio',		 //表单的类型：text、textarea、checkbox、radio、select等
		'options'=>array(		 //select 和radion、checkbox的子选项
			'1'=>'开启',		 //值=>文字
			'0'=>'关闭',
		),
		'value'=>'0',			 //表单的默认值
	),
	'wx_pub'=>array(//配置在表单中的键名 ,这个会是config[random]
		'title'=>'微信公众账号支付',//表单的文字
		'type'=>'radio',		 //表单的类型：text、textarea、checkbox、radio、select等
		'options'=>array(		 //select 和radion、checkbox的子选项
			'1'=>'开启',		 //值=>文字
			'0'=>'关闭',
		),
		'value'=>'0',			 //表单的默认值
	),
	'wx_pub_qr'=>array(//配置在表单中的键名 ,这个会是config[random]
		'title'=>'微信公众账号扫码支付',//表单的文字
		'type'=>'radio',		 //表单的类型：text、textarea、checkbox、radio、select等
		'options'=>array(		 //select 和radion、checkbox的子选项
			'1'=>'开启',		 //值=>文字
			'0'=>'关闭',
		),
		'value'=>'0',			 //表单的默认值
	),
);
					