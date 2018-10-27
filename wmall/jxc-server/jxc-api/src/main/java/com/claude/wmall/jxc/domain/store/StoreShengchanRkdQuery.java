package com.claude.wmall.jxc.domain.store;

import com.claude.wmall.jxc.domain.common.WmallPager;

import java.util.Date;

/**
 * Created by mazeguo on 2016/8/28.
 */
public class StoreShengchanRkdQuery extends WmallPager {
    private Integer pageSize;
    private Integer pageNum;
    private String danjubh;
    private Date rukurqStart;
    private Date rukurqEnd;
    private String cangku;
    private String yewuy;
    private String kuguany;
    private String gongchang;
    private String chejian;
    private String banzu;
    private String banci;
    private String zhuanhuazt;

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public Integer getPageNum() {
        return pageNum;
    }

    public void setPageNum(Integer pageNum) {
        this.pageNum = pageNum;
    }

    public String getDanjubh() {
        return danjubh;
    }

    public void setDanjubh(String danjubh) {
        this.danjubh = danjubh;
    }

    public Date getRukurqStart() {
        return rukurqStart;
    }

    public void setRukurqStart(Date rukurqStart) {
        this.rukurqStart = rukurqStart;
    }

    public Date getRukurqEnd() {
        return rukurqEnd;
    }

    public void setRukurqEnd(Date rukurqEnd) {
        this.rukurqEnd = rukurqEnd;
    }

    public String getCangku() {
        return cangku;
    }

    public void setCangku(String cangku) {
        this.cangku = cangku;
    }

    public String getYewuy() {
        return yewuy;
    }

    public void setYewuy(String yewuy) {
        this.yewuy = yewuy;
    }

    public String getKuguany() {
        return kuguany;
    }

    public void setKuguany(String kuguany) {
        this.kuguany = kuguany;
    }

    public String getGongchang() {
        return gongchang;
    }

    public void setGongchang(String gongchang) {
        this.gongchang = gongchang;
    }

    public String getChejian() {
        return chejian;
    }

    public void setChejian(String chejian) {
        this.chejian = chejian;
    }

    public String getBanzu() {
        return banzu;
    }

    public void setBanzu(String banzu) {
        this.banzu = banzu;
    }

    public String getBanci() {
        return banci;
    }

    public void setBanci(String banci) {
        this.banci = banci;
    }

    public String getZhuanhuazt() {
        return zhuanhuazt;
    }

    public void setZhuanhuazt(String zhuanhuazt) {
        this.zhuanhuazt = zhuanhuazt;
    }
}
