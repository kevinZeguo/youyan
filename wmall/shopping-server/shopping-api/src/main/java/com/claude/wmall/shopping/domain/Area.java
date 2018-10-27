package com.claude.wmall.shopping.domain;

import javax.persistence.*;

import com.claude.wmall.commons.utils.Jsonable;
import net.sf.json.JSONObject;

@Entity
@Table(name = "T_Area")
public class Area implements Jsonable {
    private java.lang.Integer areaId;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "area_id")
    public java.lang.Integer getAreaId() {
        return areaId;
    }

    public void setAreaId(java.lang.Integer areaId) {
        this.areaId = areaId;
    }

    private java.lang.String areaName;

    @Column(name = "area_name")
    public java.lang.String getAreaName() {
        return areaName;
    }

    public void setAreaName(java.lang.String areaName) {
        this.areaName = areaName;
    }

    private java.lang.Integer areaPar;

    @Column(name = "area_par")
    public java.lang.Integer getAreaPar() {
        return areaPar;
    }

    public void setAreaPar(java.lang.Integer areaPar) {
        this.areaPar = areaPar;
    }

    private java.lang.String areaCode;

    @Column(name = "area_code")
    public java.lang.String getAreaCode() {
        return areaCode;
    }

    public void setAreaCode(java.lang.String areaCode) {
        this.areaCode = areaCode;
    }

    @Transient
    @Override
    public String getJsonObject() {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("area_id", getAreaId());
        jsonObject.put("area_name", getAreaName());
        jsonObject.put("area_par", getAreaPar());
        jsonObject.put("area_code", getAreaCode());
        return jsonObject.toString();
    }
}