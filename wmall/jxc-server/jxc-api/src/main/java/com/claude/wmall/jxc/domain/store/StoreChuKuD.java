package com.claude.wmall.jxc.domain.store;

import java.util.List;

public class StoreChuKuD extends StoreKudan {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column STORE_CHUKUD.BANHAO
     *
     * @mbggenerated Mon Aug 08 23:37:21 CST 2016
     */
    private Long banhao;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column STORE_CHUKUD.DANJUBH
     *
     * @mbggenerated Mon Aug 08 23:37:21 CST 2016
     */
    private String danjubh;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column STORE_CHUKUD.CHANGKU
     *
     * @mbggenerated Mon Aug 08 23:37:21 CST 2016
     */
    private String changku;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column STORE_CHUKUD.LINGLIAOY
     *
     * @mbggenerated Mon Aug 08 23:37:21 CST 2016
     */
    private String lingliaoy;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column STORE_CHUKUD.BUMEN
     *
     * @mbggenerated Mon Aug 08 23:37:21 CST 2016
     */
    private String bumen;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column STORE_CHUKUD.GONGCHANG
     *
     * @mbggenerated Mon Aug 08 23:37:21 CST 2016
     */
    private String gongchang;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column STORE_CHUKUD.SHENGCHANX
     *
     * @mbggenerated Mon Aug 08 23:37:21 CST 2016
     */
    private String shengchanx;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column STORE_CHUKUD.BANZHU
     *
     * @mbggenerated Mon Aug 08 23:37:21 CST 2016
     */
    private String banzhu;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column STORE_CHUKUD.BANCI
     *
     * @mbggenerated Mon Aug 08 23:37:21 CST 2016
     */
    private String banci;
    
    private String chanpinmc;
    
    public String getChanpinmc() {
		return chanpinmc;
	}

	public void setChanpinmc(String chanpinmc) {
		this.chanpinmc = chanpinmc;
	}

	private List<StoreChuRuKls> churuklsList;

    public List<StoreChuRuKls> getChuruklsList() {
		return churuklsList;
	}

	public void setChuruklsList(List<StoreChuRuKls> churuklsList) {
		this.churuklsList = churuklsList;
	}

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column STORE_CHUKUD.BANHAO
     *
     * @return the value of STORE_CHUKUD.BANHAO
     *
     * @mbggenerated Mon Aug 08 23:37:21 CST 2016
     */
    public Long getBanhao() {
        return banhao;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column STORE_CHUKUD.BANHAO
     *
     * @param banhao the value for STORE_CHUKUD.BANHAO
     *
     * @mbggenerated Mon Aug 08 23:37:21 CST 2016
     */
    public void setBanhao(Long banhao) {
        this.banhao = banhao;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column STORE_CHUKUD.DANJUBH
     *
     * @return the value of STORE_CHUKUD.DANJUBH
     *
     * @mbggenerated Mon Aug 08 23:37:21 CST 2016
     */
    public String getDanjubh() {
        return danjubh;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column STORE_CHUKUD.DANJUBH
     *
     * @param danjubh the value for STORE_CHUKUD.DANJUBH
     *
     * @mbggenerated Mon Aug 08 23:37:21 CST 2016
     */
    public void setDanjubh(String danjubh) {
        this.danjubh = danjubh == null ? null : danjubh.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column STORE_CHUKUD.CHANGKU
     *
     * @return the value of STORE_CHUKUD.CHANGKU
     *
     * @mbggenerated Mon Aug 08 23:37:21 CST 2016
     */
    public String getChangku() {
        return changku;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column STORE_CHUKUD.CHANGKU
     *
     * @param changku the value for STORE_CHUKUD.CHANGKU
     *
     * @mbggenerated Mon Aug 08 23:37:21 CST 2016
     */
    public void setChangku(String changku) {
        this.changku = changku == null ? null : changku.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column STORE_CHUKUD.LINGLIAOY
     *
     * @return the value of STORE_CHUKUD.LINGLIAOY
     *
     * @mbggenerated Mon Aug 08 23:37:21 CST 2016
     */
    public String getLingliaoy() {
        return lingliaoy;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column STORE_CHUKUD.LINGLIAOY
     *
     * @param lingliaoy the value for STORE_CHUKUD.LINGLIAOY
     *
     * @mbggenerated Mon Aug 08 23:37:21 CST 2016
     */
    public void setLingliaoy(String lingliaoy) {
        this.lingliaoy = lingliaoy == null ? null : lingliaoy.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column STORE_CHUKUD.BUMEN
     *
     * @return the value of STORE_CHUKUD.BUMEN
     *
     * @mbggenerated Mon Aug 08 23:37:21 CST 2016
     */
    public String getBumen() {
        return bumen;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column STORE_CHUKUD.BUMEN
     *
     * @param bumen the value for STORE_CHUKUD.BUMEN
     *
     * @mbggenerated Mon Aug 08 23:37:21 CST 2016
     */
    public void setBumen(String bumen) {
        this.bumen = bumen == null ? null : bumen.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column STORE_CHUKUD.GONGCHANG
     *
     * @return the value of STORE_CHUKUD.GONGCHANG
     *
     * @mbggenerated Mon Aug 08 23:37:21 CST 2016
     */
    public String getGongchang() {
        return gongchang;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column STORE_CHUKUD.GONGCHANG
     *
     * @param gongchang the value for STORE_CHUKUD.GONGCHANG
     *
     * @mbggenerated Mon Aug 08 23:37:21 CST 2016
     */
    public void setGongchang(String gongchang) {
        this.gongchang = gongchang == null ? null : gongchang.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column STORE_CHUKUD.SHENGCHANX
     *
     * @return the value of STORE_CHUKUD.SHENGCHANX
     *
     * @mbggenerated Mon Aug 08 23:37:21 CST 2016
     */
    public String getShengchanx() {
        return shengchanx;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column STORE_CHUKUD.SHENGCHANX
     *
     * @param shengchanx the value for STORE_CHUKUD.SHENGCHANX
     *
     * @mbggenerated Mon Aug 08 23:37:21 CST 2016
     */
    public void setShengchanx(String shengchanx) {
        this.shengchanx = shengchanx == null ? null : shengchanx.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column STORE_CHUKUD.BANZHU
     *
     * @return the value of STORE_CHUKUD.BANZHU
     *
     * @mbggenerated Mon Aug 08 23:37:21 CST 2016
     */
    public String getBanzhu() {
        return banzhu;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column STORE_CHUKUD.BANZHU
     *
     * @param banzhu the value for STORE_CHUKUD.BANZHU
     *
     * @mbggenerated Mon Aug 08 23:37:21 CST 2016
     */
    public void setBanzhu(String banzhu) {
        this.banzhu = banzhu == null ? null : banzhu.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column STORE_CHUKUD.BANCI
     *
     * @return the value of STORE_CHUKUD.BANCI
     *
     * @mbggenerated Mon Aug 08 23:37:21 CST 2016
     */
    public String getBanci() {
        return banci;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column STORE_CHUKUD.BANCI
     *
     * @param banci the value for STORE_CHUKUD.BANCI
     *
     * @mbggenerated Mon Aug 08 23:37:21 CST 2016
     */
    public void setBanci(String banci) {
        this.banci = banci == null ? null : banci.trim();
    }
}