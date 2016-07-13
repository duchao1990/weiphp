<?php
namespace Think;
//普通提交方式
Vendor('CCPRestSDK');
//目标主机的地址，我这里填上测试的地址
/**
 * 发送模板短信
 * @param to 手机号码集合,用英文逗号分开
 * @param datas 内容数据 格式为数组 例如：array('Marry','Alon')，如不需替换请填 null
 * @param $tempId 模板Id
 */
class Sms {
    public $accountSid= '8a216da854e74cfc0154eb0cbbf5030f';
    
    //主帐号Token
    public $accountToken= 'e57d523c9199434cad8a8c9d4e4d9020';
    
    //应用Id
    public $appId='8a216da854ebfcf70154f0f8fee4056f';
    
    //请求地址，格式如下，不需要写https://
    public $serverIP='app.cloopen.com';
    
    //请求端口
    public  $serverPort=8883;
    
    //REST版本号
    public $softVersion='2013-12-26';
    function sendTemplateSMS($to,$datas,$tempId)
    {
        // 初始化REST SDK
        global $accountSid,$accountToken,$appId,$serverIP,$serverPort,$softVersion;
        $rest = new \REST($this->serverIP,$this->serverPort,$this->softVersion);
        $rest->setAccount($this->accountSid,$this->accountToken);
        $rest->setAppId($this->appId);
    
        // 发送模板短信
        $result = $rest->sendTemplateSMS($to,$datas,$tempId);
        if($result == NULL ) {
             return false;
        }
        if($result->statusCode!=0) {
           return false;
            //TODO 添加错误处理逻辑
        }else{
            // 获取返回信息
            $smsmessage = $result->TemplateSMS;
            return true;
            //TODO 添加成功处理逻辑
        }
    }
    /**
     * 语音验证码
     * @param verifyCode 验证码内容，为数字和英文字母，不区分大小写，长度4-8位
     * @param playTimes 播放次数，1－3次
     * @param to 接收号码
     * @param displayNum 显示的主叫号码
     * @param respUrl 语音验证码状态通知回调地址，云通讯平台将向该Url地址发送呼叫结果通知
     * @param lang 语言类型。取值en（英文）、zh（中文），默认值zh。
     * @param userData 第三方私有数据
     */
    function voiceVerify($verifyCode,$playTimes,$to,$displayNum,$respUrl,$userData)
    {
        // 初始化REST SDK
        $rest = new \REST($this->serverIP,$this->serverPort,$this->softVersion);
        $rest->setAccount($this->accountSid,$this->accountToken);
        $rest->setAppId($this->appId);
    
        //调用语音验证码接口
        $result = $rest->voiceVerify($verifyCode,$playTimes,$to,$displayNum,$respUrl,'zh',$userData);
        if($result == NULL ) {
            echo "result error!";
        }
        if($result->statusCode!=0) {
            echo "error code :" . $result->statusCode . "<br>";
            echo "error msg :" . $result->statusMsg . "<br>";
            //TODO 添加错误处理逻辑
        } else{
//             return $verifyCode;
//             echo "voiceverify success!<br>";
//             // 获取返回信息
//             $voiceVerify = $result->VoiceVerify;
           
//             echo "callSid:".$voiceVerify->callSid."<br/>";
//             echo "dateCreated:".$voiceVerify->dateCreated."<br/>";
            return $verifyCode;
            //TODO 添加成功处理逻辑
        }
    }
}