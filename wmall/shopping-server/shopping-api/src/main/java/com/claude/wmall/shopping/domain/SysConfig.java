package com.claude.wmall.shopping.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import net.sf.json.JSONObject;
import com.claude.wmall.commons.utils.Jsonable;

@Entity
@Table(name = "T_SysConfig")
public class SysConfig implements Jsonable {
	private java.lang.Integer ID;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	public java.lang.Integer getID() {
		return ID;
	}

	public void setID(java.lang.Integer ID) {
		this.ID = ID;
	}

	private java.lang.String vKeyword;

	@Column(name = "vKeyword")
	public java.lang.String getvKeyword() {
		return vKeyword;
	}

	public void setvKeyword(java.lang.String vKeyword) {
		this.vKeyword = vKeyword;
	}

	private java.lang.String vValue;

	@Column(name = "vValue")
	public java.lang.String getvValue() {
		return vValue;
	}

	public void setvValue(java.lang.String vValue) {
		this.vValue = vValue;
	}

	private java.lang.String vText;

	@Column(name = "vText")
	public java.lang.String getvText() {
		return vText;
	}

	public void setvText(java.lang.String vText) {
		this.vText = vText;
	}

	private java.lang.String vStatus;

	@Column(name = "vStatus")
	public java.lang.String getvStatus() {
		return vStatus;
	}

	public void setvStatus(java.lang.String vStatus) {
		this.vStatus = vStatus;
	}

	private java.util.Date vInsertDate;

	@Column(name = "vInsertDate")
	public java.util.Date getvInsertDate() {
		return vInsertDate;
	}

	public void setvInsertDate(java.util.Date vInsertDate) {
		this.vInsertDate = vInsertDate;
	}

	private java.lang.String vDesc;

	@Column(name = "vDesc")
	public java.lang.String getvDesc() {
		return vDesc;
	}

	public void setvDesc(java.lang.String vDesc) {
		this.vDesc = vDesc;
	}

	private java.lang.String vOrder;

	@Column(name = "vOrder")
	public java.lang.String getvOrder() {
		return vOrder;
	}

	public void setvOrder(java.lang.String vOrder) {
		this.vOrder = vOrder;
	}

	@Transient
	@Override
	public String getJsonObject() {
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("ID", getID());
		jsonObject.put("vKeyword", getvKeyword());
		jsonObject.put("vValue", getvValue());
		jsonObject.put("vText", getvText());
		jsonObject.put("vStatus", getvStatus());
		jsonObject.put("vInsertDate", getvInsertDate());
		jsonObject.put("vDesc", getvDesc());
		jsonObject.put("vOrder", getvOrder());
		return jsonObject.toString();
	}
}
