package com.claude.wmall.shopping.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import net.sf.json.JSONObject;
import com.claude.wmall.commons.utils.Jsonable;

@Entity
@Table(name = "T_SysMenu")
public class SysMenu implements Jsonable {
	private java.lang.String vMenuID;

	@Id
	@Column(name = "vMenuID")
	public java.lang.String getvMenuID() {
		return vMenuID;
	}

	public void setvMenuID(java.lang.String vMenuID) {
		this.vMenuID = vMenuID;
	}

	private java.lang.String vMenuName;

	@Column(name = "vMenuName")
	public java.lang.String getvMenuName() {
		return vMenuName;
	}

	public void setvMenuName(java.lang.String vMenuName) {
		this.vMenuName = vMenuName;
	}

	private java.lang.String vParentID;

	@Column(name = "vParentID")
	public java.lang.String getvParentID() {
		return vParentID;
	}

	public void setvParentID(java.lang.String vParentID) {
		this.vParentID = vParentID;
	}

	private java.lang.String vParentName;

	@Column(name = "vParentName")
	public java.lang.String getvParentName() {
		return vParentName;
	}

	public void setvParentName(java.lang.String vParentName) {
		this.vParentName = vParentName;
	}

	private java.lang.String isParent;

	@Column(name = "vIsParent")
	public java.lang.String getIsParent() {
		return isParent;
	}

	public void setIsParent(java.lang.String isParent) {
		this.isParent = isParent;
	}

	private java.lang.Integer level;

	@Column(name = "vLevel")
	public java.lang.Integer getLevel() {
		return level;
	}

	public void setLevel(java.lang.Integer level) {
		this.level = level;
	}

	private java.lang.String vIsAdminDefault;

	@Column(name = "vIsAdminDefault")
	public java.lang.String getvIsAdminDefault() {
		return vIsAdminDefault;
	}

	public void setvIsAdminDefault(java.lang.String vIsAdminDefault) {
		this.vIsAdminDefault = vIsAdminDefault;
	}

	private java.lang.String vIsComAdminDefault;

	@Column(name = "vIsComAdminDefault")
	public java.lang.String getvIsComAdminDefault() {
		return vIsComAdminDefault;
	}

	public void setvIsComAdminDefault(java.lang.String vIsComAdminDefault) {
		this.vIsComAdminDefault = vIsComAdminDefault;
	}

	private java.lang.String vIsComUserDefault;

	@Column(name = "vIsComUserDefault")
	public java.lang.String getvIsComUserDefault() {
		return vIsComUserDefault;
	}

	public void setvIsComUserDefault(java.lang.String vIsComUserDefault) {
		this.vIsComUserDefault = vIsComUserDefault;
	}

	private java.lang.String vIsPerUserDefault;

	@Column(name = "vIsPerUserDefault")
	public java.lang.String getvIsPerUserDefault() {
		return vIsPerUserDefault;
	}

	public void setvIsPerUserDefault(java.lang.String vIsPerUserDefault) {
		this.vIsPerUserDefault = vIsPerUserDefault;
	}

	private java.lang.String vStauts;

	@Column(name = "vStauts")
	public java.lang.String getvStauts() {
		return vStauts;
	}

	public void setvStauts(java.lang.String vStauts) {
		this.vStauts = vStauts;
	}

	private java.lang.String vOrder;

	@Column(name = "vOrder")
	public java.lang.String getvOrder() {
		return vOrder;
	}

	public void setvOrder(java.lang.String vOrder) {
		this.vOrder = vOrder;
	}
	private java.lang.String vUrl;
	@Column(name = "vUrl")
	public java.lang.String getvUrl() {
		return vUrl;
	}

	public void setvUrl(java.lang.String vUrl) {
		this.vUrl = vUrl;
	}
	@Transient
	@Override
	public String getJsonObject() {
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("vMenuID", getvMenuID());
		jsonObject.put("vMenuName", getvMenuName());
		jsonObject.put("vParentID", getvParentID());
		jsonObject.put("vParentName", getvParentName());
		jsonObject.put("vIsParent", getIsParent());
		jsonObject.put("vLevel", getLevel());
		jsonObject.put("vIsAdminDefault", getvIsAdminDefault());
		jsonObject.put("vIsComAdminDefault", getvIsComAdminDefault());
		jsonObject.put("vIsComUserDefault", getvIsComUserDefault());
		jsonObject.put("vIsPerUserDefault", getvIsPerUserDefault());
		jsonObject.put("vStauts", getvStauts());
		jsonObject.put("vOrder", getvOrder());
		jsonObject.put("vUrl", getvUrl());
		return jsonObject.toString();
	}
}
