package com.claude.wmall.shopping.service.impl;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.net.URL;
import java.net.URLConnection;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import net.sf.json.xml.XMLSerializer;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.stereotype.Service;

import com.claude.wmall.commons.dao.Constants;
import com.claude.wmall.commons.utils.MD5;
import com.claude.wmall.commons.utils.SHA1;
import com.claude.wmall.shopping.service.WechartService;


@Service

public class WechartServiceImpl implements WechartService {


    private String appid = Constants.WXAPPID;
    private String secret = Constants.WXSECRET;
    private String mchid = Constants.WXMCHID;
    private String key = Constants.WXKEY;

    public String getAppid() {
        return appid;
    }

    public void setAppid(String appid) {
        this.appid = appid;
    }

    public String getSecret() {
        return secret;
    }

    public void setSecret(String secret) {
        this.secret = secret;
    }

    public String getoauth2accesstoken(String code) throws IOException {
        BufferedReader in = null;
        StringBuffer result = new StringBuffer();
        String url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + this.appid + "&secret=" + this.secret + "&code=" + code + "&grant_type=authorization_code";
        System.out.println(url);
        URL realUrl = new URL(url);
        URLConnection connection = realUrl.openConnection();
        connection.connect();
        //Map<String, List<String>> map = connection.getHeaderFields();
        // 遍历所有的响应头字段
        //for (String key : map.keySet()) {
        //    System.out.println(key + "--->" + map.get(key));
        //}
        in = new BufferedReader(new InputStreamReader(
                connection.getInputStream()));
        String line;
        while ((line = in.readLine()) != null) {
            result.append(line);
        }
        in.close();
        System.out.println("result.toString()=====" + result.toString());
        return result.toString();
    }


    /**
     * @param accesstoken
     * @param openid
     * @return
     * @throws IOException
     */
    public String getUserinfo(String accesstoken, String openid) throws IOException {
        BufferedReader in = null;
        StringBuffer result = new StringBuffer();
        //System.out.println(ACCESS_TOKEN);
        String url = "https://api.weixin.qq.com/sns/userinfo?access_token=" + accesstoken + "&openid=" + openid + "&lang=zh_CN";
        URL realUrl = new URL(url);
        URLConnection connection = realUrl.openConnection();
        //connection.setRequestProperty("Accept-Language",Locale.getDefault().toString());
        //connection.setRequestProperty("Accept-Charset", "UTF-8");
        connection.connect();
        Map<String, List<String>> map = connection.getHeaderFields();
        // 遍历所有的响应头字段
        for (String key : map.keySet()) {
            System.out.println(key + "--->" + map.get(key));
        }
        in = new BufferedReader(new InputStreamReader(
                connection.getInputStream(), "UTF-8"));
        String line;
        while ((line = in.readLine()) != null) {
            result.append(line);
        }
        in.close();
        return result.toString();
    }


    public String gettoken() throws IOException {
        BufferedReader in = null;
        StringBuffer result = new StringBuffer();
        String url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + this.appid + "&secret=" + this.secret;
        URL realUrl = new URL(url);
        System.out.println("url123456====" + url);
        URLConnection connection = realUrl.openConnection();
        connection.connect();
        //Map<String, List<String>> map = connection.getHeaderFields();
        // 遍历所有的响应头字段
        //for (String key : map.keySet()) {
        //    System.out.println(key + "--->" + map.get(key));
        //}
        in = new BufferedReader(new InputStreamReader(
                connection.getInputStream()));
        String line;
        while ((line = in.readLine()) != null) {
            result.append(line);
        }
        in.close();
        return result.toString();
    }

