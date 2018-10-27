package com.claude.wmall.commons.utils;

import java.util.UUID;

public class UUIDGenerator {

	
	public static String getUUID() {
		String s = UUID.randomUUID().toString();
		StringBuffer result = new StringBuffer();
		result.append(s.substring(0, 8));
		result.append(s.substring(9, 13));
		result.append(s.substring(14, 18));
		result.append(s.substring(19, 23));
		result.append(s.substring(24));
		return result.toString();
	}
}
