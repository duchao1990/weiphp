<?php
/**
 * Created by PhpStorm.
 * User: cucme
 * Date: 2016/6/27
 * Time: 14:40
 */

namespace Addons\WeiSite\Controller;


class IntefoController extends BaseController
{
    public function incScore() {
        //兑换物品fscore减去兑换的功德;
        $uid=$this->mid;
        $foid=I('get.foid');
        $field=I('get.field');
        $score=I('get.score')?I('get.score'):0;
        $gong=I('get.gong');
            $score1=M('user')->where('uid='.$uid)->getField('score');
            if ($score1>=$score) {
                if ($score==0) {
                    $result=true;
                }else{
                    $result=M('user')->where('uid='.$uid)->setDec('score',$score);
                }

                if ($result) {
                    $inteM=M('intefo');
                    $where['uid']=$uid;
                    $where['foid']=$foid;
                    $info=$inteM->where($where)->find();
                    if ($info) {
                        //已经存在
                        $updata=array('foscore'=>$info['foscore']+$score,$field=>$score+$info[$field],
                            $field.'time'=>time(),$field.'id'=>$gong);
                        $res=$inteM->where($where)->save($updata);
                    } else {
                        //不存在
                        $addata=array('uid'=>$uid,'foid'=>$foid,$field=>$score,'foscore'=>$score,$field.'time'=>time(),$field.'id'=>$gong);
                        $res=$inteM->add($addata);
                    }
                    if ($res) {
                        //佛的功德奖励成功
                        $msg=array('code'=>1,'msg'=>'操作成功','foguang'=>true);
                    }else{
                        $msg=array('code'=>0,'msg'=>'操作失败');
                    }

                } else {
                    $msg=array('code'=>0,'msg'=>'操作失败');
                }
                //检测是否符合三个条件符合展示佛光
            }else{
                $msg=array('code'=>0,'msg'=>'功德不足,请充值');
            };

        echo json_encode($msg);
    }


    public function getInfo()
    {
        $uid=$this->mid;
        $foid=I('get.foid');

            $inteM=M('intefo');
            $cguotime=3600*24;
            $chuatime=3600*24;
            $cxiangtime=3600*24;

            $info=$inteM->where(array('uid'=>$uid,'foid'=>$foid))->find();

            if ($info) {
                $time1=$info['guotime']+$cguotime-time();
                $time2=$info['huatime']+$cguotime-time();
                $time3=$info['xiangtime']+$cguotime-time();
                if ($time1>0) {
                    $guo= getguo($info['guoid'],'face');
                    $data['guo']=$guo?$guo:'image/action/guopan.png';
                }else{
                    $data['guo']='image/action/guopan.png';
                }
                if ($time2>0) {
                    $hua=gethua($info['huaid'],'face');
                    $data['hua']=$hua?$hua:'image/action/huaping.png';
                }else{
                    $data['hua']='image/action/huaping.png';
                }
                if ($time3>0) {
                    $xiang=getxiang($info['xiangid'],'xiang');
                    if ($xiang) {
                        $data['showxiang']=true;
                        $data['xiang']=$xiang;
                    }
                }
                //花果香都有.佛像发光
                if ($time1>0 && $time2>0 && $time3>0) {
                    $data['foguang']=true;
                }
            } else {
                $data=array(
                    'guo'=>'image/action/guopan.png',
                    'hua'=>'image/action/huaping.png',
                    'showxiang'=>'',
                    'foguang'=>''
                );
            }

        echo json_encode(array('code'=>1,'data'=>$data));


    }

}