    public String getticket(String ACCESS_TOKEN) throws IOException {
        BufferedReader in = null;
        StringBuffer result = new StringBuffer();
        String url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=" + ACCESS_TOKEN + "&type=jsapi";
        URL realUrl = new URL(url);
        URLConnection connection = realUrl.openConnection();
        connection.connect();
        //Map<String, List<String>> map = connection.getHeaderFields();
        // 遍历所有的响应头字段
        //for (String key : map.keySet()) {
        //    System.out.println(key + "--->" + map.get(key));
        //}
        in = new BufferedReader(new InputStreamReader(
                connection.getInputStream()));
        String line;
        while ((line = in.readLine()) != null) {
            result.append(line);
        }
        in.close();
        return result.toString();
    }

    public String getsignature(String ticket, String url) throws IOException {
        String result = "";
        String noncestr = "Wm3WZYTPz0wzccnW";
        String jsapi_ticket = ticket;
        String timestamp = "1414587457";
        System.out.println("ticket++++++++=======" + ticket);
        System.out.println(url);
        String s = "jsapi_ticket=" + jsapi_ticket + "&noncestr=" + noncestr + "&timestamp=" + timestamp + "&url=" + url;
        String digest = new SHA1().getDigestOfString(s.getBytes());
        result = "{'signature':'" + digest + "'}";
        System.out.println(result);
        return result.toString();
    }


    /**
     * @param ordernum
     * @return
     * @throws IOException
     */
    public String getsign(String ordernum) {
        String stringA = "appid=" + this.appid + "&mch_id=" + this.mchid + "&nonce_str=Wm3WZYTPz0wzccnW&out_trade_no=" + ordernum + "";
        //第二步：拼接API密钥：
        String stringSignTemp = stringA + "&key=" + this.key; //拼接API密钥：
        System.out.println("stringSignTemp=" + stringSignTemp);
        MD5 getMD5 = new MD5();
        String sign = getMD5.GetMD5Code(stringSignTemp).toUpperCase();//="9A0A8659F005D6984697E2CA0A9CF3B7";
        return sign;
    }

    public String prepay(String openid, String ip, String ordernum, String newOrderNo, String totalnum) throws IOException {


        System.out.println("total=" + totalnum);
        //System.out.println(Float.parseFloat(totalnum)*100);

        String total = "1";
        total = new BigDecimal(Float.parseFloat(totalnum) * 100).setScale(0, BigDecimal.ROUND_HALF_UP).toString();
        //openid = "o2prcw5BRR2D61FHMqyBAuCPUm2Y";

        //appid
        //第一步：对参数按照key=value的格式，并按照参数名ASCII字典序排序如下：
        //stringA="appid=wxd930ea5d5a258f4f&body=test&device_info=1000&mch_id=10000100&nonce_str=ibuaiVcKdpRxkhJA";
        String stringA = "appid=" + this.appid + "&body=yiqing&mch_id=" + this.mchid + "&nonce_str=Wm3WZYTPz0wzccnW&notify_url=" + Constants.WXDOMAIN + "/yq/pay/wxNotifyUrl.do&openid=" + openid + "&out_trade_no=" + newOrderNo + "&spbill_create_ip=" + ip + "&total_fee=" + total + "&trade_type=JSAPI";
        //第二步：拼接API密钥：
        String stringSignTemp = stringA + "&key=" + this.key; //拼接API密钥：
        //1qazxsw20polmnkiujh876tghd564wed
        //232301197809162717liyingdilihong
        System.out.println("stringSignTemp=" + stringSignTemp);
        MD5 getMD5 = new MD5();
        String sign = getMD5.GetMD5Code(stringSignTemp).toUpperCase();//="9A0A8659F005D6984697E2CA0A9CF3B7";
        //String sign = "";
        //最终得到最终发送的数据：
        /*<xml>
        <appid>wxd930ea5d5a258f4f</appid>
		<mch_id>10000100</mch_id>
		<device_info>1000<device_info>
		<body>test</body>
		<nonce_str>ibuaiVcKdpRxkhJA</nonce_str>
		<sign>9A0A8659F005D6984697E2CA0A9CF3B7</sign>
		<xml>*/
        System.out.println("sign===========222222222222222=====" + sign);
        String xmlData = "" +

                "<xml>" +
                "   <appid>" + this.appid + "</appid>" +
                "   <body>yiqing</body>" +
                "   <mch_id>" + this.mchid + "</mch_id>" +
                "   <nonce_str>Wm3WZYTPz0wzccnW</nonce_str>" +
                "   <notify_url>" + Constants.WXDOMAIN + "/yq/pay/wxNotifyUrl.do</notify_url>" +
                "   <openid>" + openid + "</openid>" +
                "   <out_trade_no>" + newOrderNo + "</out_trade_no>" +
                "   <spbill_create_ip>" + ip + "</spbill_create_ip>" +
                "   <total_fee>" + total + "</total_fee>" +
                "   <trade_type>JSAPI</trade_type>" +
                "   <sign>" + sign + "</sign>" +
                "</xml>" +
                "";
        String url = "https://api.mch.weixin.qq.com/pay/unifiedorder";
        URL realUrl = new URL(url);
        URLConnection connection = realUrl.openConnection();
        connection.setDoOutput(true);
        connection.setDoInput(true);
        connection.setUseCaches(false);
        InputStream instr = null;
        connection.setRequestProperty("Content-Type", "text/xml");
        connection.setRequestProperty("Accept-Charset", "utf-8");
        byte[] xmlInfo = xmlData.getBytes();
        connection.setRequestProperty("Content-length",
                String.valueOf(xmlInfo.length));
        DataOutputStream printout = new DataOutputStream(
                connection.getOutputStream());
        printout.write(xmlInfo);
        printout.flush();
        printout.close();
        instr = connection.getInputStream();
        byte[] bis = InputStreamTOByte(instr);
        String ResponseString = new String(bis, "UTF-8");
        if ((ResponseString == null) || ("".equals(ResponseString.trim()))) {
            System.out.println("返回空");
        }
        System.out.println(ResponseString.toString());
        String result = new XMLSerializer().read(ResponseString.toString()).toString();
        //System.out.println(result);
        return result;
    }

