package com.claude.wmall.commons.utils;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

public class Send {

	public static void main(String[] arg) {
		try {
			String IP = "http://115.28.112.245:8082/SendMT/SendMessage";
			String UserName = "ceshi"; // 用户名
			String UserPass = "ceshi123"; // 密码
			String content = "【至臻】 java 验证码123123 % ，"; // new
														// String(s.getBytes(),"GBK");
														// ; //发送内容
			String mobile = "18047174720"; // 手机号
			String Subid = ""; // 扩展号
			try {
				content = URLEncoder.encode(content, "UTF-8");
				System.out.println(IP + "?" + "UserName=" + UserName
						+ "&UserPass=" + UserPass + "&Content=" + content
						+ "&Mobile=" + mobile + "&Subid=" + Subid);
				System.out.println("结果："
						+ httpGetSend(IP + "?" + "UserName=" + UserName
								+ "&UserPass=" + UserPass + "&Content="
								+ content + "&Mobile=" + mobile + "&Subid="
								+ Subid, "UTF-8"));
			} catch (Exception e) {
				e.printStackTrace();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static String httpGetSend(String snedUrl, String encoded) {
		String urlPath = snedUrl;
		StringBuffer sbf = new StringBuffer("");
		BufferedReader reader = null;
		HttpURLConnection uc = null;

		try {
			URL url = new URL(urlPath);
			uc = (HttpURLConnection) url.openConnection();
			uc.setConnectTimeout(30000);
			uc.setReadTimeout(30000);
			uc.setRequestMethod("GET");
			uc.setDoOutput(true);
			uc.setDoInput(true);

			uc.connect();
			reader = new BufferedReader(new InputStreamReader(
					uc.getInputStream())); // 读取服务器响应信息
			String line;
			while ((line = reader.readLine()) != null) {
				sbf.append(line);
			}
			reader.close();
			uc.disconnect();
			return sbf.toString();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				reader.close();
			} catch (Exception e2) {
				e2.printStackTrace();
			}
		}
		return null;
	}
}
