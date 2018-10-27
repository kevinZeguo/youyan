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
@Table(name = "T_UserMenu")
public class UserMenu implements Jsonable {
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

	private java.lang.Integer vUserID;

	@Column(name = "vUserID")
	public java.lang.Integer getvUserID() {
		return vUserID;
	}

	public void setvUserID(java.lang.Integer vUserID) {
		this.vUserID = vUserID;
	}

	private java.lang.String vMenuID;

	@Column(name = "vMenuID")
	public java.lang.String getvMenuID() {
		return vMenuID;
	}

	public void setvMenuID(java.lang.String vMenuID) {
		this.vMenuID = vMenuID;
	}

	private java.lang.String vParentID;

	@Column(name = "vParentID")
	public java.lang.String getvParentID() {
		return vParentID;
	}

	public void setvParentID(java.lang.String vParentID) {
		this.vParentID = vParentID;
	}

	private java.util.Date vInsertDate;

	@Column(name = "vInsertDate")
	public java.util.Date getvInsertDate() {
		return vInsertDate;
	}

	public void setvInsertDate(java.util.Date vInsertDate) {
		this.vInsertDate = vInsertDate;
	}

	private java.lang.Integer vInsertBy;

	@Column(name = "vInsertBy")
	public java.lang.Integer getvInsertBy() {
		return vInsertBy;
	}

	public void setvInsertBy(java.lang.Integer vInsertBy) {
		this.vInsertBy = vInsertBy;
	}

	@Transient
	@Override
	public String getJsonObject() {
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("ID", getID());
		jsonObject.put("vUserID", getvUserID());
		jsonObject.put("vMenuID", getvMenuID());
		jsonObject.put("vParentID", getvParentID());
		jsonObject.put("vInsertDate", getvInsertDate());
		jsonObject.put("vInsertBy", getvInsertBy());
		return jsonObject.toString();
	}
}