    public boolean orderquery(String out_trade_no, String sign) throws IOException {

        String xmlData = "" +
                "<xml>" +
                "   <appid>" + this.appid + "</appid>" +
                "   <mch_id>" + this.mchid + "</mch_id>" +
                "   <nonce_str>Wm3WZYTPz0wzccnW</nonce_str>" +
                "   <out_trade_no>" + out_trade_no + "</out_trade_no>" +
                "   <sign>" + sign + "</sign>" +
                "</xml>" +
                "";

        String url = "https://api.mch.weixin.qq.com/pay/orderquery";
        URL realUrl = new URL(url);
        URLConnection connection = realUrl.openConnection();
        connection.setDoOutput(true);
        connection.setDoInput(true);
        connection.setUseCaches(false);
        InputStream instr = null;
        connection.setRequestProperty("Content-Type", "text/xml");
        byte[] xmlInfo = xmlData.getBytes();
        connection.setRequestProperty("Content-length",
                String.valueOf(xmlInfo.length));
        DataOutputStream printout = new DataOutputStream(
                connection.getOutputStream());
        printout.write(xmlInfo);
        printout.flush();
        printout.close();
        instr = connection.getInputStream();
        byte[] bis = InputStreamTOByte(instr);
        String ResponseString = new String(bis, "UTF-8");
        if ((ResponseString == null) || ("".equals(ResponseString.trim()))) {
            System.out.println("返回空");
        }
        System.out.println(ResponseString.toString());
        String result = new XMLSerializer().read(ResponseString.toString()).toString();
        //System.out.println(result);
        return true;
    }

