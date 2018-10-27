package com.claude.wmall.app.send;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;

import com.claude.wmall.commons.dao.Constants;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;



public class WeiXinSend {
	public static final String GET_TOKEN_URL = "https://qyapi.weixin.qq.com/cgi-bin/gettoken";// 获取access
    public static final String CORPID = Constants.WXCORPID;
    public static final String CORPSECRET = Constants.WXCORPSECRET;
    
    
    public static void send(String xmlInfo) throws IOException {
		//8HoElq2_0so9MQ_nIxB_lrkqeUVqoJ9bQgx-nhrVb-5fiPnNQT4euOd0HWC4iUrN
    	getAccessToken getAT = new getAccessToken();
    	String access_token = getAT.getToken(GET_TOKEN_URL, CORPID, CORPSECRET);
		URL url = new URL("https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token="+access_token);
		InputStream instr = null;
		ByteArrayOutputStream out = null;
		byte[] xmlData = xmlInfo.getBytes("UTF-8");
		URLConnection urlCon = url.openConnection();
		urlCon.setDoOutput(true);
		urlCon.setDoInput(true);
		urlCon.setUseCaches(false);
		urlCon.setRequestProperty("Content-Type", "text/xml");
		urlCon.setRequestProperty("Content-length",
				String.valueOf(xmlData.length));
		System.out.println(String.valueOf(xmlData.length));
		DataOutputStream printout = new DataOutputStream(
				urlCon.getOutputStream());
		printout.write(xmlData);
		printout.flush();
		printout.close();
		instr = urlCon.getInputStream();
		byte[] bis = InputStreamTOByte(instr);
		String ResponseString = new String(bis, "UTF-8");
		if ((ResponseString == null) || ("".equals(ResponseString.trim()))) {
			System.out.println("返回空");
		}
		System.out.println("返回数据为:" + ResponseString);
		// return ResponseString;
	}
  	public static byte[] InputStreamTOByte(InputStream in) throws IOException {
		ByteArrayOutputStream outStream = new ByteArrayOutputStream();
		byte[] data = new byte[4];
		int count = -1;
		while ((count = in.read(data, 0, 4)) != -1)
			outStream.write(data, 0, count);
		data = null;
		return outStream.toByteArray();
	}
	 public void SendMessager(String weiXinH) throws IOException{

         //获取用户微信账号
//			String[] weiXIn = null;
//				String  weiXinH = "redtigerking";
				
				if (weiXinH != null && !weiXinH.equals("")) {
//					String wurl = "http://wlbrs.gicp.net/S-OA/weixin/wxgetProcessActivity.do?taskId=" 
//					String wurl = "http://oa.hsyl.com:8080/S-OA/weixin/wxgetProcessActivity.do?taskId="
//					+ tasks.get(0).getTaskId()
//					+ "&activityName=" + tasks.get(0).getActivityName() 
//					+ "&runId=" + runId1
//					+ "&fullname="+appuser.getFullname()
//					+ "&wxuserId=" + appuser.getUserId();
					// "http://wlbrs.gicp.net/S-OA/flow/getProcessActivity.do?taskId=170039&_dc=1430034843771";
//					String Json = "{" 
//					        + "   \"touser\": \""+ weiXinH + "\","
//							+ "   \"toparty\": \"\","
//							+ "   \"totag\": \"\","
//							+ "   \"msgtype\": \"news\","
//							+ "   \"agentid\": \"1\","
//							+ "   \"news\": {"
//							+ "   \"articles\":[" + "{"
//							+ "   \"title\": \"系统提示:\","
//							+ "   \"description\": \"你当前有一条审批流程请处理\","
////							+ "   \"url\": \"" + wurl + "\"," 
//							//+ "\"picurl\": \"http://imgsrc.baidu.com/forum/w%3D580/sign=8d506c90c3fdfc03e578e3b0e43e87a9/f64fb499a9014c082baab2cb0a7b02087af4f4b2.jpg\""+
//							+ "           }" 
//							+ "       ]" 
//							+ "   }" 
//							+ "}";
					int a = 8,b=65;
					   String Json = "{"+
							   "    \"touser\":\""+weiXinH+"\","+
							   "    \"msgtype\":\"text\","+ 
							   "   \"agentid\": \"1\","+
							   "    \"text\":"+
							   "    {"+
							   "         \"content\":\"用户量:" + a + ",销售量: " + b +"\""+
							   "    }"+
							   "}";
					send(Json);
				}
			}
		
}
