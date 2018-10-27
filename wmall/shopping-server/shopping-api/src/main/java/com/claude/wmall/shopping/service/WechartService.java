package com.claude.wmall.shopping.service;

import java.io.IOException;
import java.io.InputStream;

import org.codehaus.jettison.json.JSONException;

public interface WechartService {
	
	public String getAppid();

	public void setAppid(String appid);

	public String getSecret();

	public void setSecret(String secret);
	
	public String getoauth2accesstoken(String code) throws IOException;

	public String getUserinfo(String accesstoken, String openid) throws IOException;
	
	public String gettoken() throws IOException;
	
	public String getticket(String ACCESS_TOKEN) throws IOException ;
	
	public String getsignature(String ticket,String url) throws IOException ;
	
	public String getsign(String ordernum);
	
	public String prepay(String openid,String ip,String ordernum,String newOrderNo,String totalnum) throws IOException  ;
	
	public boolean orderquery(String out_trade_no,String sign) throws IOException;
	
	public abstract byte[] InputStreamTOByte(InputStream in) throws IOException ;
	
	public String getsignaturepay(String prepay_id) throws IOException;
	
	public void send(String usercode,String productName) throws IOException, JSONException;
	
	public void sendWXMessage(String openid,String message) throws IOException, JSONException ;
	
	public void sendCardWXMessage(String openid,String message) throws IOException, JSONException ;
	
	public void sendShouHuoWXMessage(String openid,String message) throws IOException, JSONException ;
	
}
