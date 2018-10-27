package com.claude.wmall.commons.utils;

import java.util.Random;

public class RegisterCodeBuilder {

	
	/**
	 * 获取：邮箱验证码
	 * @param emailAddress -- 邮箱地址
	 * @return
	 */
	public static String getRegisterCode(String emailAddress) {
		return getRandomString() + getEmailValidate(emailAddress);
	}

	
	/**32个字节列表，最大不要超过 64个字节；**/
	private static String CHAR_LIST = "0123456789ABCDEFGHJKLMNPQRTUVWXY";		// 注意：去除了 I,O,S,Z 4个字节；
	/**生成随机码的字节长度（1--8）**/
	private static int BYTE_LENGTH = 4;
	
	/**
	 * 获取：四位的随机数（由大写字母与数字构成）
	 */
	private static String getRandomString() {
		int charLen = CHAR_LIST.length();
		int maxValue = (int) Math.pow(charLen, BYTE_LENGTH);
		Random random = new Random();
		int iRandom = Math.abs(random.nextInt()) % maxValue;
		int pow = maxValue / charLen;
		int divisor = 0;
		String randomString = "";
		while (iRandom>(charLen - 1)) {
			divisor = iRandom / pow;
			randomString = randomString + CHAR_LIST.substring(divisor, divisor + 1);
			iRandom = iRandom % pow;
			pow = pow / charLen;
		}
		randomString = randomString + CHAR_LIST.substring(iRandom, iRandom + 1);
		if (randomString.length()<BYTE_LENGTH) {
			String zeros = "";
			for (int i=0; i<charLen; i++) {
				zeros = zeros + "0";
			}
			randomString = randomString + zeros.substring(randomString.length(), BYTE_LENGTH);
		}
		return randomString;
	}
	
	/**
	 * 根据 email 地址得到两位的16进制字符串校验码；
	 * @param email
	 * @return 范围（00--FF）
	 */
	public static String getEmailValidate(String email) {
		int decNumber = 255;
		for (byte b : email.getBytes()) {
			decNumber = decNumber ^ (b + 128);		// 
		}
		String hex = Integer.toHexString(decNumber).toUpperCase();
		if (hex.length()<2) {
			hex = "0" + hex;
		}
		return hex;
	}
	
}
