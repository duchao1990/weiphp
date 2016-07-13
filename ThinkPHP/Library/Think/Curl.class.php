<?php
/**
 * Created by PhpStorm.
 * User: cucme
 * Date: 2016/6/16
 * Time: 14:14
 */

namespace Think;


class Curl
{
    /**
     * 执行CURL请求
     * @author: duchao<duchao1009@gmail.com>
     * @param $url
     * @return mixed
     */
    private function async($url)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        $resp = curl_exec($ch);
        curl_close($ch);
        return $resp;
    }

    public function getdata($crtl,$fun,$str){
        $url = "http://www.zhongfox.com/api.php?s=/".$crtl."/".$fun.$str;
        $resp = $this->async($url);
        return $resp;
    }
}