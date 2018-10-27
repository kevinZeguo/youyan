package com.claude.wmall.commons.utils;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

public class DocuNumber {


    private static String mch_id = "Uy";

    private static String saleReLog = "HK";

    public static String getMch_billno() {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
        String date = dateFormat.format(new Date());
        String nonce = String.valueOf(nextInt(100000, 999999));
        return mch_id + date + nonce;
    }

    public static int nextInt(final int min, final int max) {
        Random rand = new Random();
        int tmp = Math.abs(rand.nextInt());
        return tmp % (max - min + 1) + min;
    }

    public static long getMchBillNo() {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
        String date = dateFormat.format(new Date());
        String nonce = String.valueOf(nextInt(100000, 999999));
        return Long.parseLong(date + nonce);
    }

    public static String other_billno() {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
        String date = dateFormat.format(new Date());
        String nonce = String.valueOf(nextInt(100000, 999999));
        return date + nonce;
    }

    public static String getMch_id() {
        return mch_id;
    }

    public static void setMch_id(String mch_id) {
        DocuNumber.mch_id = mch_id;
    }

    public static String getSaleReLog() {
        return saleReLog;
    }

    public static void setSaleReLog(String saleReLog) {
        DocuNumber.saleReLog = saleReLog;
    }


}
