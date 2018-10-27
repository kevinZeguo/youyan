package com.claude.wmall.commons.utils;

public class OrderUtil {

	
	/*
     * 前补0
     * 
     */
    public static String addZeroForNum(String str, int strLength) {
	     int strLen = str.length();
	     StringBuffer sb = null;
	     while (strLen < strLength) {
	           sb = new StringBuffer();
	           sb.append("0").append(str);// 左(前)补0
	        // sb.append(str).append("0");//右(后)补0
	           str = sb.toString();
	           strLen = str.length();
	     }
	     return str;
	 }
}