    public String getsignaturepay(String prepay_id) throws IOException {
        String result = "";
        String appId = this.appid;
        String timeStamp = "1414587457";
        String nonceStr = "Wm3WZYTPz0wzccnW";
        String signType = "MD5";
        String s = "appId=" + appId + "&nonceStr=" + nonceStr + "&package=prepay_id=" + prepay_id + "&signType=" + signType + "&timeStamp=" + timeStamp;
        s = s + "&key=" + this.key;
        System.out.println(s);
        MD5 getMD5 = new MD5();
        String digest = getMD5.GetMD5Code(s).toUpperCase();
        System.out.println(digest);
        result = "{'signature':'" + digest + "'}";
        return result.toString();
    }

    public void send(String usercode, String productName) throws IOException, JSONException {
        BufferedReader in = null;
        StringBuffer result = new StringBuffer();
        String url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + this.appid + "&secret=" + this.secret;
        URL realUrl = new URL(url);
        URLConnection connection = realUrl.openConnection();
        in = new BufferedReader(new InputStreamReader(
                connection.getInputStream()));
        String line;
        while ((line = in.readLine()) != null) {
            result.append(line);
        }
        in.close();
//System.out.println("openid:"+usercode);
        String xmlData = "{" +
                "    \"touser\":\"" + usercode + "\"," +
                "    \"msgtype\":\"text\"," +
                "    \"text\":" +
                "    {" +
                "         \"content\":\"恭喜您购买产品" + productName + "成功，我们会尽快为您安排发货！\"" +
                "    }" +
                "}";
        JSONObject json = new JSONObject(result.toString());
        String access_token = json.getString("access_token").toString();
        //System.out.println(access_token);
        String urlsend = "https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=" + access_token;
        URL realUrlsend = new URL(urlsend);
        URLConnection urlCon = realUrlsend.openConnection();
        urlCon.setDoOutput(true);
        urlCon.setDoInput(true);
        urlCon.setUseCaches(false);
        InputStream instr = null;
        urlCon.setRequestProperty("Content-Type", "text/xml");
        urlCon.setRequestProperty("Accept-Language", Locale.getDefault().toString());
        urlCon.setRequestProperty("Accept-Charset", "UTF-8");
        byte[] xmlInfo = xmlData.getBytes("UTF-8");
        urlCon.setRequestProperty("Content-length",
                String.valueOf(xmlInfo.length));
        DataOutputStream printout = new DataOutputStream(
                urlCon.getOutputStream());
        printout.write(xmlInfo);
        printout.flush();
        printout.close();
        instr = urlCon.getInputStream();
        byte[] bis = InputStreamTOByte(instr);
        String ResponseString = new String(bis, "UTF-8");
        if ((ResponseString == null) || ("".equals(ResponseString.trim()))) {
            System.out.println("返回空");
        }
        System.out.println("返回数据为:" + ResponseString);
    }

    public void sendWXMessage(String openid, String message) throws IOException, JSONException {
        BufferedReader in = null;
        StringBuffer result = new StringBuffer();
        String url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + this.appid + "&secret=" + this.secret;
        URL realUrl = new URL(url);
        URLConnection connection = realUrl.openConnection();
        in = new BufferedReader(new InputStreamReader(
                connection.getInputStream()));
        String line;
        while ((line = in.readLine()) != null) {
            result.append(line);
        }
        in.close();
//System.out.println("openid:"+usercode);
        String xmlData = "{" +
                "    \"touser\":\"" + openid + "\"," +
                "    \"msgtype\":\"text\"," +
                "    \"text\":" +
                "    {" +
                "         \"content\":\"" + message + "\"" +
                "    }" +
                "}";
        JSONObject json = new JSONObject(result.toString());
        String access_token = json.getString("access_token").toString();
        //System.out.println(access_token);
        String urlsend = "https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=" + access_token;
        URL realUrlsend = new URL(urlsend);
        URLConnection urlCon = realUrlsend.openConnection();
        urlCon.setDoOutput(true);
        urlCon.setDoInput(true);
        urlCon.setUseCaches(false);
        InputStream instr = null;
        urlCon.setRequestProperty("Content-Type", "text/xml");
        urlCon.setRequestProperty("Accept-Language", Locale.getDefault().toString());
        urlCon.setRequestProperty("Accept-Charset", "UTF-8");
        byte[] xmlInfo = xmlData.getBytes("UTF-8");
        urlCon.setRequestProperty("Content-length",
                String.valueOf(xmlInfo.length));
        DataOutputStream printout = new DataOutputStream(
                urlCon.getOutputStream());
        printout.write(xmlInfo);
        printout.flush();
        printout.close();
        instr = urlCon.getInputStream();
        byte[] bis = InputStreamTOByte(instr);
        String ResponseString = new String(bis, "UTF-8");
        if ((ResponseString == null) || ("".equals(ResponseString.trim()))) {
            System.out.println("返回空");
        }
        System.out.println("返回数据为:" + ResponseString);
    }

