package com.claude.wmall.commons.dao;

public class Constants {

	/********************************* 网站商城用户登录 **********************************************/
	/**
	 * The key for login users
	 */
	public static final String USER_KEY = "LOGIN_USER";
	
	/**
	 * 登录页面
	 */
	public static final String LOGIN_PAGE = "../sql.jxc.store/rLogin.do";
	
	/**
	 * 无需登录的页面
	 */
	public static final String[] NO_NEED_LOGIN_PAGE = {"ajaxLogin","ajaxRegist","rUpdatePass","rRegist","rLogin"};
	
	
	/********************************* 短信接口配置 **********************************************/
	
	public static final String url = "http://115.28.112.245:8082/SendMT/SendMessage";
	
	public static final String UserName = "bjyy"; // 用户名
	public static final String UserPass = "bjyy123"; // 密码
	public static final String Subid = "";
	
	
	

	/********************************* 微信应用配置 **********************************************/

	// /云迪特产
//	public static final String WXAPPID = "wxd19ab3175ab12fac";
//	public static final String WXSECRET = "9560bf0b66a35947135c87fbcc9b84d6";
//	public static final String WXREDIRECT_URI ="http%3A%2F%2Fwww.nmclaude.com%2Fyq%2Fwechart%2Flogin.html";
//	public static final String WXMCHID = "1288958801";
//	public static final String WXKEY = "1qazxsw20polmnkiujh876tghd564wed";
//	public static final String WXDOMAIN = "www.nmclaude.com";

	// 云时代电商平台 只用到手机支付
	public static final String WXYDAPPID = "wx1a1d0449fcdd253e";// wx1a1d0449fcdd253e
	public static final String WXYDSECRET = "3f787644f27be6ceadaa1f06eb8b985d";// 3f787644f27be6ceadaa1f06eb8b985d
	public static final String WXYDMCHID = "1254835001";
	public static final String WXYDKEY = "232301197809162717liyingdilihong";

	public static final String WXCORPID = "wx6375d8b699f7f956";
	public static final String WXCORPSECRET = "cv2rxj3y31Fm2CqUyu0K3B7POHMfS2HLn8kCG6lqmPplanXtuPUHleYrzBwENO8s";
	
	
	///////////////////////////////////优研//////////////////////////////////////////////////
//	
//	public static final String WXAPPID = "wx8105c8bb08632f6d";
//	public static final String WXSECRET = "e36f94bd4111a054e73b7be5effe360b";
//	public static final String WXREDIRECT_URI = "http%3A%2F%2Fwww.uyan365.com.cn%2Fetp%2Fwechart%2Flogin.html";
//	public static final String WXMCHID = "1330202201";
//	public static final String WXKEY = "1qazxsw20polmnkiujh876tghd564wed";
//	public static final String WXDOMAIN = "www.uyan365.com.cn";
	
	
	////////////////////壹清//////////////////////
	public static final String WXAPPID = "wx27578cc1fb3c01f1";
	public static final String WXSECRET = "be89254093f1b81102c06ced6cab6ec5";
	public static final String WXREDIRECT_URI ="http%3A%2F%2Fwww.nmclaude.com%2Fyq%2Fwechart%2Flogin.html";
	public static final String WXMCHID = "1249085601";
	public static final String WXKEY = "1qazxsw20polmnkiujh876tghd564wed";
	public static final String WXDOMAIN = "www.nmclaude.com";

}
