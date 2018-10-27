package com.claude.wmall.commons.utils;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import jodd.mail.Email;
import jodd.mail.EmailMessage;
import jodd.mail.SendMailSession;
import jodd.mail.SmtpServer;

import org.dom4j.Document;
import org.dom4j.Element;


public class EMailSender {
	
	/**
	 * 发送邮件（用户验证码）
	 * @param subject
	 * @param message
	 * @param text
	 * @param toEmail
	 */
	public static void sendMail(String elementName, String toEmail, Map keys, String xmlFilePath) {
		// 从配置文件中读取用户配置；
		Map map = readEMailConfig(xmlFilePath, elementName);
		String smtpServerHost = map.get("smtpServerHost").toString();		// SMTP 服务器地址；
		Integer port = Integer.valueOf(map.get("smtpServerPort").toString());	// SMTP 服务器端口；
		String sender = map.get("sender").toString();						// 寄件人邮箱地址
		String password = map.get("password").toString();					// （寄件人）邮箱密码
		String subject = map.get("subject").toString();						// 邮件主题
		String message = map.get("message").toString();						// 正文内容
		
		message = messageKeyReplace(message, keys);
		
		Email oEmail = Email.create();
		oEmail.addMessage(new EmailMessage(message));
		oEmail.from(sender).to(toEmail); 
		oEmail.subject(subject);

		SendMailSession mailSession = new SmtpServer(smtpServerHost, port.intValue(), sender, password).createSession();
		mailSession.open();
		mailSession.sendMail(oEmail);
		mailSession.close();
		System.out.println("验证码“" + keys.get("%RegisterCode%") + "”已发送至“" + toEmail + "”!"); 
	}

	private static String messageKeyReplace(String message, Map keys) {
//		1.%UserName%用户名；					//		2.%PassWord%用户密码；
//		3.%CertCode%身份证号码；				//		4.%ExpertName%专家姓名；
//		5.%AdmdivCode%注册财政编码；			//		6.%AdmdivName%注册财政名称；
//		7.%ExpTypeCode%专家类型编码；		//		8.%ExpTypeName%专家类型名称；
//		9.%Phone%联系方式；					//		10.%EMail%邮箱地址；
//		11.%RegisterCode%注册码；			//		12.%ChnDateTime%中文格式的日期时间
//		13.%ChnDate%中文格式的日期			//		14.%CR%回车
//		15.%LF%换行							//		16.%CRLF%回车换行
		String resMessage = message;
		Iterator it = keys.keySet().iterator();
		while(it.hasNext()){
			String key = (String) it.next();
			String value = (String) keys.get(key);
			resMessage = resMessage.replaceAll(key, value);
		}
		return resMessage;
	}
	
	/**
	 * 获取：评审专家邮件发送配置文件中所设置的参数值；
	 * @param elementName -- 节点名称：专家节点名为 "expert"；
	 * @return
	 */
	private static Map readEMailConfig(String xmlFilePath, String elementName) {
		Map map = new HashMap();
		// 获取配置文件路径；
		String filePath = xmlFilePath + "\\WEB-INF\\classes\\register-config.xml";
		System.out.println("path = " + filePath);
		
		// 解析 XML 配置文件；
		Document doc = XMLHelper.parseXMLFromFile(filePath);
		Element root = doc.getRootElement();
		for (Iterator i = root.elementIterator(); i.hasNext();) {
			Element element = (Element) i.next();
			if (element.getName().equals(elementName)) {
				for (Iterator j = element.elementIterator(); j.hasNext();) {
					Element node = (Element) j.next();
					map.put(node.getName(), node.getTextTrim());
				}
			}
		}
		return map;
	}

}