    public void sendCardWXMessage(String openid, String message) throws IOException, JSONException {
        BufferedReader in = null;
        StringBuffer result = new StringBuffer();
        String url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + this.appid + "&secret=" + this.secret;
        URL realUrl = new URL(url);
        URLConnection connection = realUrl.openConnection();
        in = new BufferedReader(new InputStreamReader(
                connection.getInputStream()));
        String line;
        while ((line = in.readLine()) != null) {
            result.append(line);
        }
        in.close();
//System.out.println("openid:"+usercode);
        String xmlData = "{" +
                "    \"touser\":\"" + openid + "\"," +
                "    \"msgtype\":\"text\"," +
                "    \"text\":" +
                "    {" +
                "         \"content\":\"" + message + "\"" +
                "    }" +
                "}";
        JSONObject json = new JSONObject(result.toString());
        String access_token = json.getString("access_token").toString();
        //System.out.println(access_token);
        String urlsend = "https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=" + access_token;
        URL realUrlsend = new URL(urlsend);
        URLConnection urlCon = realUrlsend.openConnection();
        urlCon.setDoOutput(true);
        urlCon.setDoInput(true);
        urlCon.setUseCaches(false);
        InputStream instr = null;
        urlCon.setRequestProperty("Content-Type", "text/xml");
        urlCon.setRequestProperty("Accept-Language", Locale.getDefault().toString());
        urlCon.setRequestProperty("Accept-Charset", "UTF-8");
        byte[] xmlInfo = xmlData.getBytes("UTF-8");
        urlCon.setRequestProperty("Content-length",
                String.valueOf(xmlInfo.length));
        DataOutputStream printout = new DataOutputStream(
                urlCon.getOutputStream());
        printout.write(xmlInfo);
        printout.flush();
        printout.close();
        instr = urlCon.getInputStream();
        byte[] bis = InputStreamTOByte(instr);
        String ResponseString = new String(bis, "UTF-8");
        if ((ResponseString == null) || ("".equals(ResponseString.trim()))) {
            System.out.println("返回空");
        }
        System.out.println("返回数据为:" + ResponseString);
    }


    public void sendShouHuoWXMessage(String openid, String message) throws IOException, JSONException {
        BufferedReader in = null;
        StringBuffer result = new StringBuffer();
        String url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + this.appid + "&secret=" + this.secret;
        URL realUrl = new URL(url);
        URLConnection connection = realUrl.openConnection();
        in = new BufferedReader(new InputStreamReader(
                connection.getInputStream()));
        String line;
        while ((line = in.readLine()) != null) {
            result.append(line);
        }
        in.close();
//System.out.println("openid:"+usercode);
        String xmlData = "{" +
                "    \"touser\":\"" + openid + "\"," +
                "    \"msgtype\":\"text\"," +
                "    \"text\":" +
                "    {" +
                "         \"content\":\"" + message + "\"" +
                "    }" +
                "}";
        JSONObject json = new JSONObject(result.toString());
        String access_token = json.getString("access_token").toString();
        //System.out.println(access_token);
        String urlsend = "https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=" + access_token;
        URL realUrlsend = new URL(urlsend);
        URLConnection urlCon = realUrlsend.openConnection();
        urlCon.setDoOutput(true);
        urlCon.setDoInput(true);
        urlCon.setUseCaches(false);
        InputStream instr = null;
        urlCon.setRequestProperty("Content-Type", "text/xml");
        urlCon.setRequestProperty("Accept-Language", Locale.getDefault().toString());
        urlCon.setRequestProperty("Accept-Charset", "UTF-8");
        byte[] xmlInfo = xmlData.getBytes("UTF-8");
        urlCon.setRequestProperty("Content-length",
                String.valueOf(xmlInfo.length));
        DataOutputStream printout = new DataOutputStream(
                urlCon.getOutputStream());
        printout.write(xmlInfo);
        printout.flush();
        printout.close();
        instr = urlCon.getInputStream();
        byte[] bis = InputStreamTOByte(instr);
        String ResponseString = new String(bis, "UTF-8");
        if ((ResponseString == null) || ("".equals(ResponseString.trim()))) {
            System.out.println("返回空");
        }
        System.out.println("返回数据为:" + ResponseString);
    }

