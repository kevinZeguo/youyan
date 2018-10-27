package com.claude.wmall.jxc.domain.store;

import com.claude.wmall.jxc.domain.common.WmallPager;

import java.util.Date;

/**
 * Created by mazeguo on 2016/8/9.
 */
public class StoreDiaoboRkdQuery extends WmallPager {

    private Integer pageSize;
    private Integer pageNum;
    private String danjubh;

    private Date rukurqStart;
    private Date rukurqEnd;
    private String chanpinbh;
    private String chukuck;
    private String chukubgy;
    private String rukuck;
    private String rukubgy;
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

    public String getChanpinbh() {
        return chanpinbh;
    }

    public void setChanpinbh(String chanpinbh) {
        this.chanpinbh = chanpinbh;
    }

    public String getChukuck() {
        return chukuck;
    }

    public void setChukuck(String chukuck) {
        this.chukuck = chukuck;
    }

    public String getChukubgy() {
        return chukubgy;
    }

    public void setChukubgy(String chukubgy) {
        this.chukubgy = chukubgy;
    }

    public String getRukuck() {
        return rukuck;
    }

    public void setRukuck(String rukuck) {
        this.rukuck = rukuck;
    }

    public String getRukubgy() {
        return rukubgy;
    }

    public void setRukubgy(String rukubgy) {
        this.rukubgy = rukubgy;
    }

    public String getZhuanhuazt() {
        return zhuanhuazt;
    }

    public void setZhuanhuazt(String zhuanhuazt) {
        this.zhuanhuazt = zhuanhuazt;
    }
}
