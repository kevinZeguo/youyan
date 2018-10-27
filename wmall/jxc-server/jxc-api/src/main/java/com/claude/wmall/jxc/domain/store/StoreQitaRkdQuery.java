package com.claude.wmall.jxc.domain.store;

import com.claude.wmall.jxc.domain.common.WmallPager;

import java.util.Date;

/**
 * Created by mazeguo on 2016/8/9.
 */
public class StoreQitaRkdQuery extends WmallPager {

    private Integer pageSize;
    private Integer pageNum;
    private Integer bianhao;
    private Date rukuDateStart;
    private Date rukuDateEnd;
    private String productName;
    private String cangku;
    private String kuguanyuan;
    private String gongyingshang;
    private String bumen;
    private Integer shenheStatus;

    public void setPageNum(Integer pageNum) {
        this.pageNum = pageNum;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public Integer getPageNum() {
        return pageNum;
    }

    public Integer getBianhao() {
        return bianhao;
    }

    public void setBianhao(Integer bianhao) {
        this.bianhao = bianhao;
    }

    public Date getRukuDateStart() {
        return rukuDateStart;
    }

    public void setRukuDateStart(Date rukuDateStart) {
        this.rukuDateStart = rukuDateStart;
    }

    public Date getRukuDateEnd() {
        return rukuDateEnd;
    }

    public void setRukuDateEnd(Date rukuDateEnd) {
        this.rukuDateEnd = rukuDateEnd;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getCangku() {
        return cangku;
    }

    public void setCangku(String cangku) {
        this.cangku = cangku;
    }

    public String getKuguanyuan() {
        return kuguanyuan;
    }

    public void setKuguanyuan(String kuguanyuan) {
        this.kuguanyuan = kuguanyuan;
    }

    public String getGongyingshang() {
        return gongyingshang;
    }

    public void setGongyingshang(String gongyingshang) {
        this.gongyingshang = gongyingshang;
    }

    public String getBumen() {
        return bumen;
    }

    public void setBumen(String bumen) {
        this.bumen = bumen;
    }

    public Integer getShenheStatus() {
        return shenheStatus;
    }

    public void setShenheStatus(Integer shenheStatus) {
        this.shenheStatus = shenheStatus;
    }
}