    public static void main(String[] args) throws Exception {
//		BufferedReader in = null;
//		StringBuffer result = new StringBuffer();
//		String url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxd19ab3175ab12fac&secret=9560bf0b66a35947135c87fbcc9b84d6";
//		URL realUrl = new URL(url);
//		System.out.println("url123456===="+url);
//		URLConnection connection = realUrl.openConnection();
//		connection.connect();
//		//Map<String, List<String>> map = connection.getHeaderFields();
//        // 遍历所有的响应头字段
//        //for (String key : map.keySet()) {
//        //    System.out.println(key + "--->" + map.get(key));
//        //}
//        in = new BufferedReader(new InputStreamReader(
//                connection.getInputStream()));
//        String line;
//        while ((line = in.readLine()) != null) {
//        	result.append(line);
//        }
//        in.close();
//     

//		BufferedReader in = null;
//		StringBuffer result = new StringBuffer();
//		String url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=v1TVz051Fni6vKFccyFUqfI-NHYTS-b4jnCYWdqG3OhgugjlyGbybnz3DCvLQhcnwKlXxP8cWtS1UOZ2_94jr_rI8nate8H6S7FRWf8MFLeTmJeIduNa4exvIP0AxGjWQTQhABAJMJ&type=jsapi";
//		URL realUrl = new URL(url);
//		URLConnection connection = realUrl.openConnection();
//		connection.connect();
//		//Map<String, List<String>> map = connection.getHeaderFields();
//        // 遍历所有的响应头字段
//        //for (String key : map.keySet()) {
//        //    System.out.println(key + "--->" + map.get(key));
//        //}
//        in = new BufferedReader(new InputStreamReader(
//                connection.getInputStream()));
//        String line;
//        while ((line = in.readLine()) != null) {
//        	result.append(line);
//        }
//        in.close();
        //   return result.toString();
        // System.out.println("============================"+result.toString()) ;

        String result = "";
        String noncestr = "Wm3WZYTPz0wzccnW";
        String jsapi_ticket = "kgt8ON7yVITDhtdwci0qeaZVTjKQiX2g0FAPMCyyAyPpqhaW-VHFwEd7aMfiGtF2ehvxKO_xksQWLZGxXnqFsw";
        String timestamp = "1414587457";
        System.out.println("ticket++++++++=======" + jsapi_ticket);
        //	System.out.println(url);
        String s = "jsapi_ticket=" + jsapi_ticket + "&noncestr=" + noncestr + "&timestamp=" + timestamp + "&url=http://localhost:8080/yq/wechart/personalCenter.html#";
        String digest = new SHA1().getDigestOfString(s.getBytes());
        result = "{'signature':'" + digest + "'}";
        System.out.println(result);


        System.out.println("============================" + result.toString());

    }

	@Override
	public byte[] InputStreamTOByte(InputStream in) throws IOException {
		// TODO Auto-generated method stub
		return null;
	}

}
