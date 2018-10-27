package com.claude.wmall.commons.utils;

import java.util.concurrent.atomic.AtomicInteger;

public class Generator  implements Runnable{

	private static AtomicInteger agent = new AtomicInteger(0);
	private static AtomicInteger sale = new AtomicInteger(0);

	public static String getNextAgent() {
		int nextVal = agent.incrementAndGet();
		return String.format("%03d", nextVal);
	}

	public static String getNextSale() {
		int nextVal = sale.incrementAndGet();
		return String.format("%03d", nextVal);
	}

	public static String getNextId() {
		int nextVal = sale.incrementAndGet();
		return String.format("%d", nextVal);
	}

	// public static void main(String... args) {
	// 测试
	// System.out.println(Generator.getNextAgent()+Generator.getNextSale());
	// System.out.println(Generator.getNextId());
	// System.out.println(Generator.getNextId());
	// }
	public void run() { 
        synchronized(this) { 
             for (int i = 0; i < 5; i++) {
                  Thread.currentThread().getName();
                  System.out.println(" synchronized loop " + i); 
             } 
        } 
   } 
   public static void main(String[] args) { 
	   Generator t1 = new Generator(); 
        Thread ta = new Thread(t1, "A"); 
        ta.start(); 
   }
}
