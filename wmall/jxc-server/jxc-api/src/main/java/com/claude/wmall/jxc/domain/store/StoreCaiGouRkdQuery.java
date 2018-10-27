package com.claude.wmall.jxc.domain.store;

import com.claude.wmall.jxc.domain.common.WmallPager;

import java.util.Date;

/**
 * Created by mazeguo on 2016/8/9.
 */
public class StoreCaiGouRkdQuery extends WmallPager {

    private Integer pageSize;
    private Integer pageNum;
    private String danjubh;
    private Date rukurqStart;
    private Date rukurqEnd;
    private String chanpinbh;
    private String chanpinmc;
    private String rukuck;
    private String baoguany;
    private String gongyings;
    private String bumen;
    private Integer shenhebj;

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

    public String getChanpinmc() {
        return chanpinmc;
    }

    public void setChanpinmc(String chanpinmc) {
        this.chanpinmc = chanpinmc;
    }

    public String getRukuck() {
        return rukuck;
    }

    public void setRukuck(String rukuck) {
        this.rukuck = rukuck;
    }

    public String getBaoguany() {
        return baoguany;
    }

    public void setBaoguany(String baoguany) {
        this.baoguany = baoguany;
    }

    public String getGongyings() {
        return gongyings;
    }

    public void setGongyings(String gongyings) {
        this.gongyings = gongyings;
    }

    public String getBumen() {
        return bumen;
    }

    public void setBumen(String bumen) {
        this.bumen = bumen;
    }

    public Integer getShenhebj() {
        return shenhebj;
    }

    public void setShenhebj(Integer shenhebj) {
        this.shenhebj = shenhebj;
    }

    public String getChanpinbh() {
        return chanpinbh;
    }

    public void setChanpinbh(String chanpinbh) {
        this.chanpinbh = chanpinbh;
    }
}